# Radar: kabul kriterleri

**Kaynaklar:** `docs/kararlar.md` (K1-K8 ve Deniz'in ek notu), `docs/notlar/toplanti-notu.md` (3 Ekim), `docs/notlar/slack-dokumu.md` (4-6 Ekim) ve `data/ornek-geri-bildirim.csv` dosyasının 150 satırının tamamı (GB-0001…GB-0150).

**Hedef:** 16 Ekim Cuma demosu (K7). Aşağıdaki kriterlerin hepsi geçtiğinde iş "bitti" sayılır.

## Nasıl okunur

- **Fixture:** "Fixture: GB-0030, GB-0133" ifadesi, başlık satırı `id,tarih,kanal,metin,puan,segment` ile bu satırları örnek CSV'den **aynen** kopyalayarak hazırlanan küçük bir test dosyası demektir.
- **Tema adları:** `data/temalar.json` henüz yok (bkz. E1). Tema eşleştirme kriterleri bu yüzden belirli tema adlarına bağlı yazılmadı. Kriterler "GB-X, GB-Y ile aynı temada görünür" biçiminde. Bu kriterler sözlüğün içeriği ne olursa olsun geçerli.
- **Görünürlük:** Puanın, kayıt sayısının ve okunan satır sayısının ekranda gösterilip gösterilmeyeceğine karar verilmedi (bkz. E6). O karar gelene kadar sayısal beklentiler geliştirici konsolundan ya da birim testiyle doğrulanır.
- Kriterler, sözlüğe ya da veriye değil karara dayanmalı. Bu nedenle tam örnek dosya için "şu tema 1. çıkmalı" türünden bir kriter **yok** (Deniz'in ek notu).

---

## 1. Dosya yükleme

### KK-01 · Örnek dosyanın tamamı okunur
**Tür:** başarı · **Kaynak:** K4; toplantı notu (Deniz: "CSV'yi atayım, temaları … göreyim")
- **Ön koşul:** Radar tarayıcıda açık.
- **Eylem:** `data/ornek-geri-bildirim.csv` dosyası yüklenir.
- **Beklenen:** 150 kayıt okunur, hata mesajı çıkmaz, pano açılır. GB-0001 ve GB-0150 panoda bir temada ya da "diğer" altında bulunabilir.

### KK-02 · Tırnak, virgül ve emoji içeren metinler bölünmeden okunur
**Tür:** sınır · **Kaynak:** K4 (`metin` tek sütun)
- **Ön koşul:** KK-01'deki yükleme.
- **Eylem:** Aşağıdaki kayıtların metni incelenir.
- **Beklenen:**
  - GB-0105'in metni tek parça okunur: `Uygulama "harika" ama iptal ücreti, bildirimler, ödeme... hepsi sorun`. Kaçışlı çift tırnak, metinde tek tırnak çifti olarak görünür. Virgüller yeni sütun açmaz.
  - GB-0001'in metni (`Kayıtlı kartım silinmiş, her seferinde yeniden giriyorum.`) tek parça okunur ve puanı `1` olarak kalır.
  - GB-0057'nin metni `Bildirim yine gecikti 😡` emojiyle birlikte görünür.

### KK-03 · Boş metinli kayıt dosyayı bozmaz
**Tür:** sınır · **Kaynak:** K4, K6
- **Ön koşul:** Fixture: GB-0140 (`metin` boş), GB-0134.
- **Eylem:** Fixture yüklenir.
- **Beklenen:** Dosya reddedilmez ve 2 kayıt okunur. GB-0140 "diğer" altında görünür (bkz. KK-08). GB-0134 kendi temasında görünür. Boş metnin "diğer"de mi kalacağı yoksa atılacağı E7'de onaylanmalı.

### KK-04 · Ad ya da telefon sütunu içeren ham dosya reddedilir
**Tür:** hata · **Kaynak:** K4 ("Sütunlar sabit"), K3; toplantı notu (Mert: "CSV'de müşteri adı ve telefon da var")
- **Ön koşul:** Fixture: GB-0001 ile GB-0003 arası. Başlığa `ad,telefon` sütunları, her satıra da `Test Kişi,05000000000` değerleri eklenir.
- **Eylem:** Dosya yüklenir.
- **Beklenen:** Pano ve rapor oluşmaz. Ekranda dosyanın beklenen sütunlarla (`id,tarih,kanal,metin,puan,segment`) eşleşmediği yazar. `Test Kişi` ve `05000000000` sayfanın hiçbir yerinde görünmez.

### KK-05 · Başlığı farklı ya da CSV olmayan dosya reddedilir
**Tür:** hata · **Kaynak:** K4 ("tek CSV", "Sütunlar sabit")
- **Ön koşul:** Üç dosya:
  - (a) `puan` sütunu silinmiş bir örnek CSV
  - (b) başlık satırı `tarih,kanal,metin,puan,segment` olan bir dosya (`id` yok, Ece'nin toplantıda saydığı beş sütun)
  - (c) örnek CSV'nin Excel'e aktarılıp `.xlsx` olarak kaydedilmiş hâli
- **Eylem:** Her dosya ayrı ayrı yüklenir.
- **Beklenen:** Üç dosyada da pano ve rapor oluşmaz, ekranda dosyanın reddedildiği yazar. Önceden yüklenmiş geçerli bir dosya varsa onun panosu değişmez ya da temizlenir; yarım veya karışık bir pano kalmaz.

> Dosya geçerli olduğu hâlde içinde bozuk **satır** varsa (kapanmamış tırnak, eksik alan, 1-5 dışında puan, geçersiz tarih) aracın ne yapacağına karar verilmedi. Bu yüzden bu durumlar için kriter yazılmadı (bkz. E5).

---

## 2. Tema eşleştirme

### KK-06 · Temalar yalnızca sözlükten gelir
**Tür:** başarı · **Kaynak:** K6
- **Ön koşul:** PM'in onayladığı `data/temalar.json` dosyası mevcut. Örnek CSV yüklü.
- **Eylem:** Panodaki tema adları `temalar.json` içindeki tema adlarıyla karşılaştırılır.
- **Beklenen:** Panodaki her tema adı ya `temalar.json`'da birebir geçer ya da "diğer" olur. Sözlükte olmayan, veriden türetilmiş bir tema adı görünmez.

### KK-07 · Birden çok temaya giren kayıt her temada sayılır
**Tür:** sınır · **Kaynak:** K6, K1
- **Ön koşul:** Sözlükte, GB-0105'in metnindeki "iptal ücreti", "bildirimler" ve "ödeme" ifadelerinin her birini kapsayan ayrı birer tema var. Örnek CSV yüklü.
- **Eylem:** Bu üç temanın kayıt listeleri incelenir.
- **Beklenen:** GB-0105 üç temanın listesinde de bulunur. Her temanın kayıt sayısına 1 olarak, ortalama puanına `2` olarak katılır. "diğer" altında görünmez.

### KK-08 · Hiçbir temaya girmeyen kayıt "diğer" altında görünür
**Tür:** sınır · **Kaynak:** K6
- **Ön koşul:** KK-03 fixture'ı (GB-0140, GB-0134).
- **Eylem:** Pano incelenir.
- **Beklenen:** Panoda "diğer" başlığı görünür ve GB-0140 bu başlığın altındadır. Sözlükteki hiçbir ifadeyi içermeyen her kayıt aynı şekilde "diğer"e düşer. Hiçbir kayıt panodan kaybolmaz: temalara girmiş kayıtlar ile "diğer"deki kayıtlar birleştiğinde dosyadaki bütün `id`'ler (fixture'da 2, örnek dosyada 150) bulunur.

### KK-09 · Türkçe karaktersiz yazılmış kayıt, karakterli eşiyle aynı temaya girer
**Tür:** sınır · **Kaynak:** K6 (kayıt temada sayılır), K1 ("kaç kayıt"); CSV
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** Her çiftin tema listeleri karşılaştırılır.
- **Beklenen:** Her satırdaki iki kaydın tema kümesi birebir aynıdır:

| Karaktersiz | Karakterli | Ortak konu |
|---|---|---|
| GB-0058 `50 TL kesilmis. Hicbir yerde yazmiyordu` | GB-0041 | iptal ücreti |
| GB-0093 `restorana degil size ucret odemisim` | GB-0021 | iptal ücreti |
| GB-0146 `Iptal butonuna basinca uyari cikmadi` | GB-0094 | iptal ücreti |
| GB-0111 `masa hazir mesaji gelmedigi icin` | GB-0024 | bildirim |
| GB-0059 `Bildirimler gec gelince … masayi verdi` | GB-0031 | bildirim |
| GB-0142 `Android'de bildirim hic gelmedi` | GB-0144 | bildirim |
| GB-0076 `Odeme iki kere cekildi` | GB-0010 | ödeme |
| GB-0047 `sadakat puanlarim sifirlanmis` | GB-0017 | sadakat puanı |

### KK-10 · Büyük-küçük harf farkı (İ / I / i) eşleşmeyi bozmaz
**Tür:** sınır · **Kaynak:** K6; CSV
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** GB-0013 (`İptal ücretini kaldırın…`, büyük noktalı İ), GB-0100 (`Iptal ucretinin iadesi…`, büyük noktasız I) ve GB-0034 (`iptal ücretini kaldırın…`, küçük i) kayıtlarının temaları incelenir.
- **Beklenen:** Üç kaydın da "iptal ücreti" içerikli tema kümesi aynıdır. GB-0100, GB-0077 (`iptal ücretinin iadesi için üç kez yazdım.`) ile aynı temalardadır.

### KK-11 · İngilizce yorum, Türkçe eşiyle aynı temaya girer
**Tür:** sınır · **Kaynak:** K8; Slack (Selin: "İngilizce yorumlar var … onlar da sayılsın")
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** İngilizce kayıtların temaları incelenir.
- **Beklenen:**
  - GB-0137 (`I was charged a cancellation fee nobody told me about.`), GB-0007 (`İptal ücreti olduğunu ödeme sayfasında görmedim…`) ile aynı "iptal ücreti" temasındadır.
  - GB-0080 (`Table ready notification arrived way too late.`), GB-0051 (`Masanız hazır bildirimi 20 dakika geç geldi…`) ile aynı bildirim temasındadır.
  - GB-0121 (`Payment failed twice with a valid foreign card.`), GB-0102 (`Ödeme başarısız dedi…`) ile aynı ödeme temasındadır.
  - İngilizce kayıtlar için ayrı bir "İngilizce" ya da "yabancı dil" teması veya bölümü yoktur.

### KK-12 · Platform ve sürüm bilgisi ayrıştırılmaz
**Tür:** sınır · **Kaynak:** K8; Slack (Mert, Ece)
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** GB-0056 (`5.2 sürümünden sonra bildirimler gecikiyor.`) ve GB-0142 (`Android'de bildirim hic gelmedi…`) incelenir. Ardından pano incelenir.
- **Beklenen:** İki kayıt da GB-0003 (`Bildirimler son güncellemeden beri hep geç düşüyor…`) ile aynı bildirim temasındadır. Panoda platform ya da sürüm filtresi, sütunu veya kırılımı yoktur.

---

## 3. Puanlama

Formül (K1): **Puan = kayıt sayısı × (6 − temanın ortalama puanı) × (son 14 günün kayıt payı + 1)**

### KK-13 · Yeni kaydı olmayan bir temanın puanı
**Tür:** başarı · **Kaynak:** K1
- **Ön koşul:** Fixture: GB-0030 (2026-09-14, puan 1), GB-0133 (2026-08-25, puan 3), GB-0134 (2026-10-05, puan 3). GB-0030 ve GB-0133 aynı şikâyeti dile getiriyor ("2 saat önce iptal ettim yine de ücret aldınız") ve aynı temaya (T) giriyor. GB-0134 T'de değil.
- **Eylem:** Fixture yüklenir.
- **Beklenen:** T için:
  - kayıt sayısı = **2**
  - ortalama puan = (1 + 3) / 2 = **2**
  - mutsuzluk = 6 − 2 = **4**
  - yenilik = **1**. T'nin iki kaydı da hem dosyadaki en yeni tarihe (2026-10-05) hem de 2026-10-08 sonrası herhangi bir güne göre 14 günden eski olduğu için yenilik 1 çıkar. Bu sonuç E2 ve E3'ün nasıl kararlaştırılacağından bağımsızdır.
  - puan = 2 × 4 × 1 = **8**

### KK-14 · Kanal puanı değiştirmez
**Tür:** sınır · **Kaynak:** K2
- **Ön koşul:** KK-13 fixture'ı. GB-0030'un kanalı `destek` yerine `magaza`, GB-0133'ün kanalı `magaza` yerine `anket` yapılır.
- **Eylem:** Değiştirilmiş fixture yüklenir.
- **Beklenen:** T'nin puanı yine **8**. Panoda kanal ağırlığı ayarı yoktur (K2: ayar ikinci sürümde konuşulacak).

### KK-15 · Segment puanı değiştirmez
**Tür:** sınır · **Kaynak:** K1 ("'Yeni' segmenti formüle girmez")
- **Ön koşul:** KK-13 fixture'ı. GB-0030'un segmenti `duzenli` yerine `yeni`, GB-0133'ünki `yeni` yerine `kurumsal` yapılır.
- **Eylem:** Değiştirilmiş fixture yüklenir.
- **Beklenen:** T'nin puanı yine **8**.

---

## 4. Pano

### KK-16 · Temalar puana göre büyükten küçüğe sıralanır
**Tür:** başarı · **Kaynak:** K1; toplantı notu (Deniz: "hangisinin öncelikli olduğunu göreyim")
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** Panodaki tema sırası, her temanın K1'e göre hesaplanan puanıyla karşılaştırılır.
- **Beklenen:** Her temanın puanı, kendisinden sonra gelen temanın puanından büyük ya da ona eşittir. Eşit puanların sırası E8'e bağlı.

### KK-17 · Sıralama elle sabitlenmez; sonuç formülden çıkar
**Tür:** sınır · **Kaynak:** Kararlar, Deniz'in ek notu ("Selin'in beklentisi … kabul kriteri değildir")
- **Ön koşul:** Fixture: GB-0006 (10-03, puan 1), GB-0051 (10-01, puan 1), GB-0057 (10-04, puan 1) ve GB-0030 (09-14, puan 1). İlk üç kayıt aynı bildirim temasına (B), GB-0030 ise iptal temasına (İ) giriyor ve B'de değil.
- **Eylem:** Fixture yüklenir.
- **Beklenen:** B, İ'nin üstünde görünür. B'nin puanı en az 3 × 5 × 1 = 15, İ'nin puanı 1 × 5 × 1 = 5. Kodda belirli bir temayı (ör. "iptal ücreti") öne alan bir kural yoktur.

---

## 5. Rapor

### KK-18 · Rapor, panodaki ilk 5 temayla indirilebilir markdown dosyasıdır
**Tür:** başarı · **Kaynak:** K7; toplantı notu (Deniz: "markdown olsun ki Confluence'a yapıştırayım")
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** Rapor indirilir.
- **Beklenen:** `.md` uzantılı, düz metin bir dosya iner. Dosyada panodaki ilk 5 tema, panodaki sırayla yer alır. 6. ve sonraki temalar raporda geçmez.

### KK-19 · Her tema için en yeni 3 kaydın metni birebir alıntılanır
**Tür:** başarı · **Kaynak:** K7; toplantı notu (Deniz: "iki üç gerçek alıntı")
- **Ön koşul:** Fixture: GB-0003 (09-20), GB-0051 (10-01), GB-0006 (10-03), GB-0057 (10-04). Dört kayıt aynı bildirim temasında.
- **Eylem:** Rapor indirilir.
- **Beklenen:** Bu temanın altında tam 3 alıntı vardır: GB-0057, GB-0006, GB-0051. GB-0003 geçmez. Alıntı metinleri CSV'deki `metin` ile karakteri karakterine aynıdır; GB-0057 için `Bildirim yine gecikti 😡`. Kısaltma, çeviri ya da düzeltme yapılmaz. Tek istisna KK-24'teki telefon maskelemesi.

### KK-20 · 3'ten az kaydı olan temada uydurma ya da boş alıntı olmaz
**Tür:** sınır · **Kaynak:** K7
- **Ön koşul:** KK-13 fixture'ı (T'de 2 kayıt).
- **Eylem:** Rapor indirilir.
- **Beklenen:** T'nin altında tam 2 alıntı vardır (GB-0030 ve GB-0133). Üçüncü bir alıntı, boş madde ya da "alıntı yok" satırı bulunmaz.

### KK-21 · 5'ten az tema varsa rapor olanları gösterir
**Tür:** sınır · **Kaynak:** K7
- **Ön koşul:** KK-17 fixture'ı (2 tema).
- **Eylem:** Rapor indirilir.
- **Beklenen:** Raporda panodaki temalar panodaki sırayla yer alır. Boş tema başlığı ya da doldurma satırı yoktur.

---

## 6. Gizlilik

### KK-22 · Dosya tarayıcıdan dışarı gönderilmez
**Tür:** başarı · **Kaynak:** K3; toplantı notu (Deniz: "Sunucu kurmak istemiyoruz"; Mert: "bir yere gitmediğinden emin olalım")
- **Ön koşul:** Chrome DevTools > Network sekmesi açık ve "Preserve log" işaretli.
- **Eylem:** Radar açılır, örnek CSV yüklenir, pano incelenir, rapor indirilir.
- **Beklenen:** Sayfa yüklenirken yapılan isteklerin hepsi Radar'ın kendi adresine gider; başka alan adına (CDN, analitik, font, API) **0** istek yapılır. Dosya seçildikten sonra, rapor indirmesi dahil, hiçbir ağ isteği yapılmaz.

### KK-23 · Radar ağ bağlantısı olmadan çalışır
**Tür:** sınır · **Kaynak:** K3 ("dış servis ya da kütüphane çağrılmaz")
- **Ön koşul:** Radar açıldıktan sonra DevTools > Network > "Offline" seçilir.
- **Eylem:** Örnek CSV yüklenir, rapor indirilir.
- **Beklenen:** KK-01 ve KK-18 çevrimiçi hâldeki sonuçlarla birebir aynı çıkar. Konsolda ağ hatası görünmez.

### KK-24 · Metindeki telefon numarası panoda ve raporda maskelenir
**Tür:** başarı · **Kaynak:** K3; Slack (Ece: "metinlerin içinde telefon geçen birkaç kayıt var")
- **Ön koşul:** Fixture: GB-0084, GB-0120. GB-0084 bir iptal temasına, GB-0120 bir ödeme temasına giriyor.
- **Eylem:** Pano açılır, rapor indirilir.
- **Beklenen:**
  - GB-0084 hem panoda hem raporda `İptal ücreti kesildi, beni arayın 0532 *** ** 34` olarak görünür.
  - Şu dizgiler hiçbir yerde bulunmaz: panoda Ctrl+F ile, DevTools Elements aramasında ve indirilen `.md` dosyasında `0532 555 12 34`, `555 12`, `987 65`.
  - Maskeleme tema eşleşmesini ve puanı değiştirmez: GB-0084 yine kendi temasında sayılır ve puanı `1` olarak ortalamaya girer.

### KK-25 · Ülke kodlu numara da gizlenir
**Tür:** sınır · **Kaynak:** K3
- **Ön koşul:** KK-24 fixture'ı.
- **Eylem:** GB-0120 (`Ödeme sorunu var, numaram +90 555 987 65 43`) panoda ve raporda incelenir.
- **Beklenen:** `987 65` ve `9876543` dizgileri görünmez. Metnin `Ödeme sorunu var, numaram` kısmı değişmeden kalır. Maskenin tam biçimi (ör. `+90 555 *** ** 43`) E9'a bağlı.

### KK-26 · Telefon olmayan sayılar ve "telefon" kelimesi maskelenmez
**Tür:** sınır · **Kaynak:** K3 (yalnızca telefon numaraları maskelenir), K7 (gerçek alıntı)
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** Aşağıdaki kayıtlar panoda (ve rapora girdilerse raporda) incelenir.
- **Beklenen:** Şu ifadeler CSV'deki hâliyle, `*` olmadan görünür: GB-0041 `50 TL`, GB-0098 `400 TL`, GB-0064 `75 TL`, GB-0056 `5.2 sürümünden`, GB-0051 `20 dakika`, GB-0015 `3D Secure`, GB-0030 `2 saat`. GB-0126'nın metni (`Telefon numarası restoranın değil başka bir yerin.`) hiç değişmeden görünür.

---

## Kararı eksik

Aşağıdaki durumlar için kriter **yazılmadı**, çünkü sonucu belirleyen bir karar ya da not yok.

| # | Kriter yazmak için gereken karar | Etkilenen durum / kanıt | Kime sorulmalı |
|---|---|---|---|
| E1 | `data/temalar.json` içeriği: tema adları, ifadeler, İngilizce karşılıklar. Ayrıca GB-0020 (`Bildirim gecikmesi yüzünden rezervasyonum iptal oldu`) iptal ücreti temasına da girmeli mi? | Tüm tema kriterleri; tam örnek dosyanın beklenen sıralaması. Dosya repoda yok. | Deniz (onaylar); ifade önerileri için Selin ve Mert |
| E2 | "Son 14 gün" neye göre sayılır: dosyadaki en yeni tarih mi (örnekte 2026-10-05), yükleme günü mü? 14. gün dahil mi? | Yeni kaydı olan her temanın puanı. Aynı dosya farklı günlerde yüklendiğinde farklı sonuç verebilir. | Deniz |
| E3 | "Kayıt payı"nın paydası nedir: (a) temanın kendi kayıt sayısı mı, (b) son 14 gündeki tüm kayıtlar mı? | İki yorum, birden çok temanın yeni kaydı olduğunda farklı puan verir. KK-13 bu yüzden yenilik = 1 olan bir durumla sınırlı tutuldu. | Deniz |
| E4 | Tekrar eden kayıt: farklı `id`'li ama tarih, kanal, metin, puan ve segmenti aynı olan kayıtlar iki kez mi sayılır? Aynı `id` iki kez gelirse ne olur? Günlük veya haftalık birden çok CSV birleştirilecek mi? | GB-0011 ve GB-0150 bütün alanlarda aynı (2026-08-29, destek, `her açılışta yeniden giriş istiyor.`, 2, yeni). İkisi de raporda alıntı olarak çıkabilir. Toplantı notu, Ece: "CSV'ler günlük de gelebilir". | Deniz, Ece |
| E5 | Geçerli başlıklı dosyada bozuk satır: kapanmamış tırnak, eksik alan, 1-5 dışında puan (K4), geçersiz tarih, bilinmeyen kanal, farklı sütun sırası. Tüm dosya mı reddedilir, satır mı atlanır? Kullanıcıya kaç satırın atlandığı gösterilir mi? | KK-05'in satır düzeyindeki karşılığı. | Deniz; hangi hataların gerçekten geldiğini bilmesi için Ece |
| E6 | Panoda hangi sayılar görünür: tema puanı, kayıt sayısı, ortalama puan, yenilik, okunan/atlanan satır sayısı? Puan kaç ondalık basamakla gösterilir? | KK-01, KK-13…KK-16 şu an yalnızca konsoldan ya da birim testiyle doğrulanabiliyor. | Deniz |
| E7 | "diğer" puanlanır mı? Sıralamaya ve rapordaki ilk 5'e girebilir mi? Boş metinli kayıt (GB-0140) "diğer"de mi sayılır, atılır mı? | KK-03, KK-08, KK-18 | Deniz |
| E8 | Eşit puanlı temaların sırası ve eşit tarihli alıntılardan hangisinin seçileceği | GB-0077 ve GB-0146 aynı gün (2026-10-05); GB-0045, GB-0051 ve GB-0065 aynı gün (2026-10-01). Alıntılar birden çok tema arasında da bölünebilir: GB-0105 ve GB-0006 2026-10-03 tarihli. | Deniz |
| E9 | Maske biçimi: `0532 *** ** 34` dışındaki biçimlerde (`+90 …`, bitişik `05325551234`, yurt dışı numara) ne gösterilir? Metinde e-posta ya da ad geçerse maskelenir mi? (K3 yalnızca telefonu kapsıyor.) | KK-25'in tam beklentisi | Mert, Deniz |
| E10 | Rapor yapısı: başlık seviyeleri, temanın puanı ve kayıt sayısı raporda yer alır mı, alıntının yanında `id`, tarih ya da kanal yazılır mı, dosya adı ne olur, alıntılar hangi sırada verilir? | KK-18…KK-21 yalnızca içerik düzeyinde yazılabildi. | Deniz |
| E11 | Radar'ın kendi dosyalarıyla birlikte paketlenen (aynı adresten yüklenen) açık kaynak bir kütüphane K3'e uygun mu, yoksa hiç kütüphane kullanılmamalı mı? | KK-22 ve KK-23'ün kapsamı | Mert |
| E12 | Hangi tarayıcılarda ve hangi sürümlerde çalışmalı? | Bütün kriterlerin hangi ortamda koşulacağı | Deniz, Mert |
| E13 | Dosya boyutu ve süre sınırı: gerçek haftalık veya günlük CSV kaç satır olur, kaç saniyede pano açılmalı? | Performans kriteri yazılamadı. Notlarda bununla ilgili bir sayı yok. K5'e göre örnek dosya yalnızca bir kesit. | Ece (hacim), Deniz (eşik) |

**Bilinçli olarak kriter yazılmayanlar:**
- Selin'in "iptal ücreti en üstte çıkmalı" beklentisi (Deniz'in ek notu; bunun yerine KK-17 yazıldı).
- "Günde 14 iptal şikâyeti" sayısının tutturulması (K5).
- Platform veya sürüm analizi (K8; bunun yerine KK-12 yazıldı).
