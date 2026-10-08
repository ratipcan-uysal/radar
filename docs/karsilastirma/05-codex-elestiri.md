1. **PRD’nin “bitti” şartı mevcut haliyle sağlanamaz: doğru uygulama kabul testlerinden kalacak.**

   **Yanlış/eksik:** PRD bütün KK-01…KK-40’ın geçmesini istiyor, fakat uygulamaya bunlarla çelişen kararları da şart koşuyor. K20 iptal temasını parasal şikâyetlerle sınırlarken K21 politika sorularını ekliyor. KK-39 bunları dışlıyor. CSV’den yeniden hesaplandığında K21’in eklediği dört kayıtla iptal teması **31 kayıt / 161,4 puandan 35 kayıt / 192,0 puana** çıkıyor; KK-40 eski sonucu bekliyor. Bu çelişkiyi risk listesine yazmak kabul şartını düzeltmiyor.

   **Kanıt:** [docs/prd.md:20](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/prd.md:20), [docs/prd.md:35](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/prd.md:35), [docs/kararlar.md:35](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kararlar.md:35), [docs/kararlar.md:43](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kararlar.md:43), [docs/kabul-kriterleri.md:418](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kabul-kriterleri.md:418); GB-0075, GB-0123, GB-0131, GB-0149.

   **Etki:** Demo kabulünde aynı sonuç bir belgeye göre doğru, diğerine göre yanlış olacak.

   **Gereken karar:** Deniz, K20’nin hangi kısmının K21 ile değiştiğini ve demoda bağlayıcı olacak güncel kabul beklentilerini açıkça onaylamalı.

2. **“İlk üç sıra sağlam” iddiası yanlış: sözlüğün ayrıntısı yönetimin üçüncü işini değiştirebilir.**

   **Yanlış/eksik:** Formül kayıt sayısıyla büyüdüğü için geniş tema avantajlıdır. Ödeme tek tema olduğunda 97,4 puanla üçüncü. Aynı 17 kaydı kart reddi, çift çekim, 3D Secure, taksit gibi alt temalara ayıran bir karşı örnekte alt tema puanlarının en yükseği **16,0** oluyor. Diğer kümeler korunursa **45,6 puanlı giriş teması üçüncülüğe yükseliyor**. Dolayısıyla sıralama sadece veriden çıkmıyor; sözlüğü hazırlayanın birleştirme kararından da çıkıyor.

   **Kanıt:** [docs/kararlar.md:12](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kararlar.md:12), [docs/kabul-kriterleri.md:432](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kabul-kriterleri.md:432), [docs/kabul-kriterleri.md:461](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kabul-kriterleri.md:461), [docs/prd.md:87](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/prd.md:87). Onaylı sözlük repoda yok.

   **Etki:** Yönetim, tema genişliğinin ürettiği sıralamayı kullanıcı önceliği sanabilir.

   **Gereken karar:** Deniz, karşılaştırılacak tema ayrıntısını sonuçları görerek onaylamalı; “ilk üç sözlükten bağımsızdır” iddiasının geçerliliği yeniden karara bağlanmalı.

3. **Gizlilik sınırı birbiriyle çelişiyor; çevrimdışı çalışma yönetim raporunu güvenli yapmıyor.**

   **Yanlış/eksik:** K3 telefonların maskelenmesini genel bir şart olarak koyuyor; K27 yabancı numaraları erteliyor. PRD aynı istisnayı alıyor ve isimlerin yönetime giden alıntılarda açık kalabileceğini kabul ediyor. Böyle bir metin en yeni üç kayda girerse Confluence’a taşınacak. Tarayıcının ağ isteği yapmaması bu aktarımı engellemiyor.

   **Kanıt:** [docs/kararlar.md:9](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kararlar.md:9), [docs/kararlar.md:49](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kararlar.md:49), [docs/prd.md:54](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/prd.md:54), [docs/prd.md:68](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/prd.md:68), [docs/notlar/toplanti-notu.md:23](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/notlar/toplanti-notu.md:23). KK-34’teki sentetik GB-0904, “Ayşe Yılmaz”ın açık bırakılmasını özellikle bekliyor. Örnek CSV’de yabancı numara bulunduğu iddiası **zayıf**; mevcut dosya bunu göstermiyor.

   **Etki:** Gizlilik; kabul testlerini geçen bir rapor yine de kişisel veri taşıyabilir.

   **Gereken karar:** Mert ve Deniz, K3’ün istisnalarını ve bu içeriklerin yönetim raporuna çıkış koşulunu açıkça kararlaştırmalı.

