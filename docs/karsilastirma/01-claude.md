# Radar: Geliştirme Öncesi Netleşmesi Gerekenler

Okunan kaynaklar: `docs/notlar/toplanti-notu.md` (3 Ekim), `docs/notlar/slack-dokumu.md` (4–6 Ekim) ve `data/ornek-geri-bildirim.csv` (başlık + GB-0001…GB-0030).

---

## 1. Çelişkiler

| # | Çelişki | Kaynak |
|---|---|---|
| 1.1 | **Kanal ağırlığı:** Selin mağaza yorumlarının daha ağır sayılmasını istiyor ("herkes görüyor, puanı düşürüyor"). Ece tüm kanalların eşit sayılmasını istiyor ("yoksa sonucu biz yönlendirmiş oluruz"). | toplanti-notu.md: Selin, Ece |
| 1.2 | **En büyük sorun hangisi:** Selin en çok iptal ücreti şikâyeti geldiğini söylüyor (destek kanalı). Mert mağaza yorumlarında daha çok bildirim gecikmesi gördüğünü söylüyor. İkisi farklı kanallara bakıyor. | toplanti-notu.md: Selin, Mert |
| 1.3 | **Sonucun önceden belirlenmesi:** Selin "radar'da bu [iptal ücreti] en üstte çıkmazsa araç yanlış çalışıyor demektir" diyor. Ece ise sonucun yönlendirilmemesini istiyor. Aracın doğru çalıştığını neye göre anlayacağımız iki kişi arasında farklı. | slack-dokumu.md: Selin; toplanti-notu.md: Ece |
| 1.4 | **Hacim tutmuyor:** Selin "dün de 14 iptal ücreti şikâyeti geldi" diyor. Ece'nin örnek dosyası ise 6 haftada toplam 150 satır, yani günde ortalama 3–4 kayıt. Örneğin tam veri mi yoksa bir kesit mi olduğu belli değil. | slack-dokumu.md: Selin, Ece |
| 1.5 | **Kişisel veri sütunları:** Mert CSV'de müşteri adı ve telefon olduğunu, destek sisteminin böyle verdiğini söylüyor. Ece örnekte bu sütunları sildiğini yazıyor. Gerçek kullanımda aracın hangi dosyayı alacağı (ham mı, temizlenmiş mi) iki ifadeye göre farklı. | toplanti-notu.md: Mert; slack-dokumu.md: Ece |
| 1.6 | **Dosya sıklığı:** Ece önce destek kayıtlarını "her hafta pazartesi" çekebileceğini, sonra "günlük de gelebilir, haftalık zorunlu değil" diyor. | toplanti-notu.md: Ece |
| 1.7 | **Platform verisi:** Mert bildirim gecikmesinin Android 14'te, 5.2 sürümüyle başladığını düşünüyor. Ece CSV'de platform sütunu olmadığını söylüyor (segment = yeni / düzenli / kurumsal). Bu haliyle veri Mert'in hipotezini sınamaya yetmiyor. | slack-dokumu.md: Mert, Ece |

---

## 2. Açık noktalar

