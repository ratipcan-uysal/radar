docs/plan.md §3'teki tema eşleştirme adımını uygula. Yalnız bu adımı yap.

Kapsam: src/normalize.js, src/sozluk.js, src/tema.js (plan'daki görevleriyle). Sözlük şeması K48; onaylı sözlük data/temalar.json (K52). Kurallar: K6 (çok temalı kayıt her temada; hiçbirine girmeyen "diğer"), K8 (İngilizce aynı temaya), K39 (övgü ayrı; şikâyet temasına da giriyorsa orada da sayılır).

- Testler iki katmanlı olsun: tests/fixtures/test-sozluk.json ile küçük birim testleri, data/temalar.json ile örnek dosyadaki kayıtların beklenen temaları (docs/karsilastirma/11-claude-sozluk.md'deki tam listeler).
- Türkçe harf dönüşümünü elle yaz (plan §0); toLocaleLowerCase kullanma.
- Panoda şimdilik her tema için ad ve kayıt sayısı görünsün, "diğer" ve övgü en altta (textContent).
- Dış kütüphane yok.

Bitince `npm test` çalıştır, son satırları göster; yazdığın ve değiştirdiğin dosyaları listele. Commit atma.
