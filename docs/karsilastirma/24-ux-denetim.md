# UX denetimi: ux-auditor rolü (Claude Code, yerleşik tarayıcı, 8 Ekim)

Sayfa `python3 -m http.server` ile açıldı, dosyalar tarayıcıda yüklendi. Kontroller sayfa üzerinde JavaScript ile ölçüldü.

| Kriter | Ne gördüm | Kanıt | Hüküm |
|---|---|---|---|
| Örnek dosya analizi (K12, K35) | Kapsam satırı, 7 tema, ilk üç puan 229,5 / 192,0 / 113,3 | Sayfa metni | geçti |
| "Raporu indir" etkin ve uyarılı (K33) | Analizden sonra etkin; yanında kişisel bilgi uyarısı | Düğme `disabled=false`, uyarı metni var | geçti |
| Rapor biçimi (K16, K28, K35, K46) | `# Radar raporu: 2026-10-05`, altında kapsam satırı, 5 `##` tema | İndirilen Blob içeriği | geçti |
| Telefon ve e-posta maskesi panoda (K15, K27, K42) | `**** *** ** 34`, `+** *** *** ** 43`, `a***@***`; "50 TL" korunuyor | Telefonlu 4 satırlık dosya | geçti |
| Raporda maske kaçışı (K50) | `\*\*\*\* \*\*\* \*\* 34` | İndirilen Blob içeriği | geçti |
| Dış istek yok (K3) | Bütün istekler `localhost:8745` | Ağ kaydı, 72 istek | geçti |
| Dar ekran (375 px) | Yatay kaydırma yok | `scrollWidth 375 / 375` (adım 12) | geçti |
| Klavye ile alıntı açma | `summary` odaklanıyor ve açılıyor | `focus()` + `click()` | geçti |
| Odak çerçevesi görünür | Script ile verilen odak `:focus-visible` tetiklemiyor | - | kontrol edilemedi |
| Safari ve Edge (K18) | Yalnız Chromium tabanlı tarayıcıda bakıldı | - | kontrol edilemedi |
| 5.000 satır, 2 saniye (K19) | Ölçülmedi | - | kontrol edilemedi |
