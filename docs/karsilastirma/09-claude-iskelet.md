İskelet adımı bitti. `npm test` 5 testin 5'inde geçti. Sayfayı tarayıcıda açmadım, bu yüzden `uygulama.js`'nin dosya seçince durum alanını yazması denenmedi.

`npm test` çıktısının son satırları:
```
✔ yalnız başlık ya da boş metin 0 verir
✔ CRLF, BOM, sondaki satır sonu yokluğu ve boş satırlar
✔ tırnak içindeki satır sonu ayrı satır sayılmaz
✔ örnek dosyada 150 satır vardır
ℹ tests 5
ℹ pass 5
ℹ fail 0
```

Yazdığım dosyalar:
- `package.json`
- `README.md`
- `index.html`
- `radar.css`
- `src/satir-say.js`
- `src/uygulama.js`
- `tests/satir-say.test.js`

- **`src/satir-say.js`:** Tarayıcıya bağlı olmayan saf fonksiyon `satirSay(metin)`. Başlık hariç satır sayar. Baştaki BOM'u atar, CRLF'yi ve boş satırları işler, tırnak içindeki satır sonunu ayrı satır saymaz. Bu dosyayı sen istemedin, test edilebilir olsun diye ekledim.
- **`src/uygulama.js`:** Dosya seçilince durum alanına "dosya adı: N satır" yazar. Analiz yok, `textContent` kullanıyor.
- **Dış bağımlılık:** Yok. CDN ve ağ isteği de yok.
- **Planla fark:** `docs/plan.md` Adım 0, `kaynak.test.js` ve sözlük yüklemesini de içeriyor. İstediğin listede olmadığı için ikisini yapmadım.
- **Git:** Commit atmadım.
