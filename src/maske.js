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

// Aday, "50 0532 555 12 34" gibi bitişik sayılarla uzayabilir. Sağdan sola gidilir;
// her bitiş öbeği için en soldan başlayan geçerli pencere maskelenir, kalan sol taraf yeniden denenir.
function adayMaskele(aday) {
  const obekler = [...aday.matchAll(/\d+/g)].map(m => ({ bas: m.index, son: m.index + m[0].length }));
  let sonuc = aday;
  let j = obekler.length - 1;
  while (j >= 0) {
    let bulundu = false;
    for (let i = 0; i <= j && !bulundu; i++) {
      const dilim = aday.slice(obekler[i].bas, obekler[j].son);
      const rakamlar = dilim.replace(/\D/g, '');
      if (!telefonMu(rakamlar, /\+\s*$/.test(aday.slice(0, obekler[i].bas)))) continue;
      const korunan = rakamlar.length - 2;
      let sayac = 0;
      const maskeli = dilim.replace(/\d/g, rakam => (sayac++ < korunan ? '*' : rakam));
      sonuc = sonuc.slice(0, obekler[i].bas) + maskeli + sonuc.slice(obekler[j].son);
      j = i - 1;
      bulundu = true;
    }
    if (!bulundu) j--;
  }
  return sonuc;
}

export function telefonMaskele(metin) {
  return metin.replace(ADAY, adayMaskele);
}

export function maskele(metin) {
  return telefonMaskele(epostaMaskele(metin));
}
