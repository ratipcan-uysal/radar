İnceleme kapsamı: İki not dosyasının tamamı ve CSV’nin ilk 30 fiziksel satırı: başlık + **GB-0001–GB-0029 arasındaki 29 kayıt**. CSV’nin tamamı hakkında sonuç çıkarmıyorum. **Güven düzeyi: yüksek**; aşağıdaki belirsizlikler, kaynaklarda yanıtı bulunmayan konulardır.

## 1. Çelişkiler

- **Kanal ağırlığı konusunda doğrudan görüş ayrılığı var.** Selin, mağaza yorumlarının görünürlük ve mağaza puanına etkisi nedeniyle daha ağır sayılmasını istiyor. Ece, tüm kanalların eşit sayılmasını savunuyor. Hangisi geçerli olacak?  
  **Kaynak:** `toplanti-notu.md` — Selin, Ece.

- **Veriden öncelik çıkarma amacı ile önceden belirlenen birincilik beklentisi arasında gerilim var.** Deniz, gelecek çeyreğin ilk üç işini kanıtla seçmek istiyor; Slack’te öncelik hesabı konusunda emin olmadığını söylüyor. Selin ise iptal ücreti en üstte çıkmazsa aracın yanlış çalışacağını söylüyor. Sonucun doğruluğu hangi ölçüte göre değerlendirilecek? Bu, kesin bir mantıksal çelişki değil; başarı beklentilerinin uyuşmadığı bir nokta.  
  **Kaynak:** `toplanti-notu.md` — Deniz; `slack-dokumu.md` — Deniz, Selin.

**Çelişki sayılmayan ayrımlar:** Selin’in destek kayıtlarında iptal ücretini, Mert’in mağaza yorumlarında bildirim gecikmesini daha çok görmesi farklı kaynaklara dayanıyor. Ece’nin haftalık aktarım yapabildiğini ve günlük dosyaların da gelebileceğini söylemesi de birbirini dışlamıyor.  
**Kaynak:** `toplanti-notu.md` — Selin, Mert, Ece.

## 2. Açık noktalar

- **“Öncelik” tanımlanmamış.** Deniz’in “kaç kişi söylüyor × ne kadar mutsuz × ne kadar yeni” ifadesi kesinleşmiş karar değil. Kişi sayısı, mutsuzluk ve yenilik hangi verilerden, hangi hesapla ölçülecek?  
  **Kaynak:** `slack-dokumu.md` — Deniz; `toplanti-notu.md` — açık kalanlar, belirli konuşmacı belirtilmemiş.

- **Çeyrek planlaması için değerlendirme dönemi belirsiz.** Örnek dosyanın son altı haftayı kapsadığı söyleniyor; amaç ise gelecek çeyreğin ilk üç işini seçmek. Hangi tarih aralığı değerlendirilecek ve “yeni” hangi tarihe göre hesaplanacak?  
  **Kaynak:** `toplanti-notu.md` — Deniz; `slack-dokumu.md` — Ece, Deniz.

- **Tema sınırları belirsiz.** Görülen kayıtlarda ücretin kaldırılması, ücretin önceden açıklanması, iptal politikasının bulunamaması ve iade talepleri var. Bunlar aynı tema mı, ayrı sorunlar mı? Bir kayıtta hem asıl sorun hem destek şikâyeti varsa kaç temaya sayılacak?  
  **Kaynak:** `ornek-geri-bildirim.csv` — geri bildirim sahipleri, kimlikleri belirtilmemiş; GB-0003, GB-0004, GB-0005, GB-0024, GB-0025. `toplanti-notu.md` — Deniz.

- **Olumlu geri bildirimlerin rolü belirsiz.** Araç “kullanıcı ne istiyor” sorusuna yanıt verecek; örnekte övgüler de bulunuyor. Bunlar tema ve öncelik hesabına nasıl dahil edilecek?  
  **Kaynak:** `toplanti-notu.md` — Deniz; `ornek-geri-bildirim.csv` — kimliği belirtilmemiş geri bildirim sahipleri, GB-0006, GB-0018, GB-0020.

- **İngilizce yorumlar için beklenti kısmen belirtilmiş.** Selin bunların sayılmasını istiyor. Türkçe ve İngilizce aynı sorunu anlatan yorumlar aynı temada mı değerlendirilecek; raporda alıntılar hangi dilde olacak?  
  **Kaynak:** `slack-dokumu.md` — Selin; `toplanti-notu.md` — Deniz.

- **Tarayıcıda çalışma kararı kişisel veri sorusunu kapatmıyor.** Sunucu olmayacağı kararlaştırılmış; Mert verinin bir yere gitmediğinden emin olunmasını istiyor. İşleme, saklama ve rapora aktarma açısından kabul edilen sınırlar neler?  
  **Kaynak:** `toplanti-notu.md` — Mert, Deniz ve kararlar bölümü; `slack-dokumu.md` — Ece.

