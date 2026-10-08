docs/karsilastirma/23-claude-code-review.md ve 23-codex-inceleme.md iki ayrı kod incelemesi. Aşağıdaki bulguları düzelt. Her biri için ÖNCE hatayı gösteren bir test yaz ve kaldığını gör, SONRA düzelt ve geçtiğini gör.

1. src/maske.js: telefondan sonra gelen sayı pencereye giriyor; "Telefonum 0532 555 12 34 150 TL iade" ve "0532 555 12 34 123" numaranın başını açıkta bırakıyor. Beklenen: numaranın tamamı K15 biçiminde maskeli, sonraki sayı olduğu gibi.
2. araclar/hooks/koruma.mjs: yolu oturumun cwd'sine değil proje köküne göre çöz (git kökü ya da CLAUDE_PROJECT_DIR); büyük/küçük harf duyarsız karşılaştır; apply_patch içindeki "*** Move to:" hedeflerini de denetle.
3. evals/run.mjs: kapsama betiği başarısız olursa ya da JSON yanlış biçimdeyse çökme, o fixture FAIL olsun; gate eksik koşumları (beklenen araç × fixture çiftleri) kalmış say; araç süreci sıfır dışı kodla çıktıysa FAIL; kapsama puanlamasında üç dert aynı temaya düşerse FAIL (gruplar farklı temalarda olmalı).
4. araclar/mcp/radar-mcp.mjs: bilinmeyen araç adı JSON-RPC hatası dönsün.
5. tests/mcp.test.js: "uygulamayla aynı sıra" testi gerçekten uygulamanın sonucuyla (src/analiz.js) karşılaştırsın.

Kapsam dışı: diğer bulgular. data/temalar.json ve tests/beklenen/ornek-sonuc.json'a dokunma.
Bitince npm test son satırlarını ve her bulgu için eklediğin testin adını listele. Commit atma.
