// K51: Bağımsız referans hesabı. src/ ve test yardımcıları kullanılmaz.
import { readFileSync, writeFileSync } from 'node:fs';

const bugun = '2026-10-08';
const sozluk = JSON.parse(readFileSync(new URL('../../data/temalar.json', import.meta.url), 'utf8'));
const csv = readFileSync(new URL('../../data/ornek-geri-bildirim.csv', import.meta.url), 'utf8');
const satirlar = csv.replace(/^\uFEFF/, '').split(/\r\n|\n|\r/);
if (satirlar.at(-1) === '') satirlar.pop();
if (satirlar.shift() !== 'id,tarih,kanal,metin,puan,segment') throw new Error('Örnek CSV başlığı geçersiz.');

// Her alanı tam CSV alanı olarak oku; tırnak içindeki virgül ve çift tırnağı koru.
function alanlariOku(satir) {
  const desen = /("(?:[^"]|"")*"|[^",]*)(,|$)/gy;
  const alanlar = [];
  while (true) {
    const eslesme = desen.exec(satir);
    if (!eslesme) return null;
    const alan = eslesme[1];
    alanlar.push(alan.startsWith('"') ? alan.slice(1, -1).replaceAll('""', '"') : alan);
    if (eslesme[2] === '') return desen.lastIndex === satir.length ? alanlar : null;
  }
}

function gun(tarih) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tarih)) return null;
  const [yil, ay, g] = tarih.split('-').map(Number);
  const takvim = new Date(0);
  takvim.setUTCFullYear(yil, ay - 1, g);
  if (yil < 1 || takvim.getUTCFullYear() !== yil || takvim.getUTCMonth() !== ay - 1
    || takvim.getUTCDate() !== g) return null;
  return takvim.getTime() / 86400000;
}

const nedenSirasi = ['boş metin', 'tekrar', 'çelişkili id', 'ileri tarih', 'eksik alan',
  'geçersiz puan', 'geçersiz tarih', 'bilinmeyen kanal', 'bilinmeyen segment'];
const atlamalar = Object.fromEntries(nedenSirasi.map(neden => [neden, 0]));
const adaylar = [];
for (const satir of satirlar) {
  const a = alanlariOku(satir);
  let neden;
  if (!a || a.length !== 6 || a.some((alan, i) => i !== 3 && !alan.trim())) neden = 'eksik alan';
  else if (gun(a[1]) === null) neden = 'geçersiz tarih';
  else if (a[1] > bugun) neden = 'ileri tarih';
  else if (!['destek', 'magaza', 'anket'].includes(a[2])) neden = 'bilinmeyen kanal';
  else if (!/^[1-5]$/.test(a[4])) neden = 'geçersiz puan';
  else if (!['yeni', 'duzenli', 'kurumsal'].includes(a[5])) neden = 'bilinmeyen segment';
  else if (!a[3].trim()) neden = 'boş metin';
  if (neden) atlamalar[neden]++;
  else adaylar.push(a);
}
const kayitlar = [];
const idler = new Set();
const icerikler = new Set();
for (const a of adaylar) {
  const icerik = JSON.stringify(a.slice(1));
  const celiski = adaylar.some(b => b[0] === a[0] && JSON.stringify(b.slice(1)) !== icerik);
  if (celiski) atlamalar['çelişkili id']++;
  else if (idler.has(a[0]) || icerikler.has(icerik)) atlamalar.tekrar++;
  else { kayitlar.push(a); icerikler.add(icerik); }
  idler.add(a[0]);
}

const donusum = { 'İ': 'i', 'I': 'i', 'ı': 'i', 'ş': 's', 'Ş': 's', 'ğ': 'g', 'Ğ': 'g',
  'ü': 'u', 'Ü': 'u', 'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c',
  'â': 'a', 'Â': 'a', 'î': 'i', 'Î': 'i', 'û': 'u', 'Û': 'u' };
const temizle = metin => metin.normalize('NFC').replace(/[İIışŞğĞüÜöÖçÇâÂîÎûÛ]/g,
  harf => donusum[harf]).toLowerCase().replace(/\s+/g, ' ');
const eslesir = (metin, kurallar) => kurallar.some(kural => kural.every(kelime => metin.includes(temizle(kelime))));
const tarihler = kayitlar.map(a => a[1]).sort();
const son = tarihler.at(-1);
const sonGun = son ? gun(son) : null;
const pencere = son ? { bas: new Date((sonGun - 13) * 86400000).toISOString().slice(0, 10), son } : null;
const gruplar = sozluk.temalar.map(tema => ({ ...tema, kayitlar: [] }));
let ovgu = 0;
let diger = 0;
for (const a of kayitlar) {
  const metin = temizle(a[3]);
  const eslesen = gruplar.filter(tema => eslesir(metin, tema.kurallar));
  eslesen.forEach(tema => tema.kayitlar.push(a));
  const olumlu = eslesir(metin, sozluk.ovgu.kurallar);
  if (olumlu) ovgu++;
  if (!olumlu && !eslesen.length) diger++;
}
const temalar = gruplar.filter(tema => tema.kayitlar.length).map(tema => {
  const n = tema.kayitlar.length;
  const toplam = tema.kayitlar.reduce((s, a) => s + Number(a[4]), 0);
  const yeni = tema.kayitlar.filter(a => gun(a[1]) >= sonGun - 13).length;
  return { ad: tema.ad, kayit: n, toplamPuan: toplam, yeniKayit: yeni,
    ortalama: { pay: toplam, payda: n }, son14GunPayi: { pay: yeni, payda: n },
    puan: { pay: (6 * n - toplam) * (n + yeni), payda: n },
    temelPuan: { pay: 6 * n - toplam, payda: 1 } };
});
temalar.sort((a, b) => {
  const sol = BigInt(a.puan.pay) * BigInt(b.puan.payda);
  const sag = BigInt(b.puan.pay) * BigInt(a.puan.payda);
  if (sol !== sag) return sol > sag ? -1 : 1;
  return b.kayit - a.kayit || a.ad.localeCompare(b.ad, 'tr');
});
temalar.forEach((tema, i) => { tema.sira = i + 1; });
const kanallar = Object.fromEntries(['destek', 'magaza', 'anket'].map(kanal =>
  [kanal, kayitlar.filter(a => a[2] === kanal).length]));
const sonuc = { durum: kayitlar.length ? 'tamam' : 'bos', redNedeni: '', okunan: satirlar.length,
  atlanan: satirlar.length - kayitlar.length,
  nedenler: Object.fromEntries(nedenSirasi.filter(neden => atlamalar[neden]).map(neden => [neden, atlamalar[neden]])),
  kapsam: son ? { ilk: tarihler[0], son, kayit: kayitlar.length, kanallar } : null,
  pencere, temalar, ovgu: { kayit: ovgu }, diger: { kayit: diger }, sozlukSurumu: sozluk.surum };
writeFileSync(new URL('./ornek-sonuc.json', import.meta.url), JSON.stringify({ bugun, sonuc }, null, 2) + '\n');
console.log(`ornek-sonuc.json yazıldı: ${kayitlar.length} geçerli kayıt, ${temalar.length} tema.`);
