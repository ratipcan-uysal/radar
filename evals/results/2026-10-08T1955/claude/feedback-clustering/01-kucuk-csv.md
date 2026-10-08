## 1. JSON (K48)

```json
{
  "surum": "2026-10-08",
  "temalar": [
    { "ad": "Paket kapıya bırakıldı, zil çalınmadı", "kurallar": [["birak"], ["left the parcel"], ["outside"]] },
    { "ad": "Teslimat geç geldi", "kurallar": [["saat", "gel"], ["teslimat", "gec"], ["gec", "geldi"], ["late"]] },
    { "ad": "Takip ekranı çalışmıyor", "kurallar": [["takip"], ["tracking"]] }
  ],
  "ovgu": { "kurallar": [["tesekkur"], ["sorunsuz"], ["ozenli"], ["great"]] }
}
```

## 2. Kontrol tablosu (`kapsama.mjs` çıktısı, olduğu gibi)

| Tema | Kayıt | Örnek |
|---|---|---|
| Paket kapıya bırakıldı, zil çalınmadı | 5 | KR-01, KR-02, KR-03 |
| Teslimat geç geldi | 4 | KR-05, KR-06, KR-07 |
| Takip ekranı çalışmıyor | 5 | KR-09, KR-10, KR-11 |
| Övgü | 4 | KR-13, KR-14, KR-15 |

Birden çok temaya giren: KR-17 (Paket kapıya bırakıldı, zil çalınmadı, Takip ekranı çalışmıyor)
Hiçbir yere girmeyen (diğer): yok
Boş metin: yok

Betiği tek turda çalıştırdım. Çıktı, kuralları değiştirmeyi gerektirmedi.

## 3. Şüpheli eşleşmeler

| GB | Şu anki tema | Risk |
|---|---|---|
| KR-17 | Paket kapıya bırakıldı + Takip ekranı çalışmıyor | Düşük. Kayıtta iki ayrı dert var (paket çalındı, takip "yolda" diyor), bu yüzden iki temaya girmesi doğru. |
| KR-02 | Paket kapıya bırakıldı | Orta. "Zil çalınmadı" demiyor, yalnızca kapı önünde bırakıldığını ve paketin ıslandığını söylüyor. `birak` kuralı onu yakalıyor, ama tema adı onun derdini tam karşılamıyor. |
| KR-04 | Paket kapıya bırakıldı | Düşük. `left the parcel` ve `outside` ikisi de tutuyor. `outside` başka bir İngilizce yorumda "outside the hours" gibi kullanılırsa yanlış eşleşebilir. |

## 4. Bilerek dışarıda bırakılan kelimeler

- **`harika`:** alaycı kullanılabilir ("harika, yine geç geldi"). Övgüye koymadım.
- **`kurye` tek başına:** KR-13 ("Kurye çok kibardı") bir övgü ama `kurye` KR-01 ve KR-03'te de geçiyor. Tek kelimeyle bırakma temasına girerdi.
- **`gec` tek başına:** "gecen hafta" gibi sözcükleri de yakalar. Bu yüzden `teslimat`, `geldi` ya da `saat` ile birlikte kullandım.
- **`paket`, `kargo`:** her temada geçiyor, ayırt edici değil.
- **`teslimat` tek başına:** KR-14 ("Hızlı ve sorunsuz teslimat") bir övgü. Tek başına geç teslimat temasına sokardı.
- **`sorunsuz` övgüde duruyor ama risklidir:** "sorunsuz değil" gibi olumsuzlama eşleşirse yanlış övgü sayılır. Bu CSV'de böyle bir kayıt yok.

Bu bir öneridir. `data/temalar.json`'a yazmadım, çünkü sözlüğü onaylamak ürün kararıdır. Öneri dosyası geçici klasördeki `oneri.json`'dadır.
