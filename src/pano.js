import { bicim } from './bicim.js';

const KANAL_ADI = { destek: 'destek', magaza: 'mağaza', anket: 'anket' };
const kesir = ({ pay, payda }) => bicim(pay, payda);

// Yalnız textContent kullanılır; dosyadan gelen hiçbir metin HTML olarak yorumlanmaz.
function ekle(kap, belge, etiket, metin, sinif) {
  const eleman = belge.createElement(etiket);
  if (sinif) eleman.className = sinif;
  eleman.textContent = metin;
  kap.append(eleman);
  return eleman;
}

// Metinsiz sarmalayıcı; yalnız görünüm için sınıf taşır.
function sarmal(kap, belge, etiket, sinif) {
  const eleman = belge.createElement(etiket);
  eleman.className = sinif;
  kap.append(eleman);
  return eleman;
}

function temaCiz(kap, belge, tema, enYuksek) {
  const kutu = sarmal(kap, belge, 'article', 'tema');
  const baslik = sarmal(kutu, belge, 'h2', 'tema-baslik');
  ekle(baslik, belge, 'span', `${tema.sira}. `, 'sira');
  ekle(baslik, belge, 'span', tema.ad, 'tema-ad');

  // Metin eskisiyle aynı cümledir; virgüller ekran okuyucu için kalır, görselde gizlenir.
  const olcu = sarmal(kutu, belge, 'p', 'olcu');
  const puan = sarmal(olcu, belge, 'span', 'puan');
  ekle(puan, belge, 'span', 'Puan ', 'puan-etiket');
  ekle(puan, belge, 'span', kesir(tema.puan), 'puan-deger');
  // Çubuk yalnız görseldir: puanın en yüksek puana oranı. Gösterilen sayılar bicim'den gelir.
  const oran = enYuksek > 0 ? tema.puan.pay / tema.puan.payda / enYuksek : 0;
  const dolgu = sarmal(sarmal(olcu, belge, 'span', 'cubuk'), belge, 'span', 'cubuk-dolgu');
  dolgu.style = `width: ${(oran * 100).toFixed(1)}%`;
  const alt = sarmal(olcu, belge, 'span', 'alt-olcu');
  for (const metin of [`temel puan ${kesir(tema.temelPuan)}`, `${tema.kayit} kayıt`, `ortalama puan ${kesir(tema.ortalama)}`]) {
    ekle(alt, belge, 'span', ', ', 'ayrac');
    ekle(alt, belge, 'span', metin);
  }

  const acilir = sarmal(kutu, belge, 'details', 'alintilar');
  ekle(acilir, belge, 'summary', `Alıntılar (${tema.alintilar.length})`);
  const liste = belge.createElement('ul');
  for (const alinti of tema.alintilar) {
    const oge = sarmal(liste, belge, 'li', 'alinti');
    ekle(oge, belge, 'span', `${alinti.tarih} / ${alinti.kanal} / ${alinti.id}: `, 'alinti-kunye');
    ekle(oge, belge, 'span', alinti.metin, 'alinti-metin');
  }
  acilir.append(liste);
}

// Önceki içeriği temizler; sonuç red ise kap boş kalır.
export function panoCiz(kap, sonuc, belge) {
  kap.textContent = '';
  if (sonuc.durum === 'red') return;
  const atlanan = sarmal(kap, belge, 'div', 'atlanan');
  ekle(atlanan, belge, 'p', `Okunan: ${sonuc.okunan} kayıt, atlanan: ${sonuc.atlanan} kayıt`);
  for (const [neden, sayi] of Object.entries(sonuc.nedenler)) ekle(atlanan, belge, 'p', `${neden}: ${sayi}`);
  if (sonuc.durum === 'bos') return;
  const { ilk, son, kayit, kanallar } = sonuc.kapsam;
  const dagilim = Object.entries(kanallar).map(([kanal, sayi]) => `${KANAL_ADI[kanal]} ${sayi}`).join(', ');
  ekle(kap, belge, 'p', `Kapsam: ${ilk} - ${son}, ${kayit} kayıt, kanal dağılımı: ${dagilim}`, 'kapsam');
  const enYuksek = Math.max(0, ...sonuc.temalar.map(({ puan }) => puan.pay / puan.payda));
  for (const tema of sonuc.temalar) temaCiz(kap, belge, tema, enYuksek);
  const enAlt = sarmal(kap, belge, 'div', 'ovgu-diger');
  ekle(enAlt, belge, 'p', `Övgü: ${sonuc.ovgu.kayit} kayıt`);
  ekle(enAlt, belge, 'p', `Diğer: ${sonuc.diger.kayit} kayıt`);
}
