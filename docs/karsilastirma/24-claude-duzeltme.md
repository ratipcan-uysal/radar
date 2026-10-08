Beş bulgunun beşi de düzeltildi. Her birinde yeni test düzeltmeden önce kaldı, düzeltmeden sonra geçti. Commit atmadım.

**`npm test` son satırları** (başlangıçta 139/139'du):
```
ℹ tests 151
ℹ pass 151
ℹ fail 0
ℹ skipped 0
```

## Bulgular ve eklenen testler

**1. `src/maske.js`**: telefondan sonra gelen sayı
- Test (`tests/maske.test.js`): `K15: telefondan sonra gelen sayı numaranın başını açıkta bırakmaz, kendisi değişmez`
- Düzeltmeden önce: `Telefonum 0532 *** ** ** *50 TL iade`. Sonra: `Telefonum **** *** ** 34 150 TL iade`. `0532 555 12 34 123` ve `+90 532 555 12 34 150 TL` de doğru maskeleniyor.
- Düzeltme: telefon olabilecek bütün sayı dizileri sırayla değerlendiriliyor. 0 ya da +90 ile başlayan öne geçiyor. Sonra önekine göre tam uzunlukta olan, sonra en soldaki seçiliyor. Seçilenle çakışan diziler eleniyor. Eski `50 0532 555 12 34` testi hâlâ geçiyor.

**2. `araclar/hooks/koruma.mjs`**: dördü de düzeltmeden önce izin veriyordu (çıkış 0)
- `koruma (K52): alt dizinde çalışan oturum proje köküne göre denetlenir (git kökü)`
- `koruma (K51): CLAUDE_PROJECT_DIR verilmişse kök odur, oturumun cwd'si değil`
- `koruma (K51, K52): yol büyük/küçük harf duyarsız karşılaştırılır`
- `koruma (K52): apply_patch içindeki "*** Move to:" hedefi denetlenir`
- Kök artık `CLAUDE_PROJECT_DIR`. Yoksa git kökü, o da yoksa oturumun dizini. Göreli yollar oturumun dizinine göre çözülüyor. Kabuk komutu denetimi de artık büyük/küçük harfe bakmıyor.

**3. `evals/run.mjs`** (`tests/eval-puanlayici.test.js`)
- `eval puanlayıcı (K48): JSON sözlük şemaya uymuyorsa koşu çökmez, fixture FAIL olur`: önce SyntaxError ile çöküyordu.
- `eval puanlayıcı (K48): kapsama betiği başarısız olursa koşu çökmez, fixture FAIL olur`: önce SyntaxError ile çöküyordu.
- `eval puanlayıcı (K48): üç dert tek temada toplanırsa FAIL (gruplar ayrı temalarda olmalı)`: önce PASS veriyordu.
- `eval gate (gate.json): eksik araç × fixture koşumu kalmış sayılır`: önce tek çıktıyla GEÇTİ diyip 0 ile çıkıyordu.
- `eval koşucu: araç süreci sıfır dışı kodla çıktıysa işaretler tutsa da FAIL`: bu test önce yalnız `kosuPuanla` adlı fonksiyon olmadığı için kaldı. Ama çıkış kodu hükme hiç katılmıyordu, yani davranış da gerçekten yoktu.

Bulgu 3'te istenenin biraz ötesine geçen iki ek var:
- **Araç bulunamazsa:** araç programı hiç yoksa koşu artık çökmüyor, o fixture FAIL oluyor. Claude incelemesi aynı bulguda bunu da anıyordu. Testi: `eval koşucu: araç bulunamazsa (ENOENT) koşu çökmez, sıfır dışı sonuç döner`.
- **Yeniden puanlama:** `--puanla` artık önceki `ozet.json`'daki çıkış kodunu taşıyor. Böylece yeniden puanlama bir FAIL'i PASS'e çeviremiyor.

Gate artık her zaman iki aracın bütün fixture'larını bekliyor. Bunun sonucu olarak `--arac claude` ya da `--skill` ile yapılan kısmi koşu gate'i hiç geçemez ve 1 ile çıkar. Çıktıda eksik çiftler listeleniyor.

**4. `araclar/mcp/radar-mcp.mjs`**
- Test: `MCP: bilinmeyen araç adı JSON-RPC hatası döner, analiz çalışmaz`
- Önce normal sonuç dönüyordu. Şimdi `-32602 Bilinmeyen araç: radar_ozet2` hatası dönüyor ve analiz çalışmıyor.

**5. `tests/mcp.test.js`**
- Test: `MCP (K40): radar_ozet örnek dosyada uygulamayla (src/analiz.js) aynı sırayı ve puanları verir`
- Bütün temaların sırası, adı, puanı ve kayıt sayısı `analizEt` ile karşılaştırılıyor.
- Sunucu tutarlı olduğu için bu test baştan geçiyordu. Kaldığını görmek için sunucuya geçici olarak ilk iki temanın adını yer değiştiren bir hata koydum. Eski test bunu kaçırdı ve geçti, yeni test kaldı. Hatayı sonra geri aldım.

## Yapılmayan kontroller
- **Kayıtlı eval çıktıları:** `evals/results/2026-10-08T2000`'deki çıktıların yeni kurallarla hâlâ aynı hükmü alıp almadığına bakmadım, çünkü `node evals/run.mjs --puanla` bu oturumda onay istedi. Kopyası scratchpad'de; isterseniz siz çalıştırabilirsiniz. Kaba sözlükle iyi sözlüğü karşılaştıran eski test hâlâ geçiyor.
- **Test adlarında K numarası:** gate, çıkış kodu, ENOENT ve bilinmeyen araç testleri K numarası anmıyor, çünkü eval koşucusunu ve MCP protokolünü kapsayan bir karar yok. Bu AGENTS.md kuralına aykırı.
- **Kapsam dışı bıraktıklarım:** baseline karşılaştırmasının eksik satırları atlaması (aynı incelemenin 157. satır bulgusunda geçiyor) ve diğer bütün bulgular.

`data/temalar.json` ile `tests/beklenen/ornek-sonuc.json` değişmedi; özet kontrol testleri geçiyor. `.codex/config.toml` ve `docs/kararlar.md` ben başlamadan önce de değişmişti, onlara dokunmadım.
