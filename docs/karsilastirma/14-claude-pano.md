Pano adımı bitti. `npm test` 114/114 geçiyor (önceden 103). Sayfayı tarayıcıda açmadım. Pano ve uygulama bağlantısı yalnız sahte DOM'la test edildi.

`npm test` son satırları:
```
ℹ tests 114
ℹ pass 114
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
```

**Yeni dosyalar**
- `src/maske.js`
- `src/alinti.js`
- `src/pano.js`
- `tests/maske.test.js`
- `tests/alinti.test.js`
- `tests/pano.test.js`
- `tests/sahte-dom.js`: testlerin ortak sahte DOM'u.

**Değiştirilen dosyalar**
- `src/analiz.js`
- `src/uygulama.js`
- `tests/uygulama.test.js`

Commit atmadım.

Bilmeniz gerekenler:
- **GB-0084 ve GB-0120 tam örnek dosyada alıntı olarak görünmüyor.** İkisi de kendi temasının en yeni 3 kaydı arasında değil. Maskeli çıktıyı göstermek için bu iki satırı tek başına yükleyen bir fixture kullandım. Tam örnek dosyada ise DOM'da `0532`, `987 65` ve `555 12` bulunmadığını ayrıca kontrol ediyorum.
- **`analizEt` aynı kaldı.** Alıntıları `analizEtAlintili` ekliyor. `analizEt`'in çıktısı değişse onaylı beklenen değerlerle karşılaştıran `ornek-dosya.test.js` bozulurdu. İsterseniz ikisini birleştirebilirim, ama o testi veya onaylı JSON'u değiştirmek gerekir.
- **Sözlük hatası artık dosya reddinden önce görünüyor.** `uygulama.js` önce sözlüğü bekliyor. `data/temalar.json` yüklenemezse, hatalı başlıklı bir dosya da sözlük hatasını gösterir, ret mesajını değil.
- **`uygulama.test.js` tam metin eşitliği yerine parça parça kontrol ediyor.** Panonun metni alıntılarla uzadığı için böyle yaptım.

Maske plan kuralına uyuyor: 10-12 hane, başı 0, 5 ya da `+90`. `50 TL`, `5.2`, `3D Secure` ve tarihler değişmiyor. "50 0532 555 12 34" gibi bitişik sayıda yalnız telefon kısmı maskeleniyor.
