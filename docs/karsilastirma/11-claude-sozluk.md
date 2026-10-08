Sözlüğü önerdim ve CSV'nin 150 satırının hepsinde tek tek elle sınadım. Bu oturumda `node` ve `python3` betiklerini çalıştırma izni olmadığı için sayıları programla doğrulayamadım. Aşağıdaki sayılar satır satır elle yapılan eşleştirmeden çıktı. Sözlük onaylanınca K51'deki betikle bir kez yeniden hesaplanmalı.

Eşleştirmeyi şöyle varsaydım: metin normalize edilir, sonra kelimenin metnin içinde geçip geçmediğine bakılır. Bu yüzden `iptal` kuralı "iptali" ve "iptal ettim" sözcüklerini de yakalar.

## 1. Sözlük (K48)

```json
{
  "surum": "2026-10-08",
  "temalar": [
    {
      "ad": "İptal ücreti ve politikası",
      "kurallar": [
        ["iptal", "ucret"],
        ["iptal", "kesil"],
        ["iptal", "kesinti"],
        ["iptal", "kesti"],
        ["iptal", "ceza"],
        ["iptal", "para"],
        ["iptal", " tl"],
        ["iptal", "iade"],
        ["iptal", "sure"],
        ["iptal", "politika"],
        ["iptal", "kosul"],
        ["cancellation fee"],
        ["cancel", "fee"],
        ["cancel", "charge"],
        ["cancel", "refund"],
        ["cancel", "policy"]
      ]
    },
    {
      "ad": "Geç ya da hiç gelmeyen bildirim",
      "kurallar": [
        ["bildirim"],
        ["mesaj", "gelme"],
        ["mesaj", "gec"],
        ["haber", "gelm"],
        ["sira", "kacir"],
        ["notification"],
        ["reminder"]
      ]
    },
    {
      "ad": "Ödeme hatası",
      "kurallar": [
        ["odeme", "yapama"],
        ["odeme", "basarisiz"],
        ["odeme", "iki kere"],
        ["odeme", "donuyor"],
        ["odeme", "sorun"],
        ["on odeme"],
        ["3d secure"],
        ["reddedildi"],
        ["kayitli kart"],
        ["taksit"],
        ["kapora"],
        ["payment"],
        ["declined"],
        ["charged twice"]
      ]
    },
    {
      "ad": "Giriş ve hesap sorunu",
      "kurallar": [
        ["yeniden giris"],
        ["giris yapami"],
        ["sifre"],
        ["sms", "gelm"],
        ["hesab", "bolun"],
        ["kayit olami"],
        ["login"],
        ["log in"],
        ["sign in"],
        ["sign up"],
        ["password"],
        ["verification code"]
      ]
    },
    {
      "ad": "Sadakat puanı kaybı",
      "kurallar": [
        ["puan", "sifirlan"],
        ["puan", "silin"],
        ["puan", "kayb"],
        ["puan", "gitti"],
        ["points", "lost"],
        ["points", "reset"],
        ["points", "missing"]
      ]
    },
    {
      "ad": "Yanlış ya da eski restoran bilgisi",
      "kurallar": [
        ["fotograf", "eski"],
        ["fotograf", "degis"],
        ["fiyat", "guncel"],
        ["fiyat", "farkli"],
        ["menude yok"],
        ["bilgi", "yanlis"],
        ["saat", "yanlis"],
        ["adres", "eski"],
        ["adres", "yanlis"],
        ["tasinmis"],
        ["gittik", "kapali"],
        ["telefon numara", "degil"],
        ["telefon numara", "yanlis"],
        ["wrong address"],
        ["wrong", "hours"],
        ["outdated"],
        ["photos", "old"]
      ]
    },
    {
      "ad": "Masa ve oturma yeri seçimi",
      "kurallar": [
        ["masa", "sec"],
        ["masa", "kroki"],
        ["bahce", "salon"],
        ["alan", "secim"],
        ["erisilebilir"],
        ["tekerlekli"],
        ["sessiz", "kose"],
        ["cam kenar"],
        ["window seat"],
        ["wheelchair"],
        ["choose", "table"],
        ["select", "table"]
      ]
    }
  ],
  "ovgu": {
    "kurallar": [
      ["sorunsuz"],
      ["en sevdigim"],
      ["arayuz", "sade"],
      ["iki dokunus"],
      ["pratik"],
      ["hayat kurtar"],
      ["gercekci"],
      ["guzel dusunul"],
      ["cok kolay"],
      ["oneririm"],
      ["boyle devam"],
      ["iade", "ayni gun"],
      ["pasta getir"],
      ["mukemmel"],
      ["great"],
      ["love"],
      ["recommend"],
      ["excellent"],
      ["awesome"]
    ]
  }
}
```

