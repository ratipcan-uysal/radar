// K15, K27: Türkiye telefonları; K42: e-posta. Ham metin yalnız hesap katmanında kalır.
const EPOSTA = /[\p{L}\p{N}._%+-]+@[\p{L}\p{N}-]+(?:\.[\p{L}\p{N}-]+)+/gu;
const ADAY = /[+\d(][\d\s\-()+]*/g;

export function epostaMaskele(metin) {
  return metin.replace(EPOSTA, eslesme => `${eslesme[0]}***@***`);
}

// 10-12 hane; başı 0 ya da 5, artıyla başlıyorsa 90.
function telefonMu(rakamlar, arti) {
  if (rakamlar.length < 10 || rakamlar.length > 12) return false;
  return arti ? rakamlar.startsWith('90') : /^[05]/.test(rakamlar);
}

// Aday, "50 0532 555 12 34" ya da "0532 555 12 34 150" gibi yanındaki sayılarla uzayabilir.
// Öbeklerden oluşan bütün geçerli pencereler sıralanır: önce 0 ya da +90 ile başlayan, sonra önekine göre
// tam uzunlukta olan (0 → 11, 5 → 10, +90 → 12 hane), sonra en soldaki. Seçilenle çakışanlar elenir.
function adayMaskele(aday) {
  const obekler = [...aday.matchAll(/\d+/g)].map(m => ({ bas: m.index, son: m.index + m[0].length }));
  const pencereler = [];
  for (let i = 0; i < obekler.length; i++) {
    const arti = /\+\s*$/.test(aday.slice(0, obekler[i].bas));
    for (let j = i; j < obekler.length; j++) {
      const rakamlar = aday.slice(obekler[i].bas, obekler[j].son).replace(/\D/g, '');
      if (!telefonMu(rakamlar, arti)) continue;
      const guclu = arti || rakamlar[0] === '0';
      const tam = rakamlar.length === (arti ? 12 : rakamlar[0] === '0' ? 11 : 10);
      pencereler.push({ i, j, guclu, tam });
    }
  }
  pencereler.sort((a, b) => (b.guclu - a.guclu) || (b.tam - a.tam) || (a.i - b.i));
  const secilen = [];
  for (const p of pencereler) {
    if (secilen.every(s => p.j < s.i || p.i > s.j)) secilen.push(p);
  }
  let sonuc = aday;
  for (const { i, j } of secilen) {
    const dilim = aday.slice(obekler[i].bas, obekler[j].son);
    const korunan = dilim.replace(/\D/g, '').length - 2;
    let sayac = 0;
    const maskeli = dilim.replace(/\d/g, rakam => (sayac++ < korunan ? '*' : rakam));
    sonuc = sonuc.slice(0, obekler[i].bas) + maskeli + sonuc.slice(obekler[j].son);
  }
  return sonuc;
}

export function telefonMaskele(metin) {
  return metin.replace(ADAY, adayMaskele);
}

export function maskele(metin) {
  return telefonMaskele(epostaMaskele(metin));
}
