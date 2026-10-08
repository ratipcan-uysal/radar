import { csvAyristir } from './csv.js';
import { tarihGecerli } from './tarih.js';

const BASLIK = 'id,tarih,kanal,metin,puan,segment';
const NEDENLER = ['boş metin', 'tekrar', 'çelişkili id', 'ileri tarih', 'eksik alan',
  'geçersiz puan', 'geçersiz tarih', 'bilinmeyen kanal', 'bilinmeyen segment'];

// Ham kayıtlar yalnız hesap katmanında kalır; pano yalnız sayımları kullanır.
export function dogrula(csvMetni, bugun) {
  if (!tarihGecerli(bugun)) throw new TypeError('Bugün geçerli YYYY-AA-GG biçiminde verilmelidir.');
  const [baslik, ...satirlar] = csvAyristir(csvMetni);
  if (baslik?.ham !== BASLIK) {
    return { durum: 'red', redNedeni: `Dosya reddedildi. Beklenen sütunlar: ${BASLIK}.`,
      okunan: 0, atlanan: 0, nedenler: {}, kayitlar: [] };
  }

  const sayim = new Map(NEDENLER.map(neden => [neden, 0]));
  const atla = neden => sayim.set(neden, sayim.get(neden) + 1);
  const gecerli = [];
  const gruplar = new Map();
  for (const satir of satirlar) {
    const neden = satirNedeni(satir, bugun);
    if (neden) {
      atla(neden);
      continue;
    }
    const [id, tarih, kanal, metin, puan, segment] = satir.alanlar;
    const kayit = { id, tarih, kanal, metin, puan: Number(puan), segment };
    const icerik = JSON.stringify(satir.alanlar.slice(1));
    gecerli.push({ kayit, icerik });
    if (!gruplar.has(id)) gruplar.set(id, new Set());
    gruplar.get(id).add(icerik);
  }

  const gorulenId = new Set();
  const gorulenIcerik = new Set();
  const kayitlar = [];
  for (const { kayit, icerik } of gecerli) {
    if (gruplar.get(kayit.id).size > 1) atla('çelişkili id');
    else if (gorulenId.has(kayit.id) || gorulenIcerik.has(icerik)) atla('tekrar');
    else {
      kayitlar.push(kayit);
      gorulenIcerik.add(icerik);
    }
    gorulenId.add(kayit.id);
  }

  const nedenler = Object.fromEntries([...sayim].filter(([, sayi]) => sayi > 0));
  return { durum: kayitlar.length ? 'tamam' : 'bos', redNedeni: '',
    okunan: satirlar.length, atlanan: satirlar.length - kayitlar.length, nedenler, kayitlar };
}

function satirNedeni({ alanlar, bozuk }, bugun) {
  if (bozuk || alanlar.length !== 6 || alanlar.some((alan, i) => i !== 3 && !alan.trim())) return 'eksik alan';
  const [, tarih, kanal, metin, puan, segment] = alanlar;
  if (!tarihGecerli(tarih)) return 'geçersiz tarih';
  if (tarih > bugun) return 'ileri tarih';
  if (!['destek', 'magaza', 'anket'].includes(kanal)) return 'bilinmeyen kanal';
  if (!/^[1-5]$/.test(puan)) return 'geçersiz puan';
  if (!['yeni', 'duzenli', 'kurumsal'].includes(segment)) return 'bilinmeyen segment';
  if (!metin.trim()) return 'boş metin';
  return null;
}
