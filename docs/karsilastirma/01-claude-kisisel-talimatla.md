# Radar: geliştirme öncesi netleşmesi gerekenler

Kaynak kısaltmaları: **TN** = `docs/notlar/toplanti-notu.md` (3 Ekim), **SD** = `docs/notlar/slack-dokumu.md` (4-6 Ekim), **CSV** = `data/ornek-geri-bildirim.csv`.

## 1. Çelişkiler

| # | Çelişki | Kaynak |
|---|---|---|
| 1.1 | **Kanal ağırlığı.** Selin mağaza yorumları daha ağır sayılsın diyor ("herkes görüyor, puanı düşürüyor"). Ece tüm kanalların eşit sayılmasını istiyor ("yoksa sonucu biz yönlendirmiş oluruz"). | TN, Selin ve Ece |
| 1.2 | **En büyük sorun hangisi?** Selin'e göre iptal ücreti, Mert'e göre bildirim gecikmesi. CSV'nin ilk 30 satırındaki kendi sayımım ikisini de doğruluyor ama farklı kanallarda: iptal ücreti 12 kayıt (5'i destek), bildirim gecikmesi 8 kayıt (7'si mağaza). Hangisinin üstte çıkacağını 1.1'deki ağırlık kararı belirliyor. | TN, Selin ve Mert; CSV satır 1-30 |
| 1.3 | **Doğru sonuç önceden belirlenmiş.** Selin "iptal ücreti en üstte çıkmazsa araç yanlış çalışıyor" diyor. Ece ise sonucun yönlendirilmemesini istiyor. Aracın neye göre "doğru" sayılacağı konusunda anlaşma yok. | SD, Selin; TN, Ece |
| 1.4 | **Hacim tutmuyor.** Selin'e göre bir günde 14 iptal ücreti şikâyeti gelmiş. Örnek dosyada ise 6 haftada toplam 150 satır var, yani günde yaklaşık 3,5 kayıt. Örnek dosya gerçek hacmi temsil etmiyor olabilir; bu bir varsayım. | SD, Selin ve Ece |
| 1.5 | **Kişisel veri.** Mert CSV'de ad ve telefon sütunu olduğunu söylüyor. Ece örnekte bu sütunları silmiş ama metinlerde telefon geçtiğini belirtiyor. Gerçek dosyanın hangi sütunlarla geleceği belli değil. | TN, Mert; SD, Ece |
| 1.6 | **Alıntı ile kişisel veri çakışıyor.** Deniz raporda "iki üç gerçek alıntı" istiyor ve rapor yönetime, Confluence'a gidecek. Telefon numarası geçen metinler alıntı olarak seçilirse kişisel veri rapora girer. | TN, Deniz ve Mert; SD, Ece |
| 1.7 | **Sütun listesi.** Ece beş sütun saydı: tarih, kanal, metin, puan, segment. CSV'de bir de `id` var. Gerçek dosyada id'nin her zaman olup olmayacağı bilinmiyor. | TN, Ece; CSV başlık satırı |

## 2. Açık noktalar

| # | Konu | Kaynak |
|---|---|---|
| 2.1 | **Öncelik formülü.** Notta açık madde olarak duruyor. Deniz "kaç kişi × ne kadar mutsuz × ne kadar yeni" önerdi ama "emin değilim" dedi. | TN, Açık kalanlar; SD, Deniz |
| 2.2 | **"Ne kadar yeni" ne demek?** Geri bildirimin tarihi mi, yoksa `segment = yeni` kullanıcı mı? İkisi de mümkün. | SD, Deniz ve Ece |
| 2.3 | **"Ne kadar mutsuz" neyle ölçülecek?** `puan` sütunu mu, metnin tonu mu? Puanın her kanalda neyi ifade ettiği tanımlanmamış (bkz. 3.2). | SD, Deniz |
| 2.4 | **Temaları kim, nasıl belirleyecek?** Deniz "temaları göreyim" diyor. Temaların önceden tanımlı bir liste mi olacağı, araçta mı çıkarılacağı konuşulmamış. | TN, Deniz |
| 2.5 | **İngilizce yorumlar.** Selin sayılsın istiyor, karar yok. Türkçe temalarla aynı yere mi düşecekleri belli değil. | SD, Selin |
| 2.6 | **Kişisel veri.** Açık madde olarak duruyor. Mert'in şartı "bir yere gitmediğinden emin olalım". Bunun dış kütüphane ya da harici servis kullanımını nasıl kısıtladığı tanımlanmamış. | TN, Mert ve Açık kalanlar |
| 2.7 | **Dosya sıklığı ve birleştirme.** Ece CSV'nin haftalık ya da günlük gelebileceğini söyledi. Aracın tek dosya mı, birden çok dosya mı alacağı ve dönemler arası karşılaştırma isteyip istemediği belli değil. Destek, mağaza ve anket ayrı mı yüklenecek, Ece birleştirip mi verecek? O da netleşmedi. | TN, Ece |
| 2.8 | **Çıktının kapsamı.** Deniz "ilk üç işi kanıtla seçmek" istiyor. Raporun ilk üç temayla mı sınırlı kalacağı, tüm temaları mı listeleyeceği belirsiz. | TN, Deniz |
| 2.9 | **Demo tarihi ve kapsamı.** Mert "haftaya cuma demo yapabilir miyiz?" diye sordu, cevap verilmemiş. Varsayım: mesaj 6 Ekim'de yazıldıysa demo 16 Ekim, yönetim toplantısı 19 Ekim. | SD, Mert |
| 2.10 | **Platform ve sürüm.** Mert, bildirim gecikmesinin Android 14 ve 5.2 sürümüyle başladığını düşünüyor. CSV'de platform sütunu yok; Ece doğruladı. Bu bilgi yalnızca bazı metinlerde geçiyor (GB-0011, GB-0016). | SD, Mert ve Ece |

## 3. Veri riskleri

İlk 30 satıra baktım. Slack'teki iddiaları doğrulamak için dosyanın tamamında yalnızca telefon numarası ve İngilizce metin aradım. O kayıtlar ayrıca işaretli.

| # | Risk | Kanıt |
|---|---|---|
| 3.1 | **Metinlerde telefon numarası var.** | Satır 30'dan sonra: GB-0110 "beni arayın 0532 555 12 34", GB-0111 "+90 555 987 65 43". Ece'nin söylediğini doğruluyor (SD). |
| 3.2 | **Puan ölçeği kanaldan kanala farklı olabilir.** Toplantıda "NPS anketi" geçiyor. NPS genelde 0-10 ölçeğinde olur, CSV'deki anket puanları ise 1-5 arasında. Varsayım: anket puanı dönüştürülmüş olabilir. Destek kaydındaki puanın kaynağı da bilinmiyor. | TN, Deniz; CSV `puan` sütunu |
| 3.3 | **Puan ile metin uyuşmuyor.** Şikâyet içeren kayıtlar yüksek puan almış. Puan mutsuzluk ölçüsü olarak kullanılırsa sonuç yanlış çıkar. | GB-0017 "gittik kapalıydı, destek de yardımcı olmadı" → 4; GB-0015 "50 TL kesilmiş" → 3; GB-0025 → 3 |
| 3.4 | **Aynı metin tekrar ediyor.** Aynı kişi mi, kopya kayıt mı, farklı kişiler mi? Kullanıcı kimliği olmadığı için ayırt edilemiyor. "Kaç kişi söylüyor" sayısını şişirebilir. | GB-0010 ve GB-0014; GB-0004 ve GB-0023; GB-0012 ve GB-0028; GB-0009 ve GB-0021 |
| 3.5 | **"Yine aynı sorun" ve "İkinci kez yaşıyorum" ifadeleri.** Tekrarlayan şikâyetin ayrı mı, tek mi sayılacağı belirsiz. Metinlerin aynı kalıplarla başlayıp bitmesi ("Şikâyetim şu:", "Lütfen düzeltin.", "Destek de yardımcı olmadı.") örnek verinin üretilmiş olabileceğini düşündürüyor; bu bir varsayım. Gerçek veride dağılım farklı olabilir. | Satır 1-30'da çok sayıda |
| 3.6 | **Anahtar kelimeyle eşleştirme yanıltır.** "Bildirim gecikmesi yüzünden rezervasyonum iptal oldu" metninde "iptal" geçiyor ama konu bildirim gecikmesi. Bu yüzden 1.2'deki sayım, Selin'in beklentisini yapay olarak destekleyebilir. | GB-0009, GB-0021 |
| 3.7 | **Mağaza kanalı tek bir değer.** App Store ile Google Play ayrılmamış. Platform yalnızca metinden okunabiliyor. | CSV `kanal` = anket / magaza / destek; TN, Deniz iki mağazayı ayrı saydı |
| 3.8 | **Karışık dil.** İngilizce yorumlar var. | Satır 30'dan sonra: GB-0042, GB-0085 |
| 3.9 | **Tarihler sıralı değil.** İlk 30 satır 2026-08-25 ile 2026-10-04 arasında karışık sırada. "Son 6 hafta" bilgisi tutuyor. | CSV `tarih`; SD, Ece |
| 3.10 | **Türkçe karakter ve tırnaklı alanlar.** Virgül içeren metinler tırnak içinde, metinlerde ş, ı, ğ, â geçiyor. Ece'nin diğer kaynaklardan çevireceği dosyaların aynı kodlama ve ayırıcıyla geleceği doğrulanmadı. | CSV; TN, Ece |
| 3.11 | **Ölçeğin doğrulanmamış bir ifadesi var.** Mert, ad ve telefon alanlarının "destek sisteminden öyle geldiğini" söylüyor. Mağaza ve anket dosyalarında başka kişisel alanlar olup olmadığı bilinmiyor. | TN, Mert |

## 4. Sorulacak sorular (önem sırasıyla)

1. **Deniz:** Öncelik neye göre hesaplanacak? Önerdiğin üç çarpandaki "ne kadar yeni" geri bildirimin tarihini mi, yeni kullanıcı segmentini mi kastediyor? "Ne kadar mutsuz" puandan mı okunacak? (2.1, 2.2, 2.3, 3.3)
2. **Deniz:** Kanal ağırlığı kararını kim verecek? Selin'in önerisi mi, Ece'nin önerisi mi, yoksa kullanıcının değiştirebileceği bir ayar mı olacak? (1.1, 1.2)
3. **Mert ve Deniz:** "Bir yere gitmesin" tam olarak ne demek? Harici kütüphane ya da servis kullanımı kabul edilecek mi? Rapordaki alıntılarda telefon numarası gibi bilgilerin görünmemesi şart mı? (1.6, 2.6, 3.1)
4. **Ece:** Gerçek dosya hangi sütunlarla gelecek (ad ve telefon dahil mi, id her zaman var mı)? Üç kaynak tek dosyada mı birleşik gelecek? Haftalık ve günlük dosyalar birlikte mi yüklenecek? (1.5, 1.7, 2.7)
5. **Ece:** `puan` sütunu anket, mağaza ve destekte aynı ölçekte mi? Anketteki NPS değeri nasıl dönüştürüldü? Destek kaydındaki puan nereden geliyor? (3.2)
6. **Selin:** "Dün 14 iptal ücreti şikâyeti" sayısı hangi kaynaktan? Örnek dosyada günde yaklaşık 3,5 kayıt var; örnek gerçek hacmi temsil ediyor mu? (1.3, 1.4)
7. **Deniz:** Temalar önceden tanımlı bir listeden mi gelecek, yoksa araç mı çıkaracak? İngilizce yorumlar Türkçe temalarla aynı yere mi sayılacak? (2.4, 2.5, 3.8)
8. **Deniz ve Mert:** Demo 16 Ekim'de mi? Demoda neyin gösterilmesi bekleniyor: tam rapor mu, yalnızca ilk üç tema mı? (2.8, 2.9)

Sınır dışı kalan konu: platform ve sürüm bilgisi (2.10). Mert'in hipotezi için önemli ama 8 soru sınırına girmedi.

---

**Neyi kaçırmış olabilirim:** Dosyanın 31-150 arası satırlarına yalnızca telefon numarası ve İngilizce kelime araması yaptım. Tam bir profil çıkarmadım (boş alan, puan dağılımı, yinelenen id); bunun için yazdığım betik izin ekranında reddedildi. Boş alan ya da geçersiz değer olsaydı ilk 30 satırda göremezdim.

**En zayıf iddiam:** 1.2'deki 12'ye 8 sayımı. Elle saydım ve hangi kaydın hangi temaya ait olduğu benim yorumum. 3.6'daki sorun bu sayımı da etkiliyor.

**Gerekçesiz kalan kararım:** 4'teki önem sırası. Öncelik formülünü ve ağırlığı en üste koydum, çünkü sonucu en çok onlar değiştiriyor. Kişisel veri sorusu ise teknik kısıt koyduğu için 1. sıraya da çıkabilirdi.
