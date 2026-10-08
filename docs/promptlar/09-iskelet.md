docs/plan.md'nin §3'teki ilk adımını uygula: iskelet. Yalnız bu adımı yap, sonraki adımlara geçme.

Bu adımda olsun:
- package.json ("type": "module", "test": "node --test", bağımlılık yok), README.md (sayfanın `python3 -m http.server` ile nasıl açılacağı ve `npm test`; K47), index.html, radar.css, src/uygulama.js.
- index.html: başlık, CSV dosya seçici, durum alanı, boş pano alanı, devre dışı "Raporu indir" düğmesi ve yanında K33 uyarı metni.
- uygulama.js: dosya seçilince dosya adını ve satır sayısını (başlık hariç) durum alanına yazsın. Analiz yok.
- tests/ altında bu adımı doğrulayan en az bir test; tarayıcıya bağlı olmayan küçük bir saf fonksiyonla (ör. satır sayma) test edilebilir yap.
- Dış kütüphane, CDN, ağ isteği yok (K3, K17). innerHTML yerine textContent.

Bitince: `npm test` çalıştır ve çıktısının son satırlarını göster. Hangi dosyaları yazdığını listele. Commit atma.
