import { normalize } from './normalize.js';

function hata(mesaj) {
  return new Error(`Tema sözlüğü geçersiz: ${mesaj}`);
}

function kurallariHazirla(kurallar, yer) {
  if (!Array.isArray(kurallar) || !kurallar.length) throw hata(`${yer} için en az bir kural gerekir.`);
  return kurallar.map((kural, i) => {
    if (!Array.isArray(kural) || !kural.length) throw hata(`${yer}, ${i + 1}. kural boş olmayan bir kelime listesi olmalı.`);
    return kural.map(kelime => {
      if (typeof kelime !== 'string' || !kelime.trim()) throw hata(`${yer}, ${i + 1}. kuralda boş ya da metin olmayan kelime var.`);
      return normalize(kelime);
    });
  });
}

// K48 şeması: { surum, temalar: [{ ad, kurallar: [[kelime, ...], ...] }], ovgu: { kurallar } }
// JSON metni ya da ayrıştırılmış nesne alır; kelimeler eşleştirme için normalize edilir.
export function sozlukHazirla(girdi) {
  let sozluk = girdi;
  if (typeof girdi === 'string') {
    try {
      sozluk = JSON.parse(girdi);
    } catch {
      throw hata('JSON okunamadı.');
    }
  }
  if (!sozluk || typeof sozluk !== 'object' || Array.isArray(sozluk)) throw hata('kök bir nesne olmalı.');
  if (typeof sozluk.surum !== 'string' || !sozluk.surum.trim()) throw hata('"surum" boş olmayan bir metin olmalı.');
  if (!Array.isArray(sozluk.temalar) || !sozluk.temalar.length) throw hata('"temalar" boş olmayan bir liste olmalı.');
  const adlar = new Set();
  const temalar = sozluk.temalar.map((tema, i) => {
    if (!tema || typeof tema.ad !== 'string' || !tema.ad.trim()) throw hata(`${i + 1}. temanın "ad" alanı boş.`);
    if (adlar.has(tema.ad)) throw hata(`"${tema.ad}" adı birden çok temada var.`);
    adlar.add(tema.ad);
    return { ad: tema.ad, kurallar: kurallariHazirla(tema.kurallar, `"${tema.ad}"`) };
  });
  if (!sozluk.ovgu || typeof sozluk.ovgu !== 'object') throw hata('"ovgu" alanı eksik.');
  return { surum: sozluk.surum, temalar, ovgu: { kurallar: kurallariHazirla(sozluk.ovgu.kurallar, '"ovgu"') } };
}
