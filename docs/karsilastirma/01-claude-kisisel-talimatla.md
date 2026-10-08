Notları okudum. CSV'nin ilk 30 satırına baktım; ek olarak bütün dosyada telefon numarası ve İngilizce metin aradım. Bu taramadan gelen maddeleri "30. satır sonrası" diye ayrıca işaretledim.

# Radar: geliştirme öncesi netleşmesi gerekenler

## 1. Çelişkiler

| # | Çelişki | Kaynak |
|---|---|---|
| 1.1 | **Kanal ağırlığı.** Selin mağaza yorumlarının daha ağır sayılmasını istiyor ("herkes görüyor, puanı düşürüyor"). Ece bütün kanalların eşit sayılmasını istiyor ("yoksa sonucu biz yönlendirmiş oluruz"). Toplantıda karara bağlanmadı. | toplanti-notu.md, Selin / Ece |
| 1.2 | **En büyük şikâyet hangisi?** Selin'e göre iptal ücreti, Mert'e göre bildirim gecikmesi. İkisi farklı kanallara bakıyor: Selin destek kayıtlarına, Mert mağaza yorumlarına. İlk 30 satırı elle saydığımda (*varsayım: benim sınıflandırmam*) iptal ücretiyle ilgili 5 kayıt var (GB-0005, 0007, 0013, 0021, 0030). Bunların 3'ü destekten, 2'si mağazadan geliyor. Bildirim gecikmesiyle ilgili de 5 kayıt var (GB-0003, 0006, 0009, 0020, 0024). Bunların 3'ü mağazadan, 2'si anketten geliyor. Hangisinin üstte çıkacağını 1.1'deki ağırlık kararı belirliyor. | toplanti-notu.md, Selin / Mert; CSV ilk 30 satır |
| 1.3 | **Beklenen sonuç önceden konmuş.** Selin "iptal ücreti en üstte çıkmazsa araç yanlış çalışıyor" diyor. Ece ise sonucun yönlendirilmemesini istiyor. Aracın doğru çalıştığına neye bakılarak karar verileceği iki kişide farklı. | slack-dokumu.md, Selin; toplanti-notu.md, Ece |
| 1.4 | **Puan ölçeği.** Deniz kaynağı "NPS anketi" olarak anıyor. NPS normalde 0-10 ölçeğinde. CSV'de `anket` kanalının puanları ilk 30 satırda yalnız 1-5 arası. Dönüştürme yapılıp yapılmadığı yazmıyor. *Varsayım: ölçek dönüştürülmüş olabilir.* | toplanti-notu.md, Deniz; CSV |
| 1.5 | **Mağaza ayrımı kayboluyor.** Deniz "App Store ve Google Play" diye iki ayrı kaynak sayıyor. CSV'de ise tek bir `magaza` değeri var. Mert gecikmenin Android 14 ve 5.2 sürümünde başladığını düşünüyor ve platform sütunu soruyor. Ece platform sütunu olmadığını söylüyor. | toplanti-notu.md, Deniz; slack-dokumu.md, Mert / Ece |
| 1.6 | **Veri sıklığı ve dönem.** Ece önce "her hafta pazartesi" diyor, aynı toplantıda "günlük de gelebilir" diyor. Deniz aracı "her çeyrek başında" kullanmayı düşünüyor. Örnek dosya ise "son 6 hafta" kapsıyor. | toplanti-notu.md, Ece / Deniz; slack-dokumu.md, Ece |
| 1.7 | **Hacim tutmuyor.** Selin bir günde 14 iptal ücreti şikâyeti geldiğini söylüyor. Örnek dosyada 6 haftaya ait toplam 150 satır var. Dosya tüm kayıtları mı içeriyor, örneklem mi, belli değil. *Varsayım: örneklem.* | slack-dokumu.md, Selin / Ece |
| 1.8 | **Kişisel veri silinmiş görünüyor ama silinmemiş.** Mert'e göre destek sisteminden gelen CSV'de ad ve telefon var. Ece ad ve telefon sütunlarını sildiğini ama metin içinde telefon geçen kayıtlar kaldığını söylüyor. Bunu doğruladım: GB-0084 ve GB-0120'de telefon numarası var (30. satır sonrası). Deniz ise rapora "gerçek alıntı" istiyor. | toplanti-notu.md, Mert / Deniz; slack-dokumu.md, Ece; CSV |

