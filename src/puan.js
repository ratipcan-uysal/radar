import { pencereHesapla } from './tarih.js';

// K14: Gösterimde yuvarlanmış sayılar yerine kesirleri tam olarak karşılaştır.
export function temaKarsilastir(a, b) {
  const fark = BigInt(b.puan.pay) * BigInt(a.puan.payda)
    - BigInt(a.puan.pay) * BigInt(b.puan.payda);
  if (fark !== 0n) return fark > 0n ? 1 : -1;
  return b.kayit - a.kayit || a.ad.localeCompare(b.ad, 'tr');
}

// Pencere bütün geçerli kayıtlardan gelir; övgü ve diğer yalnız sayılır.
export function puanHesapla(kayitlar, eslesmeler) {
  const pencere = pencereHesapla(kayitlar);
  const temalar = eslesmeler.temalar.filter(tema => tema.kayitlar.length).map(tema => {
    const n = tema.kayitlar.length;
    const toplam = tema.kayitlar.reduce((toplam, kayit) => toplam + kayit.puan, 0);
    const yeni = tema.kayitlar.filter(kayit => kayit.tarih >= pencere.bas && kayit.tarih <= pencere.son).length;
    const temel = 6 * n - toplam;
    return { ad: tema.ad, kayit: n, toplamPuan: toplam, yeniKayit: yeni,
      ortalama: { pay: toplam, payda: n }, son14GunPayi: { pay: yeni, payda: n },
      puan: { pay: temel * (n + yeni), payda: n }, temelPuan: { pay: temel, payda: 1 } };
  }).sort(temaKarsilastir).map((tema, i) => ({ ...tema, sira: i + 1 }));
  return { pencere, temalar, ovgu: { kayit: eslesmeler.ovgu.kayitlar.length },
    diger: { kayit: eslesmeler.diger.kayitlar.length } };
}
