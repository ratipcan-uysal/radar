İnceleme kapsamı: iki not dosyası ve CSV’nin başlık dâhil ilk 30 satırı, yani 29 kayıt. CSV alıntılarının yazarları anonim; dosyayı paylaşan kişi Ece.

## 1. Çelişkiler

- **Kanal ağırlığı:** Selin mağaza yorumlarının daha ağır sayılmasını, Ece bütün kanalların eşit sayılmasını istiyor. İki yaklaşım farklı sıralamalar üretebilir; tercih açık kalmış. **Kaynak:** `toplanti-notu.md` — Selin, Ece.
- **Sonucun önceden belirlenmesi ile ölçüte göre hesaplanması arasında gerilim:** Selin, iptal ücreti en üstte çıkmazsa aracın yanlış çalışacağını söylüyor. Deniz ise henüz kesinleşmemiş bir sıklık × mutsuzluk × yenilik hesabı düşünüyor. Hesabın iptal ücretini mutlaka birinci çıkaracağına dair kanıt yok. **Kaynak:** `slack-dokumu.md` — Selin, Deniz.

Selin’in destek kayıtlarında iptal ücretini, Mert’in mağaza yorumlarında bildirim gecikmesini daha çok görmesi doğrudan çelişki değil; farklı kaynaklardan söz ediyorlar. **Kaynak:** `toplanti-notu.md` — Selin, Mert.

## 2. Açık noktalar

- **Önceliğin anlamı:** Deniz’in formülü öneri aşamasında. “Kaç kişi”, “ne kadar mutsuz” ve “ne kadar yeni” ifadelerinin ölçümü, birbirine etkisi ve eşit sonuçların sırası tanımlanmamış. **Kaynak:** `slack-dokumu.md` — Deniz.
- **Temaların sınırları:** Temaların nasıl belirleneceği, bir kaydın birden fazla temaya girip giremeyeceği ve olumlu geri bildirimlerin önceliklendirmedeki yeri belirtilmemiş. Örneğin iptal ücretinin kendisi ile ücretin önceden açıklanmaması aynı tema mı? **Kaynak:** `toplanti-notu.md` — Deniz; `ornek-geri-bildirim.csv` — anonim kullanıcılar, GB-0001, GB-0003, GB-0006.
- **Kişisel veri ve alıntılar:** Tarayıcıda çalışma kararı var; Mert verinin bir yere gitmediğinden emin olmak istiyor. Bu beklentinin kapsamı ve yönetime giden gerçek alıntılarda kişisel verinin nasıl ele alınacağı kararlaştırılmamış. **Kaynak:** `toplanti-notu.md` — Mert, Deniz; `slack-dokumu.md` — Ece.
- **Dosyaların birlikte işlenmesi:** Kaynaklar ayrı geliyor; günlük veya haftalık dosya mümkün. Yeni yüklemenin önceki veriyi tamamlayacağı mı, değiştireceği mi; örtüşen dönemlerin nasıl sayılacağı belirtilmemiş. **Kaynak:** `toplanti-notu.md` — Ece, Deniz.
- **Zaman kapsamı:** Çeyrek için karar alınacak, örnek dosya son altı haftayı kapsıyor. Analizin hangi döneme dayanacağı ve “yenilik” hesabının hangi tarihe göre yapılacağı açık değil. **Kaynak:** `toplanti-notu.md` — Deniz; `slack-dokumu.md` — Ece, Deniz.
- **Platform ve sürüm ayrımı:** Mert Android 14 ve 5.2 bağlantısından şüpheleniyor; Ece platform alanının bulunmadığını söylüyor. Bu ayrımın Radar’ın kapsamına girip girmediği belirlenmemiş. Android 14 bağlantısı doğrulanmış olgu değil, Mert’in varsayımı. **Kaynak:** `slack-dokumu.md` — Mert, Ece.
- **Dil kapsamı:** Selin İngilizce yorumların da sayılmasını istiyor. Farklı dillerdeki aynı sorunun tek temada değerlendirilip değerlendirilmeyeceği belirtilmemiş. **Kaynak:** `slack-dokumu.md` — Selin.
- **Raporun kanıt içeriği:** Markdown ve tema başına iki üç gerçek alıntı kararlaştırılmış; alıntı seçimi, az kayıtlı temalar ve ilk üç işi destekleyecek diğer bilgilerin kapsamı açık değil. **Kaynak:** `toplanti-notu.md` — Deniz.
- **Demo beklentisi:** Mert gelecek cuma demo istiyor; kabul edilmiş tarih, demo kapsamı ve başarı ölçütü kayıtlarda yok. **Kaynak:** `slack-dokumu.md` — Mert.

## 3. Veri riskleri

