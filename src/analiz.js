import { dogrula } from './dogrula.js';
import { temaEsle } from './tema.js';
import { puanHesapla } from './puan.js';

// Ham metin sonuç nesnesine taşınmaz; bu adım yalnız sayıları üretir.
export function analizEt(csvMetni, sozluk, bugun) {
  const { kayitlar, ...dogrulama } = dogrula(csvMetni, bugun);
  const bos = { kapsam: null, pencere: null, temalar: [], ovgu: { kayit: 0 }, diger: { kayit: 0 } };
  if (dogrulama.durum !== 'tamam') return { ...dogrulama, ...bos, sozlukSurumu: sozluk.surum };
  const tarihler = kayitlar.map(kayit => kayit.tarih).sort();
  const kanallar = Object.fromEntries(['destek', 'magaza', 'anket'].map(kanal =>
    [kanal, kayitlar.filter(kayit => kayit.kanal === kanal).length]));
  return { ...dogrulama, kapsam: { ilk: tarihler[0], son: tarihler.at(-1), kayit: kayitlar.length, kanallar },
    ...puanHesapla(kayitlar, temaEsle(kayitlar, sozluk)), sozlukSurumu: sozluk.surum };
}
