CSV’ye dayalı sözlük önerisi:

```json
{
  "surum": "2026-10-08",
  "temalar": [
    {
      "ad": "Haber verilmeden kapıya bırakılan paket",
      "kurallar": [
        ["kapi", "birak"],
        ["courier", "left", "without", "ring"]
      ]
    },
    {
      "ad": "Geciken teslimat",
      "kurallar": [
        ["teslimat", "dendi", "aksam"],
        ["saat", "gec", "gel"],
        ["teslimat", "gec"],
        ["delivery", "late"]
      ]
    },
    {
      "ad": "Kargonun durumunu takip edememe",
      "kurallar": [
        ["takip", "ekran"],
        ["takip", "calism"],
        ["takip", "guncellenm"],
        ["tracking", "nothing"]
      ]
    }
  ],
  "ovgu": {
    "kurallar": [
      ["kurye", "kibar"],
      ["teslimat", "sorunsuz"],
      ["paketle", "ozen"],
      ["great", "service"]
    ]
  }
}
```

**Kontrol tablosu — betiğin son çıktısı, olduğu gibi:**

| Tema | Kayıt | Örnek |
|---|---|---|
| Haber verilmeden kapıya bırakılan paket | 5 | KR-01, KR-02, KR-03 |
| Geciken teslimat | 4 | KR-05, KR-06, KR-07 |
| Kargonun durumunu takip edememe | 5 | KR-09, KR-10, KR-11 |
| Övgü | 4 | KR-13, KR-14, KR-15 |

Birden çok temaya giren: KR-17 (Haber verilmeden kapıya bırakılan paket, Kargonun durumunu takip edememe)
Hiçbir yere girmeyen (diğer): yok
Boş metin: yok

**Şüpheli eşleşmeler**

CSV’de GB numarası bulunmadığından mevcut KR kimlikleri kullanıldı.

| Kayıt | Şu anki tema | Risk |
|---|---|---|
| KR-02 | Haber verilmeden kapıya bırakılan paket | Kapıya bırakılma açık; haber verilmediği belirtilmiyor. Islanma zararını ayrıca ayırmıyor. |
| KR-05 | Geciken teslimat | Saat uyuşmazlığı anlamdan çıkarılıyor. Kural saatleri karşılaştırmaz; başka metinlerde zamanında akşam teslimatını da yakalayabilir. |
| KR-16 | Övgü | “Great service” bu kayıtta 5 puanla uyumlu. Aynı ifade başka bir yorumda alaycı olabilir. |
| KR-17 | Haber verilmeden kapıya bırakılan paket; Kargonun durumunu takip edememe | İki temaya girmesi anlamlı; haber verilmediği açık değil. Paketin çalınması ayrı bir tema olarak temsil edilmiyor. |

**Bilerek dışarıda bırakılan kelimeler**

- `harika`, tek başına `great`: alaycı kullanım riski. KR-16 için yalnızca `great` ve `service` birlikte aranıyor; bu da alayı kesin ayıramaz.
- Tek başına `paket`, `kurye`, `teslimat`: olumlu ve olumsuz yorumlarda geçiyor.
- Tek başına `gec`: alt dizi eşleşmesinde “geçen” gibi ilgisiz sözcükleri yakalayabilir.
- `cal`: “çalmak”, “çalınmak” ve “çalışmak” anlamlarını karıştırabilir.

Ölçüm dosya yazmadan yapıldı. Bu öneri yalnızca verilen CSV üzerinde doğrulandı; İngilizce kuralların bir kısmının bu girdide örneği yok.
