import { dogrula } from './dogrula.js';
import { sozlukHazirla } from './sozluk.js';
import { temaEsle } from './tema.js';

const dosyaGirdisi = document.getElementById('dosya');
const durum = document.getElementById('durum');
const pano = document.getElementById('pano');
let secim = 0;

// Sözlük açılışta bir kez yüklenir; eksik ya da bozuksa hata dosya seçilince gösterilir.
const sozlukSozu = fetch('data/temalar.json')
  .then(yanit => {
    if (!yanit.ok) throw new Error(`HTTP ${yanit.status}`);
    return yanit.text();
  })
  .then(metin => ({ sozluk: sozlukHazirla(metin) }))
  .catch(hata => ({ hata: hata.message.startsWith('Tema sözlüğü')
    ? hata.message : 'Tema sözlüğü (data/temalar.json) yüklenemedi.' }));

function satirEkle(metin) {
  const satir = document.createElement('p');
  satir.textContent = metin;
  pano.append(satir);
}

dosyaGirdisi.addEventListener('change', async () => {
  const buSecim = ++secim;
  const dosya = dosyaGirdisi.files[0];
  pano.textContent = '';
  if (!dosya) {
    durum.textContent = 'Dosya seçin.';
    return;
  }
  durum.textContent = 'Dosya okunuyor.';
  try {
    const metin = await dosya.text();
    if (buSecim !== secim) return;
    const simdi = new Date();
    const bugun = [simdi.getFullYear(), String(simdi.getMonth() + 1).padStart(2, '0'),
      String(simdi.getDate()).padStart(2, '0')].join('-');
    const sonuc = dogrula(metin, bugun);
    if (sonuc.durum === 'red') {
      durum.textContent = sonuc.redNedeni;
      return;
    }
    durum.textContent = sonuc.durum === 'bos' ? 'Kullanılabilir satır yok' : 'Dosya okundu.';
    satirEkle(`Okunan: ${sonuc.okunan} kayıt, atlanan: ${sonuc.atlanan} kayıt`);
    for (const [neden, sayi] of Object.entries(sonuc.nedenler)) satirEkle(`${neden}: ${sayi}`);
    if (sonuc.durum === 'bos') return;
    const { sozluk, hata } = await sozlukSozu;
    if (buSecim !== secim) return;
    if (hata) {
      pano.textContent = '';
      durum.textContent = hata;
      return;
    }
    const temalar = temaEsle(sonuc.kayitlar, sozluk);
    for (const tema of temalar.temalar) satirEkle(`${tema.ad}: ${tema.kayitlar.length}`);
    satirEkle(`Övgü: ${temalar.ovgu.kayitlar.length}`);
    satirEkle(`Diğer: ${temalar.diger.kayitlar.length}`);
  } catch {
    if (buSecim !== secim) return;
    pano.textContent = '';
    durum.textContent = 'Dosya okunamadı. CSV dosyasını yeniden seçin.';
  }
});
