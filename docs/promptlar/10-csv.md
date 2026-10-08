docs/plan.md §3'teki CSV okuma ve doğrulama adımını uygula. Yalnız bu adımı yap.

Kapsam: csv ayrıştırma, tarih doğrulama, satır doğrulama, tekrar ve çelişkili id ayıklama (K10, K11, K23, K24, K31, K34, K44, K49). Plan'daki modül adlarını kullan (src/csv.js, src/tarih.js, src/dogrula.js). Saf fonksiyonlar; "bugün" parametre olarak gelir (K45).

- Her kural için tests/ altında birim testi yaz. Örnek CSV'deki gerçek satırları kanıt olarak kullan (GB numarasıyla).
- Panoda şimdilik yalnız okunan, atlanan ve atlama nedenleri görünsün (uygulama.js'i buna göre güncelle; textContent).
- Dış kütüphane yok.

Bitince `npm test` çalıştır, son satırları göster; yazdığın ve değiştirdiğin dosyaları listele. Commit atma.