- **Tekrarlanan dosya yüklemelerinin anlamı belirsiz.** Günlük veya haftalık dosyalar gelebiliyor. Dosyalar yeni kayıtları mı, önceki kayıtları da mı içeriyor; yeni yükleme önceki verinin yerini mi alacak, ona mı eklenecek?  
  **Kaynak:** `toplanti-notu.md` — Ece.

- **CSV kabul koşulları belirlenmemiş.** Ece beş ortak sütun sayıyor; örnek dosyada ayrıca `id` bulunuyor. Zorunlu sütunlar, geçerli değerler ve eksik/geçersiz kayıtların nasıl ele alınacağı nedir?  
  **Kaynak:** `toplanti-notu.md` — Ece; `ornek-geri-bildirim.csv` — başlık satırı, dosyayı paylaşan Ece.

- **Raporun karar vermek için göstereceği kanıt belirsiz.** Markdown ve tema başına iki–üç gerçek alıntı istenmiş. Öncelik sırasının gerekçesi ve alıntıların seçim ölçütü tanımlanmış mı?  
  **Kaynak:** `toplanti-notu.md` — Deniz.

- **Demo talebi kesinleşmiş kapsam veya tarih değil.** Mert “haftaya cuma” demo soruyor ve yönetim toplantısının pazartesi olduğunu söylüyor; dökümde yanıt yok. Hangi takvim tarihi ve hangi tamamlanmış davranışlar bekleniyor?  
  **Kaynak:** `slack-dokumu.md` — Mert; döküm başlığı 4–6 Ekim, mesajların günleri ayrı belirtilmemiş.

## 3. Veri riskleri

- **Kayıt sayısı, kişi sayısı olarak doğrulanamıyor.** CSV’de `id` var; kullanıcı kimliği yok. Aynı kişinin birden fazla geri bildirimi veya kanalı kullanıp kullanmadığı görülemiyor. Deniz’in “kaç kişi söylüyor” ölçütü bu dosyadan nasıl çıkarılacak?  
  **Kaynak:** `ornek-geri-bildirim.csv` — başlık satırı, dosyayı paylaşan Ece; `slack-dokumu.md` — Deniz.

- **Puanın kanallar arasında aynı şeyi ölçtüğü belirtilmemiş.** Destek, mağaza ve anket kayıtlarında `puan` bulunuyor. NPS anketinden de söz ediliyor; fakat örnekteki anket puanlarının anlamı açıklanmıyor. Bu değerler karşılaştırılabilir mi?  
  **Kaynak:** `toplanti-notu.md` — Deniz, Ece; `ornek-geri-bildirim.csv` — başlık ve GB-0001–GB-0029, kimliği belirtilmemiş geri bildirim sahipleri.

- **Puan ile metindeki olumsuzluk her zaman örtüşmüyor.** GB-0017, restoranın kapalı olduğunu ve desteğin yardımcı olmadığını söylüyor; puanı 4. GB-0027’de “1 yıldızı bile hak etmiyor” yazarken puan 2. Mutsuzluk değerlendirmesinde hangi bilgi esas alınacak?  
  **Kaynak:** `ornek-geri-bildirim.csv` — kimliği belirtilmemiş geri bildirim sahipleri, GB-0017, GB-0027.

- **Benzer metinler var; mükerrer oldukları kanıtlanmıyor.** GB-0009 ile GB-0021 bildirim gecikmesi nedeniyle rezervasyon iptalini; GB-0012 ile GB-0028 yirmi dakika geç gelen bildirimi anlatıyor. Bunlar bağımsız deneyimler mi, tekrar kayıtlar mı?  
  **Kaynak:** `ornek-geri-bildirim.csv` — kimliği belirtilmemiş geri bildirim sahipleri, belirtilen kayıtlar.

- **Kişisel veri riski sütunların silinmesiyle bitmemiş.** Ece, metinlerde telefon bulunan birkaç kayıt kaldığını söylüyor. İncelenen ilk 29 kayıtta açık bir telefon numarası görülmüyor; bu, dosyanın tamamında bulunmadığını göstermiyor. Bu metinler gerçek alıntı olarak rapora girebilir mi?  
  **Kaynak:** `slack-dokumu.md` — Ece; `toplanti-notu.md` — Mert, Deniz; `ornek-geri-bildirim.csv` — incelenen kayıtlar.