## 2. Kontrol tablosu

| Tema | Kayıt | Örnek GB | Not |
|---|---|---|---|
| İptal ücreti ve politikası | 35 | 0094 (iptal + para), 0131 (politika), 0137 (İngilizce) | GB-0020 ve 0070 bu temaya girmiyor (K30) |
| Geç ya da hiç gelmeyen bildirim | 29 | 0003, 0085 ("bildirim" kelimesi yok), 0080 (İngilizce) | 0024, 0111, 0085, 0101 "mesaj" ya da "haber" kuralıyla giriyor |
| Ödeme hatası | 21 | 0015, 0086, 0121 (İngilizce) | |
| Giriş ve hesap sorunu | 11 | 0011, 0046, 0066 | 0150, 0011'in birebir tekrarı. K10'a göre panoda **10** görünür |
| Sadakat puanı kaybı | 2 | 0017, 0047 | 0033, 0063 ve 0090 övgü olarak sayılıyor, bu temaya girmiyor (KK-41) |
| Yanlış ya da eski restoran bilgisi | 12 | 0004, 0022, 0072 | |
| Masa ve oturma yeri seçimi | 14 | 0018, 0027, 0148 | İstek kayıtları, sıralamaya girer (K39) |
| Övgü | 27 | 0002, 0019, 0116 (İngilizce) | Hiçbiri bir şikâyet temasına girmiyor |

**Toplam:** 149 dolu satırdan 148'i tek temaya girdi. GB-0105 üç temaya girdi (iptal, bildirim, ödeme), bu KK-07'nin beklediği sonuç. Kabul kriterlerindeki tema beklentileriyle karşılaştırdım; hepsi tutuyor: KK-09'daki 8 çift, KK-10, KK-11, KK-12, KK-39 ve KK-41.

**Tam listeler:**
- **İptal:** 0005, 0007, 0013, 0021, 0030, 0034, 0041, 0048, 0052, 0058, 0064, 0075, 0077, 0084, 0093, 0094, 0096, 0098, 0100, 0103, 0105, 0106, 0117, 0123, 0128, 0129, 0130, 0131, 0132, 0133, 0135, 0137, 0141, 0146, 0149
- **Bildirim:** 0003, 0006, 0009, 0020, 0024, 0031, 0040, 0045, 0051, 0053, 0056, 0057, 0059, 0061, 0065, 0070, 0071, 0080, 0083, 0085, 0088, 0089, 0095, 0101, 0105, 0111, 0142, 0143, 0144
- **Ödeme:** 0001, 0008, 0010, 0015, 0026, 0028, 0042, 0055, 0068, 0076, 0082, 0086, 0092, 0102, 0105, 0107, 0112, 0120, 0121, 0124, 0127
- **Giriş ve hesap:** 0011, 0046, 0050, 0066, 0069, 0081, 0099, 0108, 0109, 0139, 0150
- **Restoran bilgisi:** 0004, 0012, 0022, 0043, 0060, 0072, 0078, 0104, 0110, 0126, 0136, 0147
- **Masa ve oturma yeri:** 0018, 0027, 0035, 0038, 0067, 0073, 0097, 0113, 0114, 0118, 0122, 0134, 0138, 0148
- **Övgü:** 0002, 0014, 0016, 0019, 0023, 0025, 0029, 0032, 0033, 0036, 0037, 0039, 0044, 0049, 0054, 0062, 0063, 0074, 0079, 0087, 0090, 0091, 0115, 0116, 0119, 0125, 0145

