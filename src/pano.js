import { bicim } from './bicim.js';

const KANAL_ADI = { destek: 'destek', magaza: 'mağaza', anket: 'anket' };
const kesir = ({ pay, payda }) => bicim(pay, payda);

// Yalnız textContent kullanılır; dosyadan gelen hiçbir metin HTML olarak yorumlanmaz.
function ekle(kap, belge, etiket, metin) {
  const eleman = belge.createElement(etiket);
  eleman.textContent = metin;
  kap.append(eleman);
  return eleman;
}

function temaCiz(kap, belge, tema) {
  const kutu = belge.createElement('article');
  ekle(kutu, belge, 'h3', `${tema.sira}. ${tema.ad}`);
  ekle(kutu, belge, 'p', `Puan ${kesir(tema.puan)}, temel puan ${kesir(tema.temelPuan)}, ${tema.kayit} kayıt, ortalama puan ${kesir(tema.ortalama)}`);
  const acilir = belge.createElement('details');
  ekle(acilir, belge, 'summary', `Alıntılar (${tema.alintilar.length})`);
  const liste = belge.createElement('ul');
  for (const alinti of tema.alintilar) {
    ekle(liste, belge, 'li', `${alinti.tarih} / ${alinti.kanal} / ${alinti.id}: ${alinti.metin}`);
  }
  acilir.append(liste);
  kutu.append(acilir);
  kap.append(kutu);
}

// Önceki içeriği temizler; sonuç red ise kap boş kalır.
export function panoCiz(kap, sonuc, belge) {
  kap.textContent = '';
  if (sonuc.durum === 'red') return;
  ekle(kap, belge, 'p', `Okunan: ${sonuc.okunan} kayıt, atlanan: ${sonuc.atlanan} kayıt`);
  for (const [neden, sayi] of Object.entries(sonuc.nedenler)) ekle(kap, belge, 'p', `${neden}: ${sayi}`);
  if (sonuc.durum === 'bos') return;
  const { ilk, son, kayit, kanallar } = sonuc.kapsam;
  const dagilim = Object.entries(kanallar).map(([kanal, sayi]) => `${KANAL_ADI[kanal]} ${sayi}`).join(', ');
  ekle(kap, belge, 'p', `Kapsam: ${ilk} - ${son}, ${kayit} kayıt, kanal dağılımı: ${dagilim}`);
  for (const tema of sonuc.temalar) temaCiz(kap, belge, tema);
  ekle(kap, belge, 'p', `Övgü: ${sonuc.ovgu.kayit} kayıt`);
  ekle(kap, belge, 'p', `Diğer: ${sonuc.diger.kayit} kayıt`);
}
