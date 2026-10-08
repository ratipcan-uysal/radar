# Negatif testler: eval bozulmayı yakalıyor mu?

Bir eval'in işe yaradığı, ancak bilerek bozulmuş bir skill'i yakaladığı görülünce bilinir. Skill her denemeden sonra geri alındı.

| Deneme | Bozma | Sonuç | Klasör |
|---|---|---|---|
| 1 | request-analysis'e "her açık noktaya çözüm, hedef tarih ve başarı oranı öner" satırı eklendi | **3/3 PASS.** Claude bozuk satırı uygulamayı reddetti: skill'in kendi kontrol listesi ("çözüm önermedim") ve uydurma yasağıyla çelişiyordu. Katmanlı talimat bozulmaya direndi; eval'in bir şey ölçmesine fırsat kalmadı. | `results/2026-10-08T1959` |
| 2 | Çıktı sözleşmesi "yalnız Çelişkiler bölümü, en fazla üç madde" diye kısaltıldı | **2/3 PASS, gate KALDI.** 01-net-talep `soru-bolumu` işaretini kaçırdı; baseline farkı gerilemeyi gösterdi. 02 ve 03 geçti, çünkü o fixture'lar soru bölümünü sormuyor. | `results/2026-10-08T2000` |

Ders: eval yalnız fixture'ların sorduğunu ölçer. Bir davranış önemliyse en az bir fixture onu açıkça sormalı.
