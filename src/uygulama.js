import { analizEtAlintili } from './analiz.js';
import { sozlukHazirla } from './sozluk.js';
import { panoCiz } from './pano.js';
import { raporMetni, dosyaAdi } from './rapor.js';

const dosyaGirdisi = document.getElementById('dosya');
const durum = document.getElementById('durum');
const pano = document.getElementById('pano');
const raporIndir = document.getElementById('rapor-indir');
let raporSonucu = null;
let secim = 0;

raporIndir.addEventListener('click', () => {
  if (!raporSonucu) return;
  const blob = new Blob([raporMetni(raporSonucu)], { type: 'text/markdown;charset=utf-8' });
  const adres = URL.createObjectURL(blob);
  const baglanti = document.createElement('a');
  baglanti.href = adres;
  baglanti.download = dosyaAdi(raporSonucu);
  document.body.append(baglanti);
  try {
    baglanti.click();
  } finally {
    baglanti.remove();
    setTimeout(() => URL.revokeObjectURL(adres), 0);
  }
});

// Sözlük açılışta bir kez yüklenir; eksik ya da bozuksa hata dosya seçilince gösterilir.
const sozlukSozu = fetch('data/temalar.json')
  .then(yanit => {
    if (!yanit.ok) throw new Error(`HTTP ${yanit.status}`);
    return yanit.text();
  })
  .then(metin => ({ sozluk: sozlukHazirla(metin) }))
  .catch(hata => ({ hata: hata.message.startsWith('Tema sözlüğü')
    ? hata.message : 'Tema sözlüğü (data/temalar.json) yüklenemedi.' }));

dosyaGirdisi.addEventListener('change', async () => {
  const buSecim = ++secim;
  const dosya = dosyaGirdisi.files[0];
  raporSonucu = null;
  raporIndir.disabled = true;
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
    const { sozluk, hata } = await sozlukSozu;
    if (buSecim !== secim) return;
    if (hata) {
      durum.textContent = hata;
      return;
    }
    const sonuc = analizEtAlintili(metin, sozluk, bugun);
    panoCiz(pano, sonuc, document);
    if (sonuc.durum === 'tamam') {
      raporSonucu = sonuc;
      raporIndir.disabled = false;
    }
    durum.textContent = sonuc.durum === 'red' ? sonuc.redNedeni
      : sonuc.durum === 'bos' ? 'Kullanılabilir satır yok' : 'Dosya okundu.';
  } catch {
    if (buSecim !== secim) return;
    pano.textContent = '';
    durum.textContent = 'Dosya okunamadı. CSV dosyasını yeniden seçin.';
  }
});
