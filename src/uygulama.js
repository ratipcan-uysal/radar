import { dogrula } from './dogrula.js';

const dosyaGirdisi = document.getElementById('dosya');
const durum = document.getElementById('durum');
const pano = document.getElementById('pano');
let secim = 0;

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
    const ozet = document.createElement('p');
    ozet.textContent = `Okunan: ${sonuc.okunan} kayıt, atlanan: ${sonuc.atlanan} kayıt`;
    pano.append(ozet);
    for (const [neden, sayi] of Object.entries(sonuc.nedenler)) {
      const satir = document.createElement('p');
      satir.textContent = `${neden}: ${sayi}`;
      pano.append(satir);
    }
  } catch {
    if (buSecim !== secim) return;
    pano.textContent = '';
    durum.textContent = 'Dosya okunamadı. CSV dosyasını yeniden seçin.';
  }
});