4. **İlgisiz tek bir tarih hatası, şikâyetler değişmeden birinci temayı değiştirebilir.**

   **Yanlış/eksik:** Yenilik penceresi bütün dosyanın en yeni tarihine bağlı. Geçerli alanları olan, metni `qwerty`, tarihi yanlışlıkla `2026-11-01` yazılmış bir satır eklenirse bütün mevcut kayıtlar pencere dışında kalır. K21 kümelemesiyle bildirim **229,5 → 128,0**, iptal **192,0 → 140,0** olur: ilk iki yer değiştirir. Eklenen kayıt bu temaların hiçbirine ait değildir. Tarih biçimini kontrol etmek bu hatayı yakalamaz.

   **Kanıt:** [docs/prd.md:28](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/prd.md:28), [docs/prd.md:36](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/prd.md:36), [docs/kararlar.md:46](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kararlar.md:46), [docs/kabul-kriterleri.md:446](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kabul-kriterleri.md:446).

   **Etki:** Demo ve yönetim kararı; sessiz bir veri hatası önceliği tersine çevirebilir.

   **Gereken karar:** Ece ve Deniz, gelecekteki tarihlerin kabulünü ve analiz dönemini hangi kayıtların belirleyebileceğini kararlaştırmalı.

5. **“Kaç kişi söylüyor” ölçülmüyor; kayıt sayısı kişi sayısı gibi yorumlanabilir.**

   **Yanlış/eksik:** CSV’de kullanıcı veya olay kimliği yok. Aynı kişinin farklı tarihteki başvuruları ayrı sayılabilir; farklı kişilerin bütün alanları aynı kayıtları ise birleştirilebilir. Ayrıca aynı `id` farklı içerikle geldiğinde ilk satırın kazanması, dosya sırasını sonucun belirleyicisi yapıyor. KK-29 bunu açıkça gösteriyor: satır sırası değişince iptal puanı 8,0’dan 3,0’a düşüyor ve bildirim öne geçiyor.

   **Kanıt:** [docs/notlar/slack-dokumu.md:16](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/notlar/slack-dokumu.md:16), [docs/kararlar.md:25](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kararlar.md:25), [docs/kabul-kriterleri.md:305](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kabul-kriterleri.md:305); GB-0011, GB-0150 ve benzer metinli GB-0139.

   **Etki:** Yönetim kararı; başvuru sıklığı kullanıcı yaygınlığına dönüşür, çelişkili kayıt sessizce kaybolur.

   **Gereken karar:** Deniz ve Ece, ölçüm biriminin kayıt mı, kişi mi, olay mı olduğunu ve çelişkili `id` durumunun nasıl ele alınacağını belirlemeli.

6. **Eşit kanal ağırlığı, seçilmiş örnekten tarafsız çeyrek önceliği üretmez.**

   **Yanlış/eksik:** K5 dosyanın bir kesit olduğunu söylüyor; hangi kayıtların seçildiğini açıklamıyor. Bildirim kümesinin 29 kaydından **20’si mağaza, 5’i destek, 4’ü anket**. Bu dağılım gerçek sorun yaygınlığından veya örnek seçme biçiminden kaynaklanabilir; dosya bunları ayırt ettirmiyor. Kanal ağırlığını eşitlemek, dışarıda bırakılan destek kayıtlarını geri getirmiyor.

   **Kanıt:** [docs/kararlar.md:8](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kararlar.md:8), [docs/kararlar.md:11](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kararlar.md:11), [docs/kabul-kriterleri.md:431](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kabul-kriterleri.md:431), [docs/notlar/toplanti-notu.md:7](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/notlar/toplanti-notu.md:7).

   **Etki:** Yönetim kararı; örnek dosyanın sıralaması tüm kullanıcıların önceliği olarak sunulabilir. Örneğin gerçekten yanlı seçildiği iddiası **zayıf**; temsil gücünün gösterilmediği kesin.

   **Gereken karar:** Ece seçim yöntemini açıklamalı; Deniz bu veriyle hangi yönetim kararlarının alınabileceğini sınırlandırmalı.

7. **Formülün “mutsuzluk” girdisi, metindeki şiddeti güvenilir biçimde temsil etmiyor.**

   **Yanlış/eksik:** GB-0133 “1 yıldızı bile hak etmiyor” diyor ama puanı 3; GB-0078 kapalı restorana gitmiş ve destekten yardım alamamış ama puanı 4. Formül bunları sırasıyla 3 ve 2 mutsuzlukla değerlendiriyor. K4’ün bütün kanalları 1–5’e getirmesi, puanların aynı şeyi ölçtüğünü kanıtlamıyor; anket dönüşümü ve destek puanının anlamı tanımlı değil.

   **Kanıt:** [docs/kararlar.md:7](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kararlar.md:7), [docs/kararlar.md:10](/Users/ratipcanuysal/claude_lecture/masterclass/radar/docs/kararlar.md:10); CSV GB-0012, GB-0078, GB-0109, GB-0133.

   **Etki:** Yönetim kararı; sayısal kesinlik görüntüsü altında ciddi sorunlar düşük şiddetli sayılabilir.

   **Gereken karar:** Ece ve Deniz, kanalların puan anlamlarını ve dönüşümünü doğrulamalı; metin–puan uyuşmazlıklarının sıralamada nasıl değerlendirileceğini kararlaştırmalı.