## 2. Açık noktalar

- **"Öncelik" neye göre?** Toplantıda açık kaldı. Deniz'in aklındaki formül "kaç kişi × ne kadar mutsuz × ne kadar yeni", ama kendisi de emin değil. Belirsiz olanlar:
  - "Ne kadar yeni": kaydın tarihi mi, yoksa CSV'deki `segment = yeni` mi?
  - "Ne kadar mutsuz": puan mı, metnin tonu mu?
  - "Kaç kişi": kayıt sayısı mı, tekil kullanıcı mı? (Kaynak: toplanti-notu.md, açık kalanlar; slack-dokumu.md, Deniz)
- **Kanal ağırlığı:** kararı kim verecek ve ne zaman? (toplanti-notu.md, açık kalanlar)
- **Kişisel veri:** Mert verinin "bir yere gitmediğinden emin olalım" diyor. Aracın veriyi tarayıcı dışına hiç çıkarmaması mı kastediliyor, belli değil. Metin içindeki telefonların raporda görünüp görünmeyeceği de konuşulmamış. (toplanti-notu.md, Mert ve açık kalanlar; slack-dokumu.md, Ece)
- **Temalar nereden gelecek?** Deniz "temaları göreyim" diyor. Tema listesinin önceden tanımlanması mı, aracın bulması mı beklendiği konuşulmamış. Bir kaydın birden çok temaya girip giremeyeceği de konuşulmamış. Örnek: GB-0020 hem bildirim gecikmesi hem iptal. GB-0021 hem iptal hem ödeme. (toplanti-notu.md, Deniz; CSV)
- **İngilizce yorumlar:** Selin bunların "sayılsın" diyor. Türkçe yorumlarla aynı temalara mı sayılacakları, ayrı mı raporlanacakları belli değil. Ece'nin saydığı sütunlarda dil sütunu yok. (slack-dokumu.md, Selin; toplanti-notu.md, Ece)
- **Platform/sürüm analizi:** Mert'in Android 14 / 5.2 hipotezi Radar'ın kapsamında mı, belli değil. Mevcut veriyle sınanamıyor. (slack-dokumu.md, Mert / Ece)
- **Birden çok dosya:** Günlük ya da haftalık gelen dosyalar birleştirilecek mi? Aynı kayıt iki dosyada gelirse ne olacak? Rapor hangi dönemi kapsayacak (çeyrek mi, son 6 hafta mı)? (toplanti-notu.md, Ece / Deniz)
- **Raporun içeriği:** Deniz'in istediği markdown ve her temaya 2-3 alıntı. Raporda kaç tema yer alacağı ve "ilk üç iş" önerisinin raporda olup olmayacağı yazmıyor. (toplanti-notu.md, Deniz)
- **Demo tarihi ve kapsamı:** Mert "haftaya cuma" diye sordu, cevap yok. Hangi cuma olduğu, demoda neyin gösterileceği ve demonun pazartesi yönetim toplantısına girdi olup olmayacağı belli değil. (slack-dokumu.md, Mert)
- **Kullanıcılar:** Aracı yalnız Deniz mi kullanacak, Selin ve Ece de mi? Notlarda yazmıyor. (*varsayım: yalnız Deniz*)

## 3. Veri riskleri (CSV)