- **Platform ve sürüm bilgileri yapılandırılmış değil.** `segment`, yeni/düzenli/kurumsal anlamına geliyor; platform yok. Bazı metinlerde Android veya 5.2 geçiyor, ancak Android 14 bağlantısını doğrulayacak bir alan bulunmuyor. Mert’in teknik açıklaması açıkça kendi tahmini.  
  **Kaynak:** `slack-dokumu.md` — Mert, Ece; `ornek-geri-bildirim.csv` — GB-0011, GB-0016, kimliği belirtilmemiş geri bildirim sahipleri.

- **Mağaza kaynağı ayrıştırılmıyor.** App Store ve Google Play ayrı kaynaklar olarak anılıyor; CSV’de ikisi için ayrı sütun veya değer görünmüyor, yalnız `magaza` var. Bu ayrım değerlendirmede gerekli mi?  
  **Kaynak:** `toplanti-notu.md` — Deniz; `ornek-geri-bildirim.csv` — başlık ve `kanal` değerleri, dosyayı paylaşan Ece.

- **Tarihlerin anlamı ve sırası belirsiz.** İlk kayıtların tarihleri kronolojik sıralı değil. `tarih` olay, yorum veya dışa aktarma tarihi mi? Yenilik hesabında hangisi kullanılacak?  
  **Kaynak:** `ornek-geri-bildirim.csv` — GB-0001–GB-0005, kimliği belirtilmemiş geri bildirim sahipleri; `slack-dokumu.md` — Deniz.

- **Örneğin temsil gücü açıklanmamış.** Ece 150 satır ve son altı hafta bilgisini veriyor; kayıtların nasıl seçildiği ve kanalların kapsama oranı belirtilmiyor. Frekans farkları kullanıcı taleplerini mi, veri toplama farklarını mı yansıtıyor?  
  **Kaynak:** `slack-dokumu.md` — Ece; `toplanti-notu.md` — Selin, Mert, Ece.

## 4. Sorulacak sorular

1. **Deniz, Selin ve Ece’ye:** Öncelik sırasını hangi kesin ölçüt belirleyecek; kanal ağırlıkları ne olacak ve iptal ücretinin birinci çıkması bir kabul koşulu mu?  
   **Kaynak:** `toplanti-notu.md` — Deniz, Selin, Ece; `slack-dokumu.md` — Deniz, Selin.

2. **Deniz, Mert ve Ece’ye:** Kişisel verinin işlenmesi, saklanması, tarayıcı dışına çıkması ve yönetim raporundaki gerçek alıntılarda bulunması için kabul edilen sınırlar neler?  
   **Kaynak:** `toplanti-notu.md` — Deniz, Mert; `slack-dokumu.md` — Ece.

3. **Ece’ye:** Dosya bağımsız kişileri saymaya elverişli mi; tekrar kayıtları nasıl tanıyoruz ve yeni CSV’ler önceki kayıtları da içeriyor mu?  
   **Kaynak:** `ornek-geri-bildirim.csv` — başlık, GB-0009, GB-0012, GB-0021, GB-0028; `toplanti-notu.md` — Ece.

4. **Ece ve Deniz’e:** Her kanaldaki `puan` ve `tarih` tam olarak neyi ifade ediyor; mutsuzluk ve yenilik hangi dönem ve veriler üzerinden ölçülecek?  
   **Kaynak:** `toplanti-notu.md` — Deniz, Ece; `slack-dokumu.md` — Deniz; `ornek-geri-bildirim.csv` — GB-0017, GB-0027.

5. **Deniz ve Selin’e:** Tema sınırları ne olacak; aynı kayıttaki birden fazla sorun, olumlu geri bildirimler ve İngilizce yorumlar sayımda nasıl değerlendirilecek?  
   **Kaynak:** `toplanti-notu.md` — Deniz; `slack-dokumu.md` — Selin; `ornek-geri-bildirim.csv` — GB-0003, GB-0006, GB-0018, GB-0025.

6. **Ece ve Mert’e:** Kabul edilecek CSV alanları ve geçerli değerler neler; eksik/geçersiz kayıtlar için beklenti ne ve platform, sürüm, mağaza ayrımı bu çalışmanın kapsamında mı?  
   **Kaynak:** `toplanti-notu.md` — Ece; `slack-dokumu.md` — Ece, Mert; `ornek-geri-bildirim.csv` — başlık.

7. **Deniz’e:** Markdown raporunda öncelik sırasını destekleyen hangi kanıtlar bekleniyor ve tema başına iki–üç gerçek alıntı hangi ölçüte göre seçilecek?  
   **Kaynak:** `toplanti-notu.md` — Deniz.

8. **Deniz ve Mert’e:** Demo hangi kesin tarihte yapılacak ve o tarihte hangi davranışların tamamlanmış olması gerekiyor?  
   **Kaynak:** `slack-dokumu.md` — Mert.