Yalnız CSV okuma ve doğrulama adımı tamamlandı. Pano `textContent` ile sayımları ve atlama nedenlerini gösteriyor. Örnekte 150 okunan, 2 atlanan: GB-0140 “boş metin”, GB-0150 “tekrar”; GB-0139 tutuluyor. Dış kütüphane eklenmedi, commit atılmadı.

`npm test` son satırları:

```text
ℹ tests 65
ℹ suites 0
ℹ pass 65
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 72.330625
```

Yeni dosyalar:

- `src/csv.js`
- `src/tarih.js`
- `src/dogrula.js`
- `tests/csv.test.js`
- `tests/tarih.test.js`
- `tests/dogrula.test.js`
- `tests/uygulama.test.js`
- `tests/yardimci.js`

Değiştirilen: `src/uygulama.js`.