- **Metin içinde kişisel veri:** GB-0084'te "0532 555 12 34", GB-0120'de "+90 555 987 65 43" geçiyor (30. satır sonrası, tarama ile bulundu). Ece "birkaç kayıt" dediği için başka biçimlerde yazılmış numaralar da olabilir.
- **Türkçe karakter tutarsızlığı:** Bazı metinlerde Türkçe karakter yok: "kartim reddedildi… Cok can sikici" (GB-0008), "Vejetaryen secenek" (GB-0012), "Bildirim izni acik" (GB-0009). Segment değeri de dosyada `duzenli` olarak geçiyor, Ece "düzenli" yazmış. Aynı kelime iki farklı yazımla geçiyor.
- **Puan ile metin uyuşmuyor:** GB-0012 bir şikâyet ama puanı 4. GB-0022'de "1 yıldızı bile hak etmiyor" yazıyor ama puanı 2. GB-0017 şikâyet, puanı 3. Mutsuzluk puandan ölçülürse bu kayıtlar yanlış sınıflanabilir.
- **Kalıp ifadeler ve tekrarlar:** "Çok can sıkıcı", "Merhaba, … Böyle olmamalı.", "Teşekkürler, … 👏" gibi ifadeler sık geçiyor. GB-0026 ve GB-0028 neredeyse aynı metin ("Taksit seçeneği görünmüyor"). Bunlar aynı kullanıcı mı, tekrarlanan kayıt mı, ayrı kişiler mi, bilinmiyor. *Varsayım: örnek veri kısmen üretilmiş olabilir.* Öyleyse gerçek veride tema dağılımı farklı çıkabilir.
- **Yanıltıcı anahtar kelimeler:** GB-0020'de "rezervasyonum iptal oldu" geçiyor ama asıl konu bildirim gecikmesi. "İptal" kelimesi geçen her kaydı iptal ücreti saymak Selin'in beklediği sonucu yapay olarak şişirebilir.
- **Olumlu kayıtlar:** GB-0002, 0014, 0016, 0019, 0025 gibi 5 puanlı övgüler de dosyada. Bunların önceliklendirmeye nasıl gireceği tanımlı değil.
- **Biçim:** Bazı metinler tırnak içinde (virgül içerenler), bazıları tırnaksız. Emoji var (👏). Satırlar tarihe göre sıralı değil. İlk 30 satırdaki tarih aralığı 2026-08-24 ile 2026-10-03 arası. GB-0116 ise 2026-10-05 tarihli, yani toplantıdan sonra.
- **Dil:** İlk 30 satırın hepsi Türkçe. GB-0116 İngilizce ("Great app for tourists…", 30. satır sonrası).
- **Eksik boyutlar:** Platform, uygulama sürümü, dil ve mağaza ayrımı (App Store / Google Play) sütunları yok. Kayıtları kullanıcıya bağlayan bir alan da yok.

## 4. Sorulacak sorular (önem sırasıyla)

1. **Deniz:** Öncelik formülündeki "ne kadar yeni" kaydın tarihi mi, `segment = yeni` mi? "Ne kadar mutsuz" puandan mı ölçülecek? Puan ile metin çeliştiğinde (GB-0012, GB-0022) hangisi geçerli?
2. **Deniz:** Kanal ağırlığında Selin'le Ece farklı düşünüyor. Kararı kim verecek ve demodan önce verilecek mi?
3. **Mert + Deniz:** "Bir yere gitmesin" ne demek? Veri tarayıcıdan hiç çıkmamalı mı? Yönetime giden alıntılarda metin içindeki telefon numaraları görünebilir mi?
4. **Ece:** 150 satır bütün kayıtlar mı, örneklem mi? Selin'in "günde 14 iptal şikâyeti" sayısıyla nasıl bağdaşıyor? Örnek metinler gerçek kayıt mı?
5. **Ece:** Anket puanı NPS'ten (0-10) 1-5'e çevrildi mi? Destek kayıtlarındaki puan nereden geliyor? Üç kanalın puanı aynı anlama mı geliyor?
6. **Deniz:** Temalar sabit bir listeden mi gelecek, araç mı bulacak? Bir kayıt birden çok temaya sayılabilir mi?
7. **Selin + Ece:** İngilizce yorumlar Türkçe temalarla birlikte mi sayılacak? Mert'in sorduğu platform ve sürüm bilgisi ya da bir dil sütunu dışa aktarıma eklenebilir mi?
8. **Mert + Deniz:** Demo hangi cuma? Demoda gerçek veri mi kullanılacak, örnek veri mi? Demo pazartesi yönetim toplantısına girdi olacak mı?

---

- **Neyi kaçırmış olabilirim:** CSV'nin 31-150. satırlarını okumadım, yalnız telefon ve İngilizce kelime aradım. Telefon taramasındaki desen yalnız 05xx ve +90 biçimini yakalıyor, başka biçimde yazılmış numaralar gözden kaçmış olabilir.
- **En zayıf iddiam:** 1.2'deki 5'e 5 sayım. Kayıtları temalara ben elle ayırdım; örneğin GB-0021'i iptal ücretine saymak tartışılabilir.
- **Gerekçesiz kararım:** Sorulardaki önem sıralaması bana ait. Öncelik tanımını en üste koydum çünkü toplantı notunda "açık kalanlar" arasında geçiyor ve çıkan sıralamanın tamamı ona bağlı. Ama bu sıralamaya ekip birlikte karar vermedi. Bu metin için slop-check'i çalıştırmadım.
