import { satirSay } from './satir-say.js';

const dosyaGirdisi = document.getElementById('dosya');
const durum = document.getElementById('durum');

dosyaGirdisi.addEventListener('change', async () => {
  const dosya = dosyaGirdisi.files[0];
  if (!dosya) {
    durum.textContent = 'Dosya seçin.';
    return;
  }
  const metin = await dosya.text();
  durum.textContent = `${dosya.name}: ${satirSay(metin)} satır`;
});
