import { maskele } from './maske.js';

// K14: tarih azalan, eşitlikte id artan. Dönen metin maskelidir; ham metin dışarı çıkmaz.
export function alintilariSec(kayitlar, adet = 3) {
  return [...kayitlar]
    .sort((a, b) => (a.tarih < b.tarih ? 1 : a.tarih > b.tarih ? -1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
    .slice(0, adet)
    .map(({ id, tarih, kanal, metin }) => ({ id, tarih, kanal, metin: maskele(metin) }));
}
