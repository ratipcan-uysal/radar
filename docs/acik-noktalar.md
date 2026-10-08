# Radar: geliştirmeden önce netleşmesi gerekenler

**Okuduğum kaynaklar:** `docs/notlar/toplanti-notu.md` (3 Ekim), `docs/notlar/slack-dokumu.md` (4-6 Ekim) ve `data/ornek-geri-bildirim.csv` dosyasının ilk 30 satırı (GB-0001…GB-0030). CSV ile ilgili gözlemler yalnızca bu 30 satıra dayanıyor, dosyanın geri kalanını incelemedim.

---

## 1. Çelişkiler

| # | Çelişki | Kaynak |
|---|---|---|
| 1.1 | **En büyük sorun hangisi?** Selin'e göre en çok gelen şikâyet iptal ücreti. Mert'e göre mağaza yorumlarında daha çok bildirim gecikmesi görülüyor. İki kişi farklı kanallara bakıyor. | `toplanti-notu.md`: Selin, Mert |
| 1.2 | **Kanal ağırlığı.** Selin mağaza yorumlarının daha ağır sayılmasını istiyor. Ece tüm kanalların eşit sayılmasını istiyor, yoksa sonucu ekibin yönlendirmiş olacağını söylüyor. Notlarda "Açık kalanlar" altında duruyor. | `toplanti-notu.md`: Selin, Ece |
| 1.3 | **Sonuç baştan belirlenmiş mi?** Selin "iptal ücreti en üstte çıkmazsa araç yanlış çalışıyor demektir" diyor. Bu, Deniz'in "kanıtla seçmek" hedefiyle ve Ece'nin "sonucu yönlendirmeyelim" kaygısıyla çelişiyor. | `slack-dokumu.md`: Selin; `toplanti-notu.md`: Deniz, Ece |
| 1.4 | **Veri hacmi.** Selin "dün de 14 iptal ücreti şikâyeti geldi" diyor. Ece'nin gönderdiği örnek dosya ise tüm kanallarda 6 haftada toplam 150 satır, yani günde ortalama 3-4 kayıt. Örnek dosya destek hacminin tamamını içermiyor gibi görünüyor (varsayım). | `slack-dokumu.md`: Selin, Ece |
| 1.5 | **CSV ne sıklıkla gelecek?** Ece önce "her hafta pazartesi CSV olarak çekebiliyorum" diyor, aynı toplantıda sonra "günlük de gelebilir, haftalık zorunlu değil" diyor. | `toplanti-notu.md`: Ece |
| 1.6 | **Alıntılar ve kişisel veri.** Deniz her temanın yanında "iki üç gerçek alıntı" istiyor. Mert kişisel verinin bir yere gitmemesini istiyor. Ece ise metinlerin içinde telefon numarası geçen kayıtlar olduğunu söylüyor. Gerçek alıntı yönetime giden rapora girerse bu veri de taşınmış olur. | `toplanti-notu.md`: Deniz, Mert; `slack-dokumu.md`: Ece |
| 1.7 | **Kişisel veri sütunları.** Mert "CSV'de müşteri adı ve telefon da var" diyor. Ece örnek dosyada ad ve telefon sütunlarını sildiğini söylüyor. Gerçek kullanımda gelecek CSV'nin bu sütunları içerip içermeyeceği belli değil. | `toplanti-notu.md`: Mert; `slack-dokumu.md`: Ece |
| 1.8 | **Mağaza yorumları.** Deniz App Store ve Google Play yorumlarını kaynak olarak sayıyor. CSV'de ikisi de tek değerle, `magaza` olarak geçiyor. Selin'in "mağaza daha ağır" önerisi ile Mert'in platform sorusu bu ayrımı gerektirebilir (varsayım). | `toplanti-notu.md`: Deniz; CSV `kanal` sütunu |

## 2. Açık noktalar

