1. **Yüksek — [src/maske.js:23](/Users/ratipcanuysal/claude_lecture/masterclass/radar/src/maske.js:23)**  
   Telefonun ardından gelen sayı yanlış pencereye dahil ediliyor; numaranın başı maskesiz kalıyor. **Girdi:** `0532 555 12 34 123`. **Çıktı:** `0532 *** ** ** *23`. K15/K27 ihlal ediliyor; aynı metin pano ve rapora taşınıyor.

2. **Orta — [evals/run.mjs:157](/Users/ratipcanuysal/claude_lecture/masterclass/radar/evals/run.mjs:157)**  
   Yeniden puanlamada eksik çıktı dosyaları atlanıyor; gate yalnız bulunan sonuçların başarı oranını hesaplıyor. **Girdi:** `--puanla` klasöründe yalnız bir başarılı fixture çıktısının bulunması. Diğer fixture ve araç sonuçları eksikken **“GEÇTİ · 1/1 PASS”** üretiliyor.

3. **Orta — [evals/run.mjs:42](/Users/ratipcanuysal/claude_lecture/masterclass/radar/evals/run.mjs:42)**  
   Üç ayrı dert için aynı tema tekrar kullanılabiliyor; temaların ayrı olması denetlenmiyor. **Girdi:** Kapıya bırakma, gecikme ve takip kurallarının tamamını tek “Bütün şikâyetler” temasında birleştiren, övgüyü ayrı tutan sözlük. `01-kucuk-csv` fixture’ı yanlış biçimde **PASS** alıyor.

4. **Orta — [evals/run.mjs:40](/Users/ratipcanuysal/claude_lecture/masterclass/radar/evals/run.mjs:40)**  
   Kapsama betiğinin başarısız çıkışı kontrol edilmeden stdout ayrıştırılıyor. **Girdi:** JSON kod bloğunda `{}` üreten model cevabı. Alt betik hata veriyor; boş stdout üzerinde `JSON.parse` **SyntaxError** fırlatıyor. Hatalı cevabı FAIL olarak kaydetmek yerine eval koşusu kesiliyor.

5. **Orta — [evals/run.mjs:171](/Users/ratipcanuysal/claude_lecture/masterclass/radar/evals/run.mjs:171)**  
   Araç sürecinin çıkış kodu kaydediliyor fakat başarı hükmüne katılmıyor. **Girdi:** `02-celiski` işaretlerini stdout’a yazıp `1` koduyla çıkan süreç. Süreç başarısız olmasına rağmen fixture **PASS** alıyor ve gate’i geçirebiliyor.

6. **Orta — [araclar/hooks/koruma.mjs:41](/Users/ratipcanuysal/claude_lecture/masterclass/radar/araclar/hooks/koruma.mjs:41)**  
   Korunan yollar proje kökü yerine `girdi.cwd` üzerinden karşılaştırılıyor. **Girdi:** `cwd=<proje>/data`, `tool_name="Edit"`, `file_path=<proje>/data/temalar.json`. Yol `temalar.json` olarak hesaplanıyor, koruma desenine uymuyor ve betik **0** ile izin veriyor.

7. **Orta — [araclar/hooks/koruma.mjs:21](/Users/ratipcanuysal/claude_lecture/masterclass/radar/araclar/hooks/koruma.mjs:21)**  
   Patch içindeki `*** Move to:` hedefleri denetlenmiyor. **Girdi:** `*** Update File: src/puan.js` ve `*** Move to: data/temalar.json` içeren patch. Korunan hedefe taşıma işlemi betikten **0** koduyla geçiyor.

Dosya değiştirmedim. `npm test` sonucu: **139 test, 139 geçen, 0 kalan, 0 atlanan**.