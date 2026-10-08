// Küçük DOM taklidi yalnız pano.js'in kullandığı textContent/append davranışını modeller.
export function eleman(etiket = 'div') {
  let metin = '';
  let cocuklar = [];
  return {
    etiket,
    get cocuklar() { return cocuklar; },
    get textContent() { return metin + cocuklar.map(cocuk => cocuk.textContent).join(''); },
    set textContent(deger) { metin = deger; cocuklar = []; },
    append(cocuk) { cocuklar.push(cocuk); },
  };
}

export const sahteBelge = { createElement: eleman };