| # | Konu | Kaynak |
|---|---|---|
| 2.1 | **"Öncelik" neye göre hesaplanacak?** Deniz'in aklındaki formül "kaç kişi söylüyor × ne kadar mutsuz × ne kadar yeni", ama Deniz emin olmadığını yazıyor. Notlarda karar yok. | `toplanti-notu.md` (Açık kalanlar); `slack-dokumu.md`: Deniz |
| 2.2 | **"Ne kadar yeni" ne demek?** Geri bildirimin tarihinin yakınlığı mı, yoksa `segment = yeni` olan kullanıcılar mı? İkisi de veride var. | `slack-dokumu.md`: Deniz, Ece |
| 2.3 | **"Ne kadar mutsuz" nasıl ölçülecek?** `puan` sütunu mu, metnin tonu mu? Ayrıca destek kayıtlarındaki puanın neyi ölçtüğü belli değil. | `slack-dokumu.md`: Deniz; CSV |
| 2.4 | **Kanal ağırlığı.** Karar verilmemiş. | `toplanti-notu.md` (Açık kalanlar): Selin, Ece |
| 2.5 | **Kişisel veri.** "Bir yere gitmediğinden emin olalım" sözünün kapsamı belirsiz: ağ isteği hiç olmayacak mı, rapordaki alıntılar maskelenecek mi, ikisi birden mi? Notlarda yalnızca "Kişisel veri" diye açık madde olarak duruyor. | `toplanti-notu.md`: Mert (Açık kalanlar) |
| 2.6 | **"Sunucu yok" dış servisleri de kapsıyor mu?** Tarayıcıdan dış bir API'ye istek atmak "sunucu yok" kararına aykırı sayılır mı, belli değil. Mert'in kişisel veri kaygısı bu soruyu doğrudan etkiliyor. | `toplanti-notu.md`: Deniz (Kararlar), Mert |
| 2.7 | **Temalar nereden gelecek?** Temaların önceden tanımlı bir listeden mi geleceği, veriden mi çıkacağı ve ne kadar ayrıntılı olacağı konuşulmamış. Örneğin "kart reddedildi", "3D Secure açılmıyor", "taksit görünmüyor" ve "iki kez çekildi" tek bir "ödeme" teması mı, ayrı temalar mı? Bu seçim sıralamayı değiştirir. | Notlarda yok; CSV GB-0001, 0008, 0010, 0015, 0026, 0028 |
| 2.8 | **İngilizce yorumlar.** Selin sayılmalarını istiyor. Bunların aynı temalarla mı eşleşeceği, ayrı mı ele alınacağı belli değil. CSV'de dil sütunu yok. | `slack-dokumu.md`: Selin |
| 2.9 | **Platform ve sürüm bilgisi.** Mert bildirim gecikmesinin Android 14 ve sürüm 5.2 ile başladığını düşünüyor. Ece segmentte platform olmadığını söylüyor. Bu bilginin araç kapsamında olup olmadığı belli değil. | `slack-dokumu.md`: Mert, Ece |
| 2.10 | **Birden fazla dosya.** Günlük ya da haftalık gelen CSV'lerin birleştirilip birleştirilmeyeceği, mükerrer kayıtların ne olacağı ve hangi zaman aralığının analiz edileceği konuşulmamış. | `toplanti-notu.md`: Ece |
| 2.11 | **Raporun kapsamı.** Deniz "ilk üç işi" seçmek istiyor. Raporda yalnızca ilk üç tema mı olacak, tam sıralama mı? Belli değil. | `toplanti-notu.md`: Deniz |
| 2.12 | **Demo tarihi ve kapsamı.** Mert "haftaya cuma demo" ve "yönetim toplantısı pazartesi" diyor. Tarih onaylanmış değil, demoda neyin gösterileceği de tanımlı değil. | `slack-dokumu.md`: Mert |
| 2.13 | **Kim kullanacak?** Deniz "CSV'yi atayım" diyor. Aracı başka kimin kullanacağı belli değil. | `toplanti-notu.md`: Deniz |

## 3. Veri riskleri (ilk 30 satır)

