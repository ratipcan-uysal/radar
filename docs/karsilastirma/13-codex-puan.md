Yalnız puan adımı uygulandı. Kesirlerle hesaplama, K25 yuvarlaması, temel puan ve sıralı pano tamamlandı. Commit atılmadı.

`hesapla.mjs` son satırı:

```text
ornek-sonuc.json yazıldı: 148 geçerli kayıt, 7 tema.
```

Ardından `npm test` son satırları:

```text
ℹ tests 103
ℹ suites 0
ℹ pass 103
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 140.810208
```

| Sıra | Tema | Puan |
|---|---|---|
| 1 | Geç ya da hiç gelmeyen bildirim | 229,5 |
| 2 | İptal ücreti ve politikası | 192,0 |
| 3 | Ödeme hatası | 113,3 |

Yazılan dosyalar:

- `src/puan.js`
- `src/bicim.js`
- `src/analiz.js`
- `tests/beklenen/hesapla.mjs`
- `tests/beklenen/ornek-sonuc.json`
- `tests/ornek-dosya.test.js`
- `tests/puan.test.js`
- `tests/bicim.test.js`

Değiştirilen dosyalar:

- `src/tarih.js`
- `src/uygulama.js`
- `tests/uygulama.test.js`