| # | Konu | Neden geliştirmeyi etkiliyor | Kaynak |
|---|---|---|---|
| 2.1 | **"Öncelik" tanımı** | Toplantıda açık kaldı. Deniz'in aklındaki formül "kaç kişi söylüyor × ne kadar mutsuz × ne kadar yeni", ama kendisi de "emin değilim" diyor. Sıralama mantığı buna bağlı. | toplanti-notu.md: Açık kalanlar; slack-dokumu.md: Deniz |
| 2.2 | **"Ne kadar yeni" ne demek** | Üç anlama gelebilir: tarihin yakınlığı, temanın yeni ortaya çıkması ya da `segment = yeni` kullanıcılar. Bu ayrım notlarda yapılmamış. *(Varsayım: üçünden biri kastediliyor ama hangisi olduğu bilinmiyor.)* | slack-dokumu.md: Deniz; CSV `segment` sütunu |
| 2.3 | **"Ne kadar mutsuz" neyle ölçülecek** | `puan` sütunu var ama ölçeği ve kanallar arasında aynı anlama gelip gelmediği belirtilmemiş (bkz. 3.3). | slack-dokumu.md: Deniz; toplanti-notu.md: Ece |
| 2.4 | **Kanal ağırlığı** | Toplantıda karar verilmedi (bkz. 1.1). | toplanti-notu.md: Açık kalanlar |
| 2.5 | **Kişisel veri** | Toplantıda açık kaldı. Mert verinin "bir yere gitmediğinden emin olalım" diyor. Bunun hangi teknik sınırları kapsadığı (dış kütüphane, harici servis vb.) tanımlanmamış. Rapor yönetime gideceği ve içinde gerçek alıntılar olacağı için, metinlerdeki telefon numaralarının rapora girip girmeyeceği de konuşulmamış. | toplanti-notu.md: Açık kalanlar, Mert, Deniz; slack-dokumu.md: Ece |
| 2.6 | **İngilizce yorumlar** | Selin "onlar da sayılsın" diyor. Türkçe yorumlarla aynı temaya mı sayılacakları, rapordaki alıntıların hangi dilde olacağı konuşulmamış. | slack-dokumu.md: Selin |
| 2.7 | **Tema neye göre belirlenecek** | Deniz "temaları göreyim" diyor. Temaların hazır bir listeden mi geleceği, veriden mi çıkacağı, bir kaydın birden çok temaya girip giremeyeceği konuşulmamış. | toplanti-notu.md: Deniz |
| 2.8 | **Girdi: tek dosya mı, çok dosya mı** | Deniz "CSV'yi atayım" diyor (tekil). Kaynak üç ayrı yer: destek, mağaza, anket. Ece bunları aynı sütunlara çevirebileceğini söylüyor ama tek dosyada mı birleşeceği belli değil. Haftalar arası karşılaştırma isteniyor mu, o da belli değil. | toplanti-notu.md: Deniz, Ece |
| 2.9 | **Raporun kapsamı** | Deniz "ilk üç işi" seçmek istiyor. Raporda yalnız ilk üç tema mı olacak, tüm temalar mı? "İki üç gerçek alıntı" hangi ölçüte göre seçilecek? Belirtilmemiş. | toplanti-notu.md: Deniz |
| 2.10 | **Demo tarihi ve kapsamı** | Mert "haftaya cuma demo yapabilir miyiz? yönetim toplantısı pazartesi" diye soruyor. Cevap verilmemiş. Hangi cuma olduğu ve demoda neyin gösterileceği belli değil. | slack-dokumu.md: Mert |
| 2.11 | **Kullanıcı kim** | Notlarda aracı yalnız Deniz kullanıyor gibi görünüyor. Selin, Mert ve Ece'nin de kullanıp kullanmayacağı belirtilmemiş. *(Varsayım)* | toplanti-notu.md: Deniz |

---

## 3. Veri riskleri (`data/ornek-geri-bildirim.csv`, ilk 30 satır)