| # | Risk | Kaynak |
|---|---|---|
| 3.1 | **Metin içinde kişisel veri.** Ece metinlerde telefon numarası geçen kayıtlar olduğunu söylüyor. İlk 30 satırda bir telefon numarası görmedim, dolayısıyla bu kayıtlar dosyanın ilerisinde olabilir. | `slack-dokumu.md`: Ece |
| 3.2 | **Puan ölçeği.** İlk 30 satırda tüm kanallarda puan 1-5 arasında. NPS normalde 0-10 ölçeğindedir (varsayım). Anket puanının dönüştürülüp dönüştürülmediği ve destek kaydına puanı kimin verdiği bilinmiyor. | `toplanti-notu.md`: Deniz ("NPS anketi"); CSV |
| 3.3 | **Puan ile metin uyuşmuyor.** GB-0012 "Cok can sikici" diyor ama puanı 4. GB-0022 "1 yıldızı bile hak etmiyor" diyor ama puanı 2. Mutsuzluk puandan okunursa yanıltabilir. | CSV |
| 3.4 | **Türkçe karakter tutarsızlığı.** Bazı metinler Türkçe karaktersiz yazılmış: "kartim", "Cok can sikici", "secenek", "Bebek arabasi". Segment değeri `duzenli`, Ece ise "düzenli" diye yazıyor. Anahtar kelime eşleştirmesi bu kayıtları kaçırabilir. | CSV; `slack-dokumu.md`: Ece |
| 3.5 | **Kelime belirsizliği.** GB-0020 "Bildirim gecikmesi yüzünden rezervasyonum iptal oldu" metninde "iptal" geçiyor ama konu bildirim gecikmesi. GB-0021 iptal ile ödeme konusunu birlikte taşıyor. | CSV |
| 3.6 | **Tekrar eden kalıplar.** "Merhaba,", "Böyle olmamalı.", "Cok can sikici", "Teşekkürler," ve "👏" kalıpları birçok satırda aynen tekrarlanıyor. GB-0026 ile GB-0028 neredeyse aynı metin. Verinin kısmen şablonla üretilmiş olabileceği ya da mükerrer kayıt içerebileceği bir varsayım. Benzerliğe dayalı gruplama bu kalıplardan etkilenebilir. | CSV |
| 3.7 | **İlk 30 satırdaki dağılım.** İptal ücreti 5 kayıt (GB-0005, 0007, 0013, 0021, 0030), bildirim gecikmesi 5 kayıt (GB-0003, 0006, 0009, 0020, 0024). Ödeme ve kart sorunları birlikte sayılırsa 6 kayıt (GB-0001, 0008, 0010, 0015, 0026, 0028). Bu sayıları ben elle saydım ve 150 satırın tamamına genellenemez. | CSV |
| 3.8 | **İngilizce kayıt yok.** Selin İngilizce yorumlardan söz ediyor, ama ilk 30 satırda hiç İngilizce kayıt yok. Örnek dosyada olup olmadığını bilmiyorum. | `slack-dokumu.md`: Selin; CSV |
| 3.9 | **Sıralama ve tarih aralığı.** Satırlar tarihe göre sıralı değil. İlk 30 satırda tarih aralığı 2026-08-24 ile 2026-10-03 arası, bu da Ece'nin "son 6 hafta" ifadesiyle uyumlu. | CSV; `slack-dokumu.md`: Ece |
| 3.10 | **Biçim değişkenliği.** Bazı metinler tırnak içinde, bazıları değil. Metinlerde emoji ve virgül var. Ayrıca Ece'nin saydığı beş sütuna ek olarak bir `id` sütunu var. İleride gelecek dosyaların aynı biçimde olacağının garantisi yok. | CSV; `toplanti-notu.md`: Ece |
| 3.11 | **Temsil gücü.** Örnek dosyanın gerçek hacmi temsil edip etmediği belli değil (bkz. 1.4). | `slack-dokumu.md`: Selin, Ece |

## 4. Sorulacak sorular (önem sırasıyla)

1. **Deniz'e:** "Öncelik" formülü kesinleşti mi? "Ne kadar yeni" geri bildirimin tarihini mi, yeni kullanıcı segmentini mi ifade ediyor? "Ne kadar mutsuz" `puan` sütunundan mı okunacak? *(2.1, 2.2, 2.3)*
2. **Deniz'e (Selin ve Ece ile birlikte):** Kanal ağırlığı konusunda kim karar verecek ve ne zaman? *(1.2, 2.4)*
3. **Mert'e ve Deniz'e:** "Bir yere gitmesin" ne anlama geliyor? Tarayıcıdan hiçbir dış servise istek atılmayacak mı? Yönetime giden rapordaki gerçek alıntılarda telefon numarası gibi bilgiler görünebilir mi? *(1.6, 2.5, 2.6)*
4. **Ece'ye:** Gerçek kullanımda gelecek CSV'de ad ve telefon sütunları olacak mı? Sütun adları ve sırası sabit mi? Kanal başına puan ölçeği ne (NPS 0-10 mu dönüştürülmüş, destek puanını kim veriyor)? *(1.7, 3.2, 3.10)*
5. **Ece'ye ve Selin'e:** Örnek dosya destek hacminin tamamını mı içeriyor? Selin'in "günde 14 iptal şikâyeti" ile 6 haftada 150 satır nasıl bağdaşıyor? *(1.4, 3.11)*
6. **Deniz'e:** Temalar önceden tanımlı bir listeden mi gelmeli, veriden mi çıkmalı? Ödeme sorunları gibi alt başlıklar tek tema mı sayılacak? *(2.7)*
7. **Mert'e ve Deniz'e:** Demo cuma günü kesin mi? Demoda ne gösterilecek: tam rapor mu, yalnızca ilk üç tema mı? *(2.11, 2.12)*
8. **Selin'e ve Ece'ye:** İngilizce yorumlar hangi kanaldan, hangi oranda geliyor ve örnek dosyada var mı? Ayrıca, Ece'ye: platform ve sürüm bilgisi eklenebilir mi, yoksa bu kapsam dışı mı? *(2.8, 2.9, 3.8)*
