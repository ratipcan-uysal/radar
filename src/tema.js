import { normalize } from './normalize.js';

// Bir kuraldaki bütün kelimeler geçerse kural tutar (VE); kurallardan biri tutarsa tema tutar (VEYA).
const tutar = (metin, kurallar) => kurallar.some(kural => kural.every(kelime => metin.includes(kelime)));

// `sozluk`, sozlukHazirla çıktısıdır. Temalar sözlük sırasıyla döner.
export function kayitTemalari(metin, sozluk) {
  const temiz = normalize(metin);
  return {
    temalar: sozluk.temalar.filter(tema => tutar(temiz, tema.kurallar)).map(tema => tema.ad),
    ovgu: tutar(temiz, sozluk.ovgu.kurallar),
  };
}

// K6: çok temalı kayıt her temada sayılır. K39: övgü ayrıdır, şikâyet temasına da girdiyse orada da sayılır.
// Hiçbir temaya ve övgüye girmeyen kayıt "diğer"dir; yalnız övgü olan kayıt "diğer"e düşmez.
export function temaEsle(kayitlar, sozluk) {
  const temalar = sozluk.temalar.map(tema => ({ ad: tema.ad, kayitlar: [] }));
  const ovgu = { kayitlar: [] };
  const diger = { kayitlar: [] };
  for (const kayit of kayitlar) {
    const eslesme = kayitTemalari(kayit.metin, sozluk);
    for (const tema of temalar) if (eslesme.temalar.includes(tema.ad)) tema.kayitlar.push(kayit);
    if (eslesme.ovgu) ovgu.kayitlar.push(kayit);
    if (!eslesme.temalar.length && !eslesme.ovgu) diger.kayitlar.push(kayit);
  }
  return { temalar, ovgu, diger };
}