| # | Risk | Örnek satırlar | Kaynak |
|---|---|---|---|
| 3.1 | **Metin içinde kişisel veri.** Ece metinlerde telefon numarası geçen kayıtlar olduğunu söylüyor. İlk 30 satırda numara göremedim (GB-0030'da yalnız "telefon numarası" ifadesi geçiyor). Demek ki bu kayıtlar dosyanın geri kalanında. Metinlerin kişisel veri için taranması gerekecek ama kapsamı bilinmiyor. | GB-0030 (yalnız ifade) | slack-dokumu.md: Ece |
| 3.2 | **İngilizce kayıt yok.** Selin İngilizce yorumlar olduğunu söylüyor, ilk 30 satırın tamamı Türkçe. Örnekte İngilizce kayıt olup olmadığı doğrulanamadı. | GB-0001…0030 | slack-dokumu.md: Selin |
| 3.3 | **`puan` ölçeği belirsiz.** Değerler 1–5 arasında. NPS anketleri genelde 0–10 ölçeğini kullanır *(varsayım: genel bilgi, notlarda yok)*. Destek kaydına puanı kimin verdiği de belirtilmemiş. Kanallar arasında aynı anlama gelmiyor olabilir. | `anket`: GB-0001, 0006; `destek`: GB-0003, 0012 | toplanti-notu.md: Ece |
| 3.4 | **Puan ile metin tutarsız.** Şikâyet içeren bazı metinlerin puanı yüksek. "1 yıldızı bile hak etmiyor" yazan bir kaydın puanı 2. | GB-0017 (şikâyet, 4), GB-0015 (3), GB-0007 (3), GB-0027 (2) | CSV |
| 3.5 | **Neredeyse aynı metinler.** Aynı cümle farklı kanal, tarih ya da segmentle tekrar ediyor. Aynı kişinin birden çok kanaldan yazıp yazmadığı ayırt edilemiyor, bu da "kaç kişi söylüyor" sayısını şişirebilir. | GB-0012 ↔ GB-0028; GB-0009 ↔ GB-0021; GB-0010 ↔ GB-0014; GB-0004 ↔ GB-0023 | CSV |
| 3.6 | **Kalıp ifadeler.** "Yine aynı sorun:", "İkinci kez yaşıyorum:", "Şikâyetim şu:", "Lütfen düzeltin.", "Destek de yardımcı olmadı." ifadeleri sık ve mekanik biçimde tekrar ediyor. *(Varsayım: örnek veri kısmen üretilmiş ya da şablonlanmış olabilir.)* Gerçek veriyi ne kadar temsil ettiği bilinmiyor. | GB-0003, 0007, 0013, 0017 vb. | CSV |
| 3.7 | **Aynı konu farklı kelimelerle.** İptal ücreti için "iptal ücreti", "iptal cezası", "kesinti", "para çekildi", "75 TL gitti", "50 TL kesilmiş" kullanılmış. | GB-0001, 0010, 0015, 0024, 0025 | CSV |
| 3.8 | **Temalar iç içe.** "iptal" kelimesi bildirim gecikmesi şikâyetlerinde de geçiyor ("bildirim gecikmesi yüzünden rezervasyonum iptal oldu"). Kelime bazlı sayımda temalar karışabilir. Tek kayıtta iki konu olabiliyor. | GB-0002, 0009, 0021 | CSV |
| 3.9 | **Şikâyet dışı kayıtlar.** Olumlu yorumlar ve özellik istekleri de dosyada. Bunların önceliklendirmeye girip girmeyeceği belli değil. | Olumlu: GB-0006, 0018, 0020; istek: GB-0008 | CSV |
| 3.10 | **`magaza` kanalı birleşik.** App Store ile Google Play ayrılmamış, platform sütunu da yok. Platform bilgisi yalnız metinde dağınık geçiyor. | GB-0016 ("Android"), GB-0013 ("Apple ile giriş"), GB-0011 ("5.2 sürümü") | toplanti-notu.md: Deniz; slack-dokumu.md: Ece |
| 3.11 | **Segment yazımı farklı.** CSV'de `duzenli` (ASCII), Slack'te Ece "düzenli" yazıyor. Gelecekte gelecek dosyalarda yazımın sabit kalacağı bilinmiyor. | Tüm `duzenli` satırları | CSV; slack-dokumu.md: Ece |
| 3.12 | **Satırlar tarihe göre sıralı değil.** Aralık yaklaşık 2026-08-25 → 2026-10-04 (ilk 30 satırda). "Son 6 hafta" ifadesiyle uyumlu, ama sıralama gerekiyor. | GB-0001 (09-02), GB-0002 (09-30) | CSV; slack-dokumu.md: Ece |
| 3.13 | **Metinlerde virgül ve tırnak.** Bazı metinler tırnak içinde, bazıları değil. Ayrıştırma (parsing) sırasında dikkat gerekiyor. | GB-0001 (tırnaklı), GB-0002 (tırnaksız) | CSV |

---

## 4. Sorulacak sorular (önem sırasıyla)

1. **Deniz'e:** "Öncelik" formülündeki "ne kadar yeni" tarihin yakınlığı mı, temanın yeni ortaya çıkması mı, yoksa `segment = yeni` kullanıcılar mı? Formülün son hali kimin onayıyla belirlenecek? *(2.1, 2.2)*
2. **Mert'e ve Deniz'e:** "Veri bir yere gitmesin" kuralı dış kütüphane ya da harici servis kullanımını da kapsıyor mu? Rapordaki alıntılarda telefon numarası gibi kişisel veri görünebilir mi? *(2.5, 3.1)*
3. **Ece'ye:** Araca ham dosya mı (ad ve telefon sütunlu) gelecek, yoksa her seferinde senin temizlediğin dosya mı? Üç kaynak tek CSV'de mi birleşecek? *(1.5, 2.8)*
4. **Selin'e ve Ece'ye (birlikte), son karar Deniz'de:** Kanallar eşit mi sayılacak, ağırlıklı mı? *(1.1, 2.4)*
5. **Ece'ye:** `puan` her kanalda hangi ölçekte ve neyi ifade ediyor? Destek kaydındaki puanı kim veriyor? *(2.3, 3.3)*
6. **Selin'e ve Ece'ye:** Günde 14 iptal ücreti şikâyeti ile 6 haftada 150 satır nasıl bağdaşıyor? Örnek dosya tam veri mi, bir kesit mi? *(1.4, 3.6)*
7. **Mert'e ve Deniz'e:** Demo hangi cuma? Yönetim toplantısında neyin gösterilmesi bekleniyor? *(2.10)*
8. **Selin'e:** İngilizce yorumlar hangi kanaldan, yaklaşık ne kadar geliyor? Örnek dosyada var mı? *(2.6, 3.2)*

---

**Not:** CSV'nin yalnız ilk 30 satırına baktım. Ece'nin bahsettiği telefon içeren kayıtlar ve Selin'in bahsettiği İngilizce yorumlar bu aralıkta yok. Kalan 120 satırda olmaları muhtemel, ama doğrulamadım.
