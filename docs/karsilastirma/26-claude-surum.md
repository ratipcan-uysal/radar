release-manager ajanı işini bitirdi. Önerilen sürüm **0.1.0**. `CHANGELOG.md` yazıldı. Commit, tag ve push yapılmadı. Aşağıdaki rapor ajanın kendi raporundan alındı; dosya ve komutları ben ayrıca kontrol etmedim.

## Sürüm numarası
- **Öneri:** `v0.1.0`. `package.json` zaten `0.1.0`, o dosyada değişiklik gerekmiyor.
- **Gerekçe:** Bu ilk sürüm ve eklenenlerin hepsi kullanıcıya görünen yeni özellik (CSV okuma, temalar, puan, pano, rapor indirme, görünüm). `v` ile başlayan tag yok, mevcut tag'ler `adim-01…20` biçiminde. Yayımlanmış önceki sürüm olmadığı için yama sürümü anlamsız.
- **Sürüm 2'ye kalanlar:** Kapsam dondurulduğu için şunlar bu sürüme girmedi: alt temalar, puan–metin uyuşmazlığı, yurt dışı telefon maskesi, kanal ağırlığı, sözlükteki şüpheli eşleşmeler.

## Sürüm notu
- `adim-01-notlar..HEAD` aralığındaki 30 commit'ten çıkarıldı. Kullanıcıya görünen 8 commit "Yeni" altında, gerisi "İç değişiklikler" altında.
- `becdcf7` karma kapsamlı bir commit. Yalnız maske kısmını kullanıcıya yansıttım diye ajan bunu notta belirtmiş.
- Maske hatası hiç yayımlanmadığı için "Düzeltildi" bölümü boş.
- Değişen tek dosya `CHANGELOG.md`.

## `npm test`
151 test, 151 geçti, 0 başarısız.

## Kontrol listesi
**Doğrulananlar:**
- Testler 151/151 geçti; bunu ajan bu oturumda çalıştırdı.
- Gizlilik, kod taraması (ajan Grep ile taradı): `src/` ve `index.html` içinde tek ağ çağrısı yerel `fetch('data/temalar.json')`. Dış URL ve `innerHTML` yok.
- Gizlilik, çalışırken: `docs/karsilastirma/24-ux-denetim.md` raporuna göre 72 isteğin hepsi `localhost`'a gitti. Ajan bu raporu okudu, kendisi yeniden ölçmedi.
- Tarayıcı (Chromium): aynı ux-auditor raporuna göre örnek analiz, rapor, maske ve dar ekran geçti. Ajan tarayıcıda yeniden bakmadı.

**Doğrulanmayanlar:**
- Odak çerçevesi: rapor "kontrol edilemedi" diyor.
- Safari ve Edge (K18): yalnız Chromium'da bakılmış.
- 5.000 satır / 2 saniye (K19): ölçülmemiş. Node testleri bunu kanıtlamaz.
- `evals/results` çıktılarının yeni kurallarla yeniden puanlanması: yapılmamış.

**Açık noktalar:**
- K42'ye göre veri sorumlusu onayı sürüm 2'den önce alınmalı. Onayın alındığına dair kayıt bulunamadı, sizin teyit etmeniz gerekiyor.
- Safari/Edge ve 5.000 satır kontrolleri yapılmadan yayımlamak ya bilinçli kabul edilmeli ya da notlara "bilinen sınır" olarak yazılmalı.
- Commit bekleyenler: `CHANGELOG.md`. Sürüm kapsamı dışında tutulan, izlenmeyen `docs/karsilastirma/26-claude-surum.md` ve `docs/promptlar/25-surum.md`.

## Sizin çalıştıracağınız komutlar
Hiçbirini çalıştırmadım. `git push` projede yasak olduğu için push'u kendiniz atmalısınız:

```
git add CHANGELOG.md
git commit -m "Sürüm 0.1.0: CHANGELOG; npm test 151/151

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git tag -a v0.1.0 -m "Radar 0.1.0"
git push origin main
git push origin v0.1.0
gh release create v0.1.0 --title "Radar 0.1.0" --notes-file <(sed -n '/^## 0.1.0/,$p' CHANGELOG.md)
```