### Şüpheli eşleşmeler (yanlış tema riski)

| GB | Şu an | Risk |
|---|---|---|
| 0105 | İptal, Bildirim, Ödeme | Metindeki "harika" alaycı. Bu yüzden "harika" kelimesini övgüye bilerek koymadım. Bedeli şu: ileride gerçekten "harika" diyen yorumlar övgüye girmeyecek. |
| 0001, 0107 | Ödeme | "Kayıtlı kartım silinmiş" bir hesap sorunu da sayılabilir. |
| 0124, 0127 | Ödeme | Kapora iadesi gecikiyor. Bir iptalin sonucu olabilir ama metinde "iptal" geçmiyor. |
| 0026, 0028 | Ödeme | Taksit seçeneğinin olmaması bir hata değil, eksik özellik. |
| 0021, 0093 | İptal | "Size ücret ödemişim, anlamadım" cümlesi ödemenin kime gittiğiyle ilgili bir kafa karışıklığı da olabilir. |
| 0094, 0146 | İptal | "Kartımdan para çekildi" ifadesi geçiyor ama Ödeme temasına girmiyor (KK-39'un beklediği). |
| 0048, 0141 | İptal | "Restoran kapalıydı": çalışma saati bilgisi yanlış olabilir, ama Restoran bilgisi temasına girmiyor. |
| 0017, 0047 | Sadakat | Sorun çıkış yapıp girince oluşuyor, Giriş ve hesap temasına da yakın. |
| 0055, 0092 | Ödeme | Asıl sorun uygulamanın çökmesi olabilir. |
| 0064, 0128 | İptal | Yalnız `["iptal", " tl"]` kuralıyla giriyorlar. Bu kural `normalize.js` kurallardaki boşluğu silmezse çalışır. "75TL" gibi bitişik yazımı da kaçırır. |
| 0113, 0134 | Masa (övgü değil) | İkisi de "Teşekkürler" ile bitiyor. "tesekkur" kelimesini övgüye bilerek koymadım; koysaydım bu iki istek de övgü sayılırdı. |

**Örnekte yanlış eşleşme yapmayan ama ileride sorun çıkarabilecek kurallar:**
- `["iptal", "sure"]` kuralı "sürekli" kelimesini de yakalar.
- `["odeme", "sorun"]` kuralı "sorunsuz ödeme" gibi olumlu bir cümleyi de yakalar.
- `["iptal", "para"]` gibi kurallar bütün metinde arar. İptal ile ilgisiz bir cümlede geçen kelimeyle de tutabilir.

**Örnekte hiç kayıt yakalamayan kurallar:** Çoğu İngilizce kural, `iptal+kosul`, `mesaj+gec`, Sadakat temasındaki `silin`, `kayb` ve `gitti` kuralları ve övgüdeki `mukemmel`, `love` ve `recommend`. Bunları başka yazılışları da yakalamak için ekledim; örnek veride doğrulanmadılar.

### Hiçbir temaya girmeyen kayıtlar
- **Diğer:** yok. Dolu 149 satırın hepsi bir temaya ya da övgüye girdi.
- **GB-0140:** metni boş. K13'e göre "boş metin" nedeniyle atlanır; "diğer"e girmez.
- **GB-0150:** GB-0011'in birebir tekrarı. K10 ve K23'e göre "tekrar" nedeniyle atlanır.

Bu iki atlama, son commit'teki "150 okunan, 2 atlanan" sayısıyla tutuyor.
