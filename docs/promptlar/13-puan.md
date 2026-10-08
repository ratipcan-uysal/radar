docs/plan.md §3'teki puan adımını uygula. Yalnız bu adımı yap.

Kapsam:
- src/puan.js, src/bicim.js: K1, K9, K14, K22, K25, K26, K39 (övgü puanlanmaz), K40 (temel puan da hesaplanır). Puanı kesirli tam sayılarla hesapla (plan §0), yuvarlamayı K25'e göre yap.
- tests/beklenen/hesapla.mjs (K51): uygulamanın src/ kodunu KULLANMADAN kendi sade koduyla örnek dosyanın beklenen sonucunu (tema başına kayıt sayısı, ortalama puan, son 14 gün payı, puan, temel puan, sıra) üretip tests/beklenen/ornek-sonuc.json'a yazsın. Uygulamayla yalnız data/temalar.json'u paylaşsın.
- tests/ornek-dosya.test.js: uygulamanın sonucunu ornek-sonuc.json ile karşılaştırsın.
- Panoda temalar puana göre sıralı, her tema için puan, kayıt sayısı, ortalama puan görünsün (K12, K25 biçimi; textContent).
- Dış kütüphane yok.

Bitince hesapla.mjs'i çalıştır, sonra `npm test`; ikisinin son satırlarını ve örnek dosyanın ilk üç temasını puanlarıyla göster. Yazdığın ve değiştirdiğin dosyaları listele. Commit atma.
