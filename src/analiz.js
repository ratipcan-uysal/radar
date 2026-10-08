import { dogrula } from './dogrula.js';
import { temaEsle } from './tema.js';
import { puanHesapla } from './puan.js';
import { alintilariSec } from './alinti.js';

function hesapla(csvMetni, sozluk, bugun) {
  const { kayitlar, ...dogrulama } = dogrula(csvMetni, bugun);
  const bos = { kapsam: null, pencere: null, temalar: [], ovgu: { kayit: 0 }, diger: { kayit: 0 } };
  if (dogrulama.durum !== 'tamam') return { sonuc: { ...dogrulama, ...bos, sozlukSurumu: sozluk.surum } };
  const tarihler = kayitlar.map(kayit => kayit.tarih).sort();
  const kanallar = Object.fromEntries(['destek', 'magaza', 'anket'].map(kanal =>
    [kanal, kayitlar.filter(kayit => kayit.kanal === kanal).length]));
  const eslesmeler = temaEsle(kayitlar, sozluk);
  return { eslesmeler, sonuc: { ...dogrulama, kapsam: { ilk: tarihler[0], son: tarihler.at(-1), kayit: kayitlar.length, kanallar },
    ...puanHesapla(kayitlar, eslesmeler), sozlukSurumu: sozluk.surum } };
}

// Ham metin sonuç nesnesine taşınmaz; bu fonksiyon yalnız sayıları üretir.
export function analizEt(csvMetni, sozluk, bugun) {
  return hesapla(csvMetni, sozluk, bugun).sonuc;
}

// Pano ve rapor için: her temaya en yeni 3 kaydın maskeli alıntısı eklenir.
export function analizEtAlintili(csvMetni, sozluk, bugun) {
  const { sonuc, eslesmeler } = hesapla(csvMetni, sozluk, bugun);
  if (!eslesmeler) return sonuc;
  const kayitlar = new Map(eslesmeler.temalar.map(tema => [tema.ad, tema.kayitlar]));
  return { ...sonuc, temalar: sonuc.temalar.map(tema => ({ ...tema, alintilar: alintilariSec(kayitlar.get(tema.ad)) })) };
}