- **Metin içinde kişisel veri:** Ece bazı metinlerde telefon bulunduğunu söylüyor. İncelenen 29 kayıtta telefon görülmedi; bu örnek, dosyanın tamamının kişisel veriden arındırıldığını göstermiyor. **Kaynak:** `slack-dokumu.md` — Ece; `ornek-geri-bildirim.csv` — incelenen anonim kayıtlar.
- **Kayıt sayısı, kişi sayısı olmayabilir:** CSV’de `id` var, ancak bunun kayıt mı kişi mi kimliği olduğu açıklanmamış. “İkinci kez” ifadeleri de farklı kişileri ayırt etmiyor. Deniz’in “kaç kişi” ölçütü mevcut alanlarla doğrulanamıyor. **Kaynak:** `slack-dokumu.md` — Deniz; `ornek-geri-bildirim.csv` — anonim kullanıcılar, GB-0013, GB-0014.
- **Puanın anlamı belirsiz:** İncelenen puanlar 1–5 aralığında; kanalların aynı ölçeği kullanıp kullanmadığı bilinmiyor. Olumsuz metinli GB-0017’nin puanı 4; GB-0027’de “1 yıldızı bile hak etmiyor” denirken puan 2. Puanın mutsuzluğu doğrudan temsil ettiği kabul edilemez. **Kaynak:** `ornek-geri-bildirim.csv` — anonim kullanıcılar, GB-0017, GB-0027; `slack-dokumu.md` — Deniz.
- **Benzer metinler:** GB-0009 ile GB-0021 aynı şikâyeti benzer ifadelerle anlatıyor; GB-0012 ile GB-0028 de benzer. Bunların bağımsız bildirim mi, tekrar mı olduğu bilinmiyor; mükerrer oldukları söylenemez. **Kaynak:** `ornek-geri-bildirim.csv` — anonim kullanıcılar, belirtilen kayıtlar.
- **Kanal ve segment ayrıntısı sınırlı:** `magaza`, App Store ile Google Play’i ayırmıyor; segmentler `yeni`, `duzenli`, `kurumsal`. Platform/sürüm alanı yok; metindeki Android veya 5.2 ifadeleri bütün kayıtlar için bilgi sağlamıyor. **Kaynak:** `toplanti-notu.md` — Deniz; `slack-dokumu.md` — Ece, Mert; `ornek-geri-bildirim.csv` — GB-0011, GB-0016.
- **Tarihlerin anlamı ve sırası:** İlk kayıtlar kronolojik sıralı değil. `tarih` alanının olay, yorum veya dışa aktarma tarihi olduğu belirtilmemiş; bu ayrım yenilik hesabını etkiler. **Kaynak:** `ornek-geri-bildirim.csv` — Ece’nin paylaştığı dosya; `slack-dokumu.md` — Deniz.
- **CSV biçimi:** Metinlerde virgül ve tırnaklı alanlar var; bunların yanlış okunması sütunları kaydırabilir. Beklenen dosya biçimi ve geçersiz kayıtların ele alınması tanımlanmamış. **Kaynak:** `ornek-geri-bildirim.csv` — anonim kullanıcılar, GB-0001, GB-0005.
- **Örneğin temsil sınırı:** İlk 29 kayıtta İngilizce metin görülmedi. Bu kesit, Ece’nin belirttiği 150 kaydın dil dağılımını veya Selin’in aktardığı günlük 14 şikâyeti doğrulamaya yetmiyor. **Kaynak:** `slack-dokumu.md` — Ece, Selin; `ornek-geri-bildirim.csv` — incelenen kayıtlar.

## 4. Sorulacak sorular

1. **Mert, Ece ve Deniz’e:** Verinin “bir yere gitmemesi” hangi işlemleri kapsıyor; metindeki kişisel veriler ve rapordaki gerçek alıntılar için hangi sınırlar geçerli? **Kaynak:** `toplanti-notu.md` — Mert, Deniz; `slack-dokumu.md` — Ece.
2. **Deniz, Selin ve Ece’ye:** Öncelik sırasını hangi ölçüt belirleyecek, kanal ağırlığı ne olacak ve iptal ücretinin birinci çıkması zorunlu bir beklenti mi? Nihai kararı kim verecek? **Kaynak:** `toplanti-notu.md` — Selin, Ece; `slack-dokumu.md` — Deniz, Selin.
3. **Ece ve Deniz’e:** “Kaç kişi” hangi veriden hesaplanacak; `id` neyi tanımlıyor ve tekrar bildirimler nasıl sayılacak? **Kaynak:** `slack-dokumu.md` — Deniz; `ornek-geri-bildirim.csv` — Ece’nin paylaştığı dosya.
4. **Ece ve Deniz’e:** Her kanalda puan ve tarih ne anlama geliyor; mutsuzluk ve yenilik hangi dönem ve referans tarih üzerinden ölçülecek? **Kaynak:** `toplanti-notu.md` — Ece; `slack-dokumu.md` — Deniz.
5. **Deniz ve Selin’e:** Tema sınırları, çok konulu kayıtlar, olumlu yorumlar, İngilizce yorumlar ve alıntı seçimi için beklenen davranış nedir? **Kaynak:** `toplanti-notu.md` — Deniz; `slack-dokumu.md` — Selin; `ornek-geri-bildirim.csv` — GB-0003, GB-0006.
6. **Ece’ye:** Günlük/haftalık ve farklı kaynaklardan gelen dosyalar birbirini tamamlıyor mu, örtüşüyor mu; yeni yükleme önceki veriyi nasıl etkileyacak ve geçersiz kayıtların durumu ne olacak? **Kaynak:** `toplanti-notu.md` — Ece, Deniz.
7. **Mert ve Deniz’e:** Platform ve sürüm bazında inceleme geliştirme kapsamına dâhil mi; mevcut veride bu bilgilerin bulunmaması beklenen çıktıyı nasıl etkiliyor? **Kaynak:** `slack-dokumu.md` — Mert, Ece.
8. **Deniz ve Mert’e:** Demo tarihi kesin mi; demoda hangi akış ve rapor içeriği tamamlanmış sayılacak, başarıyı kim değerlendirecek? **Kaynak:** `slack-dokumu.md` — Mert; `toplanti-notu.md` — Deniz.