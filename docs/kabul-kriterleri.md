# Radar: kabul kriterleri (8 Ekim kararlarıyla güncellendi)

**Kaynaklar:** `docs/kararlar.md` (K1-K8, Deniz'in ek notu ve 8 Ekim ek kararları K9-K20), `docs/notlar/toplanti-notu.md` (3 Ekim), `docs/notlar/slack-dokumu.md` (4-6 Ekim) ve `data/ornek-geri-bildirim.csv` dosyasının 150 satırının tamamı (GB-0001…GB-0150).

**Hedef:** 16 Ekim Cuma demosu (K7). Aşağıdaki kriterlerin hepsi geçtiğinde iş "bitti" sayılır.

## Nasıl okunur

- **Fixture:** "Fixture: GB-0030, GB-0133" ifadesi, başlık satırı `id,tarih,kanal,metin,puan,segment` ile bu satırları örnek CSV'den **aynen** kopyalayarak hazırlanan küçük bir test dosyası anlamına gelir. `GB-09xx` biçimindeki id'ler örnek dosyada yoktur. Bunlar sentetik satırlardır ve kriterde tam metinleriyle verilir.
- **Son 14 gün (K9):** Pencere, yüklenen dosyadaki en yeni geçerli tarihten başlayıp geriye doğru 14 takvim günüdür ve en yeni gün de pencereye dahildir. Fixture'larda bu tarih fixture'ın kendi en yeni tarihidir. Tam örnek dosyada pencere **2026-09-22…2026-10-05** aralığıdır. "O gün dahil" ifadesinin okunuşu E14'te teyit edilmeli.
- **Tema adları:** `data/temalar.json` dosyası hâlâ yok (bkz. E1). Bu yüzden tema kriterleri tema adı kullanmaz. Kriterler "GB-X, GB-Y ile aynı temada" biçiminde yazıldı. Tam dosya sıralaması (KK-40) da örnek kayıtlarla tanımlanmış kümeler üzerinden verildi.
- **Görünürlük (K12):** Puan, kayıt sayısı, ortalama puan ve okunan/atlanan satır sayısı panoda görünür. Bu yüzden sayısal beklentiler panodan doğrulanır. K12 tema altında kayıt listesi göstermeyi şart koşmaz. Bir kaydın hangi temaya girdiğine bakan kriterler (KK-07, KK-09…KK-12, KK-39) bu nedenle birim testiyle ya da geliştirici konsolundaki tema → `id` listesiyle doğrulanır.
- **Sayı yazımı:** Puanlar K12'ye göre bir ondalıkla, ondalık ayracı olarak nokta kullanılarak yazıldı (`8.0`). Ayraç ve ortalama puanın kaç ondalıkla gösterileceği E17'de açık.
- **Tam dosya sıralaması:** KK-40'taki sıra, Selin'in beklentisinden değil K1 formülünden hesaplandı. Deniz'in ek notuna göre sıralama hangi sonucu veriyorsa o kabul edilir.

---

## 1. Dosya yükleme

### KK-01 · Örnek dosyanın tamamı okunur
**Tür:** başarı · **Kaynak:** K4, K10, K11, K12, K13; toplantı notu (Deniz: "CSV'yi atayım, temaları … göreyim")
- **Ön koşul:** Radar tarayıcıda açık.
- **Eylem:** `data/ornek-geri-bildirim.csv` dosyası yüklenir.
- **Beklenen:**
  - Dosya reddedilmez, pano açılır, hata mesajı çıkmaz.
  - Panonun üstünde okunan ve atlanan satır sayıları görünür. Atlanan tek satır GB-0140'tır ve nedeni "boş metin" olarak yazar. Örnek dosyada başka bozuk satır yoktur: 1-5 dışında puan, geçersiz tarih, bilinmeyen kanal ya da eksik alan bulunmaz.
  - GB-0011 ile GB-0150 tek kayıt olarak sayılır (KK-28).
  - Geriye kalan 148 farklı kaydın her biri ya en az bir temada ya da "diğer" sayısında yer alır.
  - Okunan sayısının tam değeri (150, 149 ya da 148) ve GB-0150'nin atlanan sayısına eklenip eklenmeyeceği E15'e bağlıdır.

### KK-02 · Tırnak, virgül ve emoji içeren metinler bölünmeden okunur
**Tür:** sınır · **Kaynak:** K4 (`metin` tek sütun)
- **Ön koşul:** KK-01'deki yükleme.
- **Eylem:** Aşağıdaki kayıtların metni incelenir.
- **Beklenen:**
  - GB-0105'in metni tek parça okunur: `Uygulama "harika" ama iptal ücreti, bildirimler, ödeme... hepsi sorun`. Kaçışlı çift tırnak, metinde tek tırnak çifti olarak görünür. Virgüller yeni sütun açmaz.
  - GB-0001'in metni (`Kayıtlı kartım silinmiş, her seferinde yeniden giriyorum.`) tek parça okunur ve puanı `1` olarak kalır.
  - GB-0057'nin metni `Bildirim yine gecikti 😡` emojiyle birlikte görünür.

### KK-03 · Boş metinli satır atlanır, dosya reddedilmez
**Tür:** sınır · **Kaynak:** K11, K13
- **Ön koşul:** Fixture: GB-0140 (`metin` boş), GB-0134.
- **Eylem:** Fixture yüklenir.
- **Beklenen:**
  - Dosya reddedilmez.
  - Atlanan satır sayısı **1**, nedeni **"boş metin"**.
  - GB-0140 hiçbir temada sayılmaz ve "diğer" sayısına da girmez.
  - GB-0134 bir temada ya da "diğer" sayısında yer alır.

### KK-04 · Ad ya da telefon sütunu içeren ham dosya reddedilir
**Tür:** hata · **Kaynak:** K4 ("Sütunlar sabit"), K11 (başlık farklıysa dosyanın tamamı reddedilir), K3; toplantı notu (Mert: "CSV'de müşteri adı ve telefon da var")
- **Ön koşul:** Fixture: GB-0001 ile GB-0003 arası. Başlığa `ad,telefon` sütunları, her satıra da `Test Kişi,05000000000` değerleri eklenir.
- **Eylem:** Dosya yüklenir.
- **Beklenen:** Pano ve rapor oluşmaz. Ekranda dosyanın beklenen sütunlarla (`id,tarih,kanal,metin,puan,segment`) eşleşmediği yazar. `Test Kişi` ve `05000000000` sayfanın hiçbir yerinde görünmez.

### KK-05 · Başlığı farklı ya da CSV olmayan dosya reddedilir
**Tür:** hata · **Kaynak:** K4 ("tek CSV", "Sütunlar sabit"), K11
- **Ön koşul:** Dört dosya:
  - (a) `puan` sütunu silinmiş bir örnek CSV
  - (b) başlık satırı `tarih,kanal,metin,puan,segment` olan bir dosya (`id` yok; Ece'nin toplantıda saydığı beş sütun)
  - (c) örnek CSV'nin Excel'e aktarılıp `.xlsx` olarak kaydedilmiş hâli
  - (d) sütunları aynı ama sırası farklı bir başlık: `id,tarih,kanal,puan,metin,segment` (satırlar da aynı sırayla yeniden düzenlenmiş)
- **Eylem:** Her dosya ayrı ayrı yüklenir.
- **Beklenen:** Dört dosyada da dosyanın tamamı reddedilir. Pano ve rapor oluşmaz, ekranda dosyanın reddedildiği yazar. Bu durum satır atlamadan farklıdır: hiçbir satır "atlanan" olarak sayılmaz. Önceden yüklenmiş geçerli bir dosya varsa onun panosu ya değişmeden kalır ya da temizlenir. Yarım ya da karışık bir pano kalmaz.

> Geçerli başlıklı dosyadaki bozuk satırlar KK-27'de. K11'in saymadığı bozukluk türleri E16'da açık.

---

## 2. Tema eşleştirme

### KK-06 · Temalar yalnızca sözlükten gelir
**Tür:** başarı · **Kaynak:** K6
- **Ön koşul:** PM'in onayladığı `data/temalar.json` dosyası mevcut. Örnek CSV yüklü.
- **Eylem:** Panodaki tema adları `temalar.json` içindeki tema adlarıyla karşılaştırılır.
- **Beklenen:** Panodaki her tema adı ya `temalar.json`'da birebir geçer ya da "diğer" olur. Sözlükte bulunmayan, veriden türetilmiş bir tema adı görünmez.

### KK-07 · Birden çok temaya giren kayıt her temada sayılır
**Tür:** sınır · **Kaynak:** K6, K1
- **Ön koşul:** Sözlükte, GB-0105'in metnindeki "iptal ücreti", "bildirimler" ve "ödeme" ifadelerinin her birini kapsayan ayrı birer tema var. Örnek CSV yüklü.
- **Eylem:** Bu üç temanın üyelikleri incelenir.
- **Beklenen:** GB-0105 üç temada da bulunur. Her temanın kayıt sayısına 1 olarak, ortalama puanına `2` olarak katılır. "Diğer" sayısına girmez.

### KK-08 · "Diğer" puanlanmaz, sıralamaya girmez, en altta yalnız sayısıyla görünür
**Tür:** sınır · **Kaynak:** K6, K13
- **Ön koşul:** Fixture: GB-0030 ile birlikte, sözlükteki hiçbir ifadeyi içermeyen iki sentetik satır:
  ```
  GB-0901,2026-10-05,anket,qwerty,1,duzenli
  GB-0902,2026-10-05,anket,asdf,1,duzenli
  ```
- **Eylem:** Fixture yüklenir, ardından rapor indirilir.
- **Beklenen:**
  - Sıralamadaki tek tema GB-0030'un temasıdır. Puanı 1 × 5 × 1 = **5.0** (GB-0030, 2026-09-22…2026-10-05 penceresinin dışında).
  - "Diğer" panonun en altında yalnızca **2** sayısıyla görünür. Puanı, ortalaması ve sıra numarası yoktur. Puanlansaydı 2 × 5 × 2 = 20.0 ile en üste çıkardı.
  - Raporda "diğer" geçmez.
  - Hiçbir kayıt kaybolmaz: temalardaki 1 kayıt ile "diğer"deki 2 kaydın toplamı dosyadaki 3 satıra eşittir. Örnek dosya için aynı denge KK-01'de.

### KK-09 · Türkçe karaktersiz yazılmış kayıt, karakterli eşiyle aynı temaya girer
**Tür:** sınır · **Kaynak:** K6 (kayıt temada sayılır), K1 ("kaç kayıt"); CSV
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** Her çiftin tema kümeleri karşılaştırılır.
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
**Tür:** sınır · **Kaynak:** K6, K18; CSV
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** GB-0013 (`İptal ücretini kaldırın…`, büyük noktalı İ), GB-0100 (`Iptal ucretinin iadesi…`, büyük noktasız I) ve GB-0034 (`iptal ücretini kaldırın…`, küçük i) kayıtlarının temaları incelenir.
- **Beklenen:** Üç kaydın iptal ücreti temasını içeren tema kümesi aynıdır. GB-0100, GB-0077 (`iptal ücretinin iadesi için üç kez yazdım.`) ile aynı temalardadır. Sonuç Chrome, Safari ve Edge'de aynıdır (KK-37).

### KK-11 · İngilizce yorum, Türkçe eşiyle aynı temaya girer
**Tür:** sınır · **Kaynak:** K8; Slack (Selin: "İngilizce yorumlar var … onlar da sayılsın")
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** İngilizce kayıtların temaları incelenir.
- **Beklenen:**
  - GB-0137 (`I was charged a cancellation fee nobody told me about.`), GB-0007 (`İptal ücreti olduğunu ödeme sayfasında görmedim…`) ile aynı iptal ücreti temasındadır.
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

Formül (K1, K9): **Puan = kayıt sayısı × (6 − temanın ortalama puanı) × (pay + 1)**. Pay, temanın kayıtlarından son 14 güne düşenlerin, temanın kendi kayıt sayısına oranıdır.

### KK-13 · Yeni kaydı olmayan bir temanın puanı
**Tür:** başarı · **Kaynak:** K1, K9, K12
- **Ön koşul:** Fixture: GB-0030 (2026-09-14, puan 1), GB-0133 (2026-08-25, puan 3), GB-0134 (2026-10-05, puan 3). GB-0030 ve GB-0133 aynı şikâyeti dile getiriyor ("2 saat önce iptal ettim yine de ücret aldınız") ve aynı temaya (T) giriyor. GB-0134 T'de değil.
- **Eylem:** Fixture yüklenir.
- **Beklenen:** Dosyadaki en yeni tarih 2026-10-05 (GB-0134), dolayısıyla pencere 2026-09-22…2026-10-05. T için:
  - kayıt sayısı = **2**
  - ortalama puan = (1 + 3) / 2 = **2**
  - mutsuzluk = 6 − 2 = **4**
  - pay = pencereye düşen 0 kayıt / 2 = **0**, yenilik = **1**
  - puan = 2 × 4 × 1 = 8, panoda **`8.0`** olarak görünür

### KK-14 · Kanal puanı değiştirmez
**Tür:** sınır · **Kaynak:** K2
- **Ön koşul:** KK-13 fixture'ı. GB-0030'un kanalı `destek` yerine `magaza`, GB-0133'ün kanalı `magaza` yerine `anket` yapılır.
- **Eylem:** Değiştirilmiş fixture yüklenir.
- **Beklenen:** T'nin puanı yine **8.0**. Panoda kanal ağırlığı ayarı yoktur (K2: ayar ikinci sürümde konuşulacak).

### KK-15 · Segment puanı değiştirmez
**Tür:** sınır · **Kaynak:** K1 ("'Yeni' segmenti formüle girmez")
- **Ön koşul:** KK-13 fixture'ı. GB-0030'un segmenti `duzenli` yerine `yeni`, GB-0133'ünki `yeni` yerine `kurumsal` yapılır.
- **Eylem:** Değiştirilmiş fixture yüklenir.
- **Beklenen:** T'nin puanı yine **8.0**.

---

## 4. Pano

### KK-16 · Temalar puana göre büyükten küçüğe sıralanır
**Tür:** başarı · **Kaynak:** K1, K12, K13, K14; toplantı notu (Deniz: "hangisinin öncelikli olduğunu göreyim")
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** Panodaki tema sırası, her temanın panoda yazan puanıyla karşılaştırılır.
- **Beklenen:** Her temanın puanı, kendisinden sonra gelen temanın puanından büyük ya da ona eşittir. Eşit puanlar K14'e göre sıralanır (KK-32). "Diğer" sıralamanın dışında ve en alttadır (KK-08). Tam örnek dosya için beklenen sıra KK-40'ta.

### KK-17 · Sıralama elle sabitlenmez; sonuç formülden çıkar
**Tür:** sınır · **Kaynak:** K1, K9; Deniz'in ek notu ("Selin'in beklentisi … kabul kriteri değildir")
- **Ön koşul:** Fixture: GB-0006 (10-03, puan 1), GB-0051 (10-01, puan 1), GB-0057 (10-04, puan 1) ve GB-0030 (09-14, puan 1). İlk üç kayıt aynı bildirim temasına (B) giriyor. GB-0030 iptal temasında (İ) ve B'de değil.
- **Eylem:** Fixture yüklenir.
- **Beklenen:** En yeni tarih 2026-10-04, pencere 2026-09-21…2026-10-04.
  - B: 3 kayıt, ortalama 1, mutsuzluk 5, pay 3/3, yenilik 2. Puan 3 × 5 × 2 = **30.0**.
  - İ: 1 kayıt, ortalama 1, mutsuzluk 5, pay 0/1, yenilik 1. Puan 1 × 5 × 1 = **5.0**.
  - B, İ'nin üstünde görünür. Kodda belirli bir temayı (ör. "iptal ücreti") öne alan bir kural yoktur.

---

## 5. Rapor

### KK-18 · Rapor, panodaki ilk 5 temayla indirilebilir markdown dosyasıdır
**Tür:** başarı · **Kaynak:** K7, K13, K16; toplantı notu (Deniz: "markdown olsun ki Confluence'a yapıştırayım")
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** Rapor indirilir.
- **Beklenen:**
  - `radar-raporu-YYYY-AA-GG.md` adlı düz metin bir dosya iner (KK-35).
  - Dosyada panodaki ilk 5 tema, panodaki sırayla yer alır. 6. ve sonraki temalar raporda geçmez.
  - "Diğer" raporda hiç geçmez ve ilk 5'e sayılmaz.
  - Tam örnek dosya için beklenen temalar ve alıntılar KK-40'ta.

### KK-19 · Her tema için en yeni 3 kaydın metni birebir alıntılanır
**Tür:** başarı · **Kaynak:** K7, K14, K16; toplantı notu (Deniz: "iki üç gerçek alıntı")
- **Ön koşul:** Fixture: GB-0003 (09-20), GB-0051 (10-01), GB-0006 (10-03), GB-0057 (10-04). Dört kayıt aynı bildirim temasında.
- **Eylem:** Rapor indirilir.
- **Beklenen:**
  - Bu temanın altında tam 3 alıntı vardır ve sırası en yeniden eskiye doğrudur: GB-0057, GB-0006, GB-0051. GB-0003 geçmez.
  - Her alıntının yanında tarihi, kanalı ve `id`'si yazar (KK-35).
  - Alıntı metinleri CSV'deki `metin` ile karakteri karakterine aynıdır. GB-0057 için metin `Bildirim yine gecikti 😡` olmalıdır. Kısaltma, çeviri ya da düzeltme yapılmaz. Tek istisna telefon ve e-posta maskelemesidir (KK-24, KK-25, KK-34).

### KK-20 · 3'ten az kaydı olan temada uydurma ya da boş alıntı olmaz
**Tür:** sınır · **Kaynak:** K7, K16
- **Ön koşul:** KK-13 fixture'ı (T'de 2 kayıt).
- **Eylem:** Rapor indirilir.
- **Beklenen:** T'nin altında tam 2 alıntı vardır, sırası GB-0030, GB-0133. Üçüncü bir alıntı, boş madde ya da "alıntı yok" satırı bulunmaz.

### KK-21 · 5'ten az tema varsa rapor olanları gösterir
**Tür:** sınır · **Kaynak:** K7
- **Ön koşul:** KK-17 fixture'ı (2 tema).
- **Eylem:** Rapor indirilir.
- **Beklenen:** Raporda iki tema panodaki sırayla yer alır: önce B, sonra İ. Boş tema başlığı ya da doldurma satırı yoktur.

---

## 6. Gizlilik

### KK-22 · Dosya tarayıcıdan dışarı gönderilmez
**Tür:** başarı · **Kaynak:** K3, K17, K18; toplantı notu (Deniz: "Sunucu kurmak istemiyoruz"; Mert: "bir yere gitmediğinden emin olalım")
- **Ön koşul:** Tarayıcının geliştirici araçlarında ağ sekmesi açık ve kayıtları koruma seçeneği işaretli: Chrome ve Edge'de DevTools > Network, "Preserve log"; Safari'de Web Inspector > Ağ. Kriter K18'deki üç tarayıcıda ayrı ayrı koşulur.
- **Eylem:** Radar açılır, örnek CSV yüklenir, pano incelenir, rapor indirilir.
- **Beklenen:** Sayfa yüklenirken yapılan isteklerin hepsi Radar'ın kendi adresine gider. Başka alan adına (CDN, analitik, font, API) **0** istek yapılır. Dosya seçildikten sonra, rapor indirmesi dahil, hiçbir ağ isteği yapılmaz. Radar'ın kendi adresinden yüklenen dosyalar arasında da dış kütüphane bulunmaz (KK-36).

### KK-23 · Radar ağ bağlantısı olmadan çalışır
**Tür:** sınır · **Kaynak:** K3, K17
- **Ön koşul:** Radar açıldıktan sonra ağ bağlantısı kesilir. Chrome ve Edge'de DevTools > Network > "Offline" seçilir. Safari'de bağlantı işletim sisteminden kesilir.
- **Eylem:** Örnek CSV yüklenir, rapor indirilir.
- **Beklenen:** KK-01, KK-18 ve KK-40 çevrimiçi hâldeki sonuçlarla birebir aynı çıkar. Konsolda ağ hatası görünmez.

### KK-24 · Metindeki telefon numarası panoda ve raporda maskelenir
**Tür:** başarı · **Kaynak:** K3, K15; Slack (Ece: "metinlerin içinde telefon geçen birkaç kayıt var")
- **Ön koşul:** Fixture: GB-0084, GB-0120. GB-0084 iptal temasına, GB-0120 ödeme temasına giriyor.
- **Eylem:** Pano açılır, rapor indirilir.
- **Beklenen:**
  - GB-0084, metnin göründüğü her yerde ve raporda `İptal ücreti kesildi, beni arayın **** *** ** 34` olarak görünür.
  - Şu dizgiler hiçbir yerde bulunmaz: panoda Ctrl+F ile, DevTools/Web Inspector Elements aramasında ve indirilen `.md` dosyasında `0532`, `0532 555 12 34`, `555 12`, `987 65`.
  - Maskeleme tema eşleşmesini ve puanı değiştirmez. GB-0084 yine kendi temasında sayılır ve puanı `1` olarak ortalamaya girer.

### KK-25 · +90 ile başlayan numara da aynı kuralla maskelenir
**Tür:** sınır · **Kaynak:** K3, K15
- **Ön koşul:** KK-24 fixture'ı.
- **Eylem:** GB-0120 (`Ödeme sorunu var, numaram +90 555 987 65 43`) panoda ve raporda incelenir.
- **Beklenen:** Metin `Ödeme sorunu var, numaram +** *** *** ** 43` olarak görünür. `+` işareti ve boşluklar yerinde kalır, son iki hane dışındaki 10 rakam `*` olur. `987 65` ve `9876543` dizgileri hiçbir yerde görünmez.

### KK-26 · Telefon olmayan sayılar ve "telefon" kelimesi maskelenmez
**Tür:** sınır · **Kaynak:** K3, K15 (yalnızca 0 ya da +90 ile başlayan 10-12 haneli numaralar), K7 (gerçek alıntı)
- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** Aşağıdaki kayıtlar panoda (ve rapora girdilerse raporda) incelenir.
- **Beklenen:** Şu ifadeler CSV'deki hâliyle, `*` olmadan görünür: GB-0041 `50 TL`, GB-0098 `400 TL`, GB-0064 `75 TL`, GB-0056 `5.2 sürümünden`, GB-0051 `20 dakika`, GB-0015 `3D Secure`, GB-0030 `2 saat`. GB-0126'nın metni (`Telefon numarası restoranın değil başka bir yerin.`) hiç değişmeden görünür.

---

## 7. 8 Ekim kararlarından gelen kriterler

### KK-27 · Bozuk satırlar atlanır; dosya reddedilmez, neden yazılır
**Tür:** hata · **Kaynak:** K11, K4 (puan 1-5)
- **Ön koşul:** KK-13 fixture'ının (GB-0030, GB-0133, GB-0134) sonuna şu beş bozuk satır eklenir:
  ```
  GB-0057,2026-10-04,magaza,Bildirim yine gecikti 😡,0,yeni
  GB-0006,2026-10-03,magaza,Onay bildirimi rezervasyon saatinden sonra geldi.,10,duzenli
  GB-0051,2026-10-01,magaza,"Masanız hazır bildirimi 20 dakika geç geldi, kapıda bekledik.",1
  GB-0088,2026-02-30,magaza,Telefonu yeniden başlatınca birikmiş bildirimler birden geldi.,2,duzenli
  GB-0080,2026-09-25,twitter,Table ready notification arrived way too late.,1,yeni
  ```
  Satırlar sırasıyla şu hataları taşır: 1-5 dışında puan (`0`), anketin dönüştürülmemiş 0-10 puanı (`10`), eksik alan (`segment` yok), geçersiz tarih (30 Şubat), bilinmeyen kanal (`twitter`).
- **Eylem:** Dosya yüklenir.
- **Beklenen:**
  - Dosya reddedilmez, pano açılır.
  - Atlanan satır sayısı **5**. Her satırın atlanma nedeni panoda yazar: 2 satır puan, 1 satır eksik alan, 1 satır tarih, 1 satır kanal nedeniyle. Neden metinlerinin tam ifadesi E15'te.
  - Atlanan satırların hiçbiri bir temaya ya da "diğer"e girmez. Panoda bildirim teması görünmez.
  - T'nin puanı yine **8.0** ve GB-0134 normal şekilde sayılır.

### KK-28 · Tekrar eden kayıt bir kez sayılır; dosyalar birleştirilmez
**Tür:** sınır · **Kaynak:** K10
- **Ön koşul:** KK-13 fixture'ının sonuna, GB-0030'un yalnızca `id`'si değiştirilmiş kopyası eklenir:
  ```
  GB-0901,2026-09-14,destek,"2 saat önce iptal ettim yine de ücret aldınız, bu nasıl kural?",1,duzenli
  ```
- **Eylem:**
  - (a) Dosya yüklenir.
  - (b) Örnek CSV yüklenir.
  - (c) Örnek CSV yüklüyken KK-13 fixture'ı yüklenir.
- **Beklenen:**
  - (a) T'nin kayıt sayısı **2**, ortalaması **2**, puanı **8.0**. Tekrar iki kez sayılsaydı sonuç 3 kayıt, ortalama 5/3 ve puan 13.0 olurdu.
  - (b) GB-0011 ile GB-0150 (bütün alanları aynı, yalnızca `id` farklı) tek kayıt sayılır. Bu iki kaydın kümesi KK-40'ta 11 değil **10** kayıttır. GB-0139 (`Her açılışta yeniden giriş istiyor`) GB-0011 ile aynı değildir: büyük harf, nokta, tarih ve puan farklı. Bu yüzden ayrı kayıt olarak sayılır.
  - (c) Pano yalnızca ikinci dosyayı gösterir: T = 8.0, ilk dosyadan hiçbir sayı kalmaz. Dosya seçicide aynı anda birden çok dosya seçilemez.
  - Tekrar kopyasının atlanan sayısına yazılıp yazılmayacağı ve hangi kopyanın tutulacağı E15'e bağlıdır.

### KK-29 · Aynı `id` ikinci kez gelirse ikinci satır atlanır
**Tür:** sınır · **Kaynak:** K10, K11
- **Ön koşul:** İçeriği GB-0057'ninki, `id`'si `GB-0030` olan bir satır:
  ```
  GB-0030,2026-10-04,magaza,Bildirim yine gecikti 😡,1,yeni
  ```
  - (a) Bu satır KK-13 fixture'ının **sonuna** eklenir.
  - (b) Bu satır KK-13 fixture'ının **başına**, gerçek GB-0030'un önüne eklenir.
- **Eylem:** İki dosya ayrı ayrı yüklenir.
- **Beklenen:**
  - (a) Bildirim satırı atlanır. Atlanan sayısı 1'dir ve tekrarlanan `id` gerekçesiyle bir neden yazar. Bildirim teması görünmez. T = **8.0**.
  - (b) Dosyada ikinci sırada gelen satır gerçek GB-0030 olduğu için atlanan odur. T'de yalnızca GB-0133 kalır: 1 × 3 × 1 = **3.0**. Bildirim satırı kendi temasında sayılır: 1 × 5 × 2 = **10.0**, ve T'nin üstünde görünür.

### KK-30 · Son 14 gün dosyadaki en yeni tarihe göre; pay temanın kendi kayıtları üzerinden
**Tür:** sınır · **Kaynak:** K9
- **Ön koşul:** Fixture: GB-0003 (09-20, puan 2), GB-0089 (09-21, 2), GB-0143 (09-22, 1), GB-0088 (10-05, 2), GB-0077 (10-05, 3). İlk dört kayıt aynı bildirim temasında (B). GB-0077 iptal temasında (İ) ve B'de değil.
- **Eylem:** Fixture yüklenir. Aynı fixture farklı bir günde yeniden yüklenir.
- **Beklenen:** En yeni tarih 2026-10-05, pencere 2026-09-22…2026-10-05.
  - B: kayıt sayısı 4, ortalama 7/4 = 1.75, mutsuzluk 4.25. Pencereye düşenler GB-0143 (sınırdaki 14. gün, içeride) ve GB-0088. GB-0089 (15. gün) ve GB-0003 dışarıda kalır. Pay 2/4 = 0.5, yenilik 1.5. Puan 4 × 4.25 × 1.5 = **25.5**.
  - İ: 1 kayıt, ortalama 3, mutsuzluk 3, pay 1/1, yenilik 2. Puan **6.0**.
  - Sonuç yükleme gününden bağımsızdır. Pencere yükleme gününe göre kurulsaydı, örneğin 8 Ekim'de B 21.25 çıkardı.
  - Pay, son 14 gündeki bütün kayıtlara bölünseydi sonuç B ≈ 28.3, İ = 4.0 olurdu. Bu yanlıştır.
  - Pencere 09-21'i de kapsasaydı B 29.75 olurdu. Doğru okunuş E14'te teyit edilecek.

### KK-31 · Panoda tema başına ad, puan, kayıt sayısı ve ortalama; üstte okunan ve atlanan sayıları
**Tür:** başarı · **Kaynak:** K12, K13
- **Ön koşul:** Fixture: KK-13 fixture'ı ile GB-0140.
- **Eylem:** Pano incelenir.
- **Beklenen:**
  - Panonun üstünde okunan ve atlanan satır sayıları görünür. Atlanan **1**, nedeni "boş metin". Okunan değerinin 4 mü 3 mü olacağı E15'e bağlı.
  - Her tema satırında tema adı, puan, kayıt sayısı ve ortalama puan görünür. T için puan `8.0`, kayıt sayısı `2`, ortalama `2`.
  - Puan her zaman tek ondalıkla yazılır: `8` değil `8.0`, `161.355` değil `161.4`.
  - "Diğer" satırında yalnızca sayı görünür (KK-08).

### KK-32 · Eşit puanlı temalarda önce kayıt sayısı, sonra tema adı belirler
**Tür:** sınır · **Kaynak:** K14
- **Ön koşul:**
  - (a) Fixture: GB-0042 (08-25, puan 1), GB-0112 (08-27, puan 1), GB-0030 (09-14, puan 1). GB-0042 ve GB-0112 aynı ödeme temasında (Ö). GB-0030 İ'de ve Ö'de değil.
  - (b) Fixture: GB-0042 (08-25, 1), GB-0112 (08-27, 1), GB-0098 (08-28, 1), GB-0117 (08-31, 1). GB-0098 ve GB-0117 İ'de ve Ö'de değil.
- **Eylem:** İki fixture ayrı ayrı yüklenir.
- **Beklenen:**
  - (a) Pencere 2026-09-01…2026-09-14.
    - Ö: 2 kayıt, ortalama 1, pay 0/2. Puan 2 × 5 × 1 = **10.0**.
    - İ: 1 kayıt, ortalama 1, pay 1/1. Puan 1 × 5 × 2 = **10.0**.
    - Puanlar eşit. Ö'nün kaydı daha fazla olduğu için Ö üstte.
  - (b) Pencere 2026-08-18…2026-08-31, dört kaydın hepsi pencerede.
    - Ö: 2 × 5 × 2 = **20.0**. İ: 2 × 5 × 2 = **20.0**.
    - Puan ve kayıt sayısı eşit. Bu durumda `temalar.json`'daki adı alfabetik olarak önce gelen tema üstte olur. Türkçe harflerin hangi sırayla dizileceği E18'de açık.

### KK-33 · Tarihi eşit alıntılarda `id`'si küçük olan önce gelir
**Tür:** sınır · **Kaynak:** K14, K7
- **Ön koşul:** Fixture, satırlar şu sırayla: GB-0065 (10-01), GB-0057 (10-04), GB-0051 (10-01), GB-0045 (10-01). Dört kayıt aynı bildirim temasında.
- **Eylem:** Rapor indirilir.
- **Beklenen:** Temanın alıntıları sırasıyla GB-0057, GB-0045, GB-0051. GB-0065 raporda yoktur. Seçim dosyadaki satır sırasına bağlı değildir.

### KK-34 · Bitişik numara ve e-posta maskelenir, isim maskelenmez
**Tür:** sınır · **Kaynak:** K3, K15
- **Ön koşul:** KK-24 fixture'ına (GB-0084, GB-0120) şu sentetik satırlar eklenir:
  ```
  GB-0901,2026-10-05,destek,"İptal ücreti kesildi, beni arayın 05325551234",1,duzenli
  GB-0902,2026-10-05,destek,"Ödeme sorunu var, numaram +905559876543",2,yeni
  GB-0903,2026-10-05,destek,İptal ücreti için ayse.yilmaz@ornek.com adresine yazın,2,yeni
  GB-0904,2026-10-05,destek,"Ödeme sorunu, Ayşe Yılmaz adına kayıtlı kart",2,yeni
  ```
- **Eylem:** Pano açılır, rapor indirilir. Her temada en çok 3 kayıt olduğu için hepsi raporda alıntılanır.
- **Beklenen:**
  - GB-0901: `İptal ücreti kesildi, beni arayın *********34` (11 haneden son 2'si açık).
  - GB-0902: `Ödeme sorunu var, numaram +**********43` (12 haneden son 2'si açık, `+` yerinde).
  - GB-0903: `İptal ücreti için a***@ornek.com adresine yazın`.
  - GB-0904 değişmeden görünür: `Ayşe Yılmaz` maskelenmez (K15).
  - `5325551234`, `5559876543` ve `ayse.yilmaz` dizgileri panoda, DOM'da ve `.md` dosyasında bulunmaz.
  - Maskeleme tema eşleşmesini ve puanları değiştirmez.

### KK-35 · Rapor biçimi
**Tür:** başarı · **Kaynak:** K16
- **Ön koşul:** KK-13 fixture'ı.
- **Eylem:** Rapor indirilir.
- **Beklenen:**
  - Dosya adı `radar-raporu-YYYY-AA-GG.md` kalıbına uyar, ör. `radar-raporu-2026-10-16.md`. Hangi tarihin yazılacağı E20'de açık.
  - T'nin bölümünde tema adı başlık olarak yazar, ardından puan `8.0`, kayıt sayısı `2`, ortalama puan `2` gelir. Bu değerler panodakilerle aynıdır.
  - T'nin alıntıları:
    - GB-0030'un metni, yanında `2026-09-14`, `destek`, `GB-0030`
    - GB-0133'ün metni, yanında `2026-08-25`, `magaza`, `GB-0133`
  - Alıntı metinleri maskelidir (KK-24, KK-34).

### KK-36 · Hiçbir dış kütüphane kullanılmaz
**Tür:** başarı · **Kaynak:** K17, K3
- **Ön koşul:** Teslim edilen Radar dosyaları (HTML, JS, CSS ve varsa `data/temalar.json`).
- **Eylem:** Dosyalar listelenir ve içerikleri taranır.
- **Beklenen:**
  - Her dosya Radar için yazılmıştır. Üçüncü taraf kütüphane kopyası (ör. PapaParse, Lodash, Chart.js, React), minify edilmiş paket ya da `@license` / `MIT License` başlıklı dış kod bulunmaz.
  - HTML yalnızca Radar'ın kendi dosyalarını yükler.
  - `package.json` varsa çalışma zamanı bağımlılığı (`dependencies`) yoktur.
  - CSV ayrıştırma da Radar'ın kendi kodudur ve KK-02 bu kodla geçer.
  - Yalnızca geliştirmede kullanılan test araçlarının durumu E22'de açık.

### KK-37 · Chrome, Safari ve Edge'in güncel sürümlerinde aynı sonuç
**Tür:** başarı · **Kaynak:** K18
- **Ön koşul:** Test günü itibarıyla Chrome, Safari ve Edge'in en son kararlı sürümleri. Sürüm numaraları test kaydına yazılır.
- **Eylem:** KK-01…KK-40 her tarayıcıda koşulur.
- **Beklenen:** Her kriter üç tarayıcıda da geçer. Tema sırası, puanlar, maskeler, emoji (KK-02), İ/I eşleşmesi (KK-10) ve rapor dosyası birebir aynıdır.

### KK-38 · 5.000 satırlık dosyada pano 2 saniyenin altında açılır
**Tür:** başarı · **Kaynak:** K19
- **Ön koşul:** Örnek CSV'nin 150 veri satırı art arda kopyalanarak 5.000 satırlık bir dosya üretilir: 33 tam kopya ile ilk 50 satır.
  - `id`'ler GB-0001…GB-5000 olarak yeniden numaralanır.
  - Her kopyanın tarihleri kopya sırası kadar gün geriye alınır (1. kopya değişmez, 2. kopya 1 gün geri…). Böylece kopyalar K10'a göre birbirinin tekrarı sayılmaz.
- **Eylem:** Dosya seçilir. Seçim anından pano tamamen çizilene kadar geçen süre, geliştirici araçlarının Performance kaydıyla ölçülür. Ölçüm her tarayıcıda 3 kez yapılır.
- **Beklenen:** Dosya reddedilmez. Üç tarayıcıda da üç ölçümün üçü de **2 saniyenin altındadır**. Ölçümün hangi makinede yapılacağı E21'de açık.

### KK-39 · "İptal ücreti" teması yalnızca ücret, kesinti, ceza ya da para geçen iptal kayıtlarını kapsar
**Tür:** sınır · **Kaynak:** K20, K8
- **Ön koşul:** Onaylı sözlük ve örnek CSV yüklü.
- **Eylem:** Aşağıdaki kayıtların temaları incelenir.
- **Beklenen:**
  - GB-0020 ve GB-0070 (`Bildirim gecikmesi yüzünden rezervasyonum iptal oldu`) GB-0057 ile aynı bildirim temasındadır. GB-0084'ün iptal ücreti temasında **değildir**.
  - Şu kayıtlar GB-0084 ile aynı iptal ücreti temasındadır:
    - GB-0030 (ücret)
    - GB-0096 (kesinti)
    - GB-0052 ve GB-0103 (ceza)
    - GB-0094 (para)
    - GB-0064 (`75 TL`)
    - GB-0137 (`cancellation fee`, K8)
  - GB-0131 ve GB-0149 (`İptal politikasını uygulamada bulamadım`) ücret, kesinti, ceza ya da para içermediği için iptal ücreti temasında değildir.
  - GB-0075 ve GB-0123 (`Ücretsiz iptal süresi ne kadar?`) için kriter yazılmadı (E1).

### KK-40 · Tam örnek dosyada temaların sırası formülden çıkan sıradır
**Tür:** başarı · **Kaynak:** K1, K6, K9, K10, K11, K13, K14, K20; Deniz'in ek notu
- **Ön koşul:** Örnek CSV yüklü. Onaylı sözlük, kayıtları Tablo 40-A'daki kümelere ayırıyor. Tema adları henüz olmadığı için kümeler harfle ve örnek kayıtlarla tanımlandı. "Konu" sütunu yalnızca okumayı kolaylaştırır, tema adı değildir.
- **Eylem:** Panodaki sıra, puanlar ve kayıt sayıları Tablo 40-B ile karşılaştırılır. Rapor indirilir.

**Tablo 40-A: Kümeler**

| Küme | Konu | Kayıtlar |
|---|---|---|
| A | iptalde ücret, kesinti, ceza ya da para (K20) | GB-0005, 0007, 0013, 0021, 0030, 0034, 0041, 0048, 0052, 0058, 0064, 0077, 0084, 0093, 0094, 0096, 0098, 0100, 0103, 0105, 0106, 0117, 0128, 0129, 0130, 0132, 0133, 0135, 0137, 0141, 0146 (31) |
| B | bildirimin geç gelmesi ya da hiç gelmemesi (K20 gereği GB-0020 ve GB-0070 dahil) | GB-0003, 0006, 0009, 0020, 0024, 0031, 0040, 0045, 0051, 0053, 0056, 0057, 0059, 0061, 0065, 0070, 0071, 0080, 0083, 0085, 0088, 0089, 0095, 0101, 0105, 0111, 0142, 0143, 0144 (29) |
| C | ödeme | GB-0008, 0010, 0015, 0026, 0028, 0042, 0055, 0068, 0076, 0082, 0086, 0092, 0102, 0105, 0112, 0120, 0121 (17) |
| D | giriş, şifre, kayıt | GB-0011, 0046, 0050, 0066, 0069, 0081, 0099, 0108, 0109, 0139 (10). GB-0150, GB-0011'in tekrarıdır ve ayrıca sayılmaz (K10). |
| E | sadakat puanı | GB-0017, 0033, 0047, 0063, 0090 (5) |
| F | restoran bilgisi yanlış ya da eski | GB-0004, 0012, 0022, 0043, 0060, 0072, 0078, 0104, 0110, 0126, 0136, 0147 (12) |
| G | masa ve oturma tercihi istekleri | GB-0018, 0027, 0035, 0038, 0067, 0073, 0097, 0113, 0114, 0118, 0122, 0134, 0138, 0148 (14) |
| diğer | olumlu yorumlar (24) ve sınır kayıtlar (8) | Olumlu: GB-0002, 0014, 0016, 0019, 0023, 0025, 0029, 0032, 0036, 0037, 0039, 0044, 0049, 0054, 0062, 0074, 0079, 0087, 0091, 0115, 0116, 0119, 0125, 0145. Sınır: GB-0001, 0075, 0107, 0123, 0124, 0127, 0131, 0149 (toplam 32) |
| atlanan | boş metin | GB-0140 |

GB-0105 A, B ve C'nin üçünde de sayılır (KK-07). Kontrol: A∪B∪C'de 75 farklı kayıt, D+E+F+G'de 41, "diğer"de 32 kayıt var. Bunlara GB-0140 ve GB-0150 eklenince toplam 150 eder.

**Tablo 40-B: Hesap.** En yeni tarih 2026-10-05 (GB-0077, 0088, 0116, 0134, 0146), dolayısıyla pencere 2026-09-22…2026-10-05.

| Sıra | Küme | Kayıt | Puan toplamı | Ortalama | Mutsuzluk | Son 14 gündeki kayıtlar | Pay | Yenilik | Puan (tam) | Panoda |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | B | 29 | 46 (12×1 + 17×2) | 46/29 ≈ 1.586 | 128/29 ≈ 4.414 | 23. Pencere dışında kalan 6 kayıt: GB-0003, 0024, 0031, 0040, 0085 (09-20/21) ve 0089 (09-21) | 23/29 ≈ 0.793 | 52/29 ≈ 1.793 | 128 × 52 / 29 = 6656/29 ≈ 229.517 | **229.5** |
| 2 | A | 31 | 64 (10×1 + 9×2 + 12×3) | 64/31 ≈ 2.065 | 122/31 ≈ 3.935 | 10: GB-0013, 0052, 0077, 0084, 0105, 0129, 0130, 0135, 0137, 0146 | 10/31 ≈ 0.323 | 41/31 ≈ 1.323 | 122 × 41 / 31 = 5002/31 ≈ 161.355 | **161.4** |
| 3 | C | 17 | 33 (5×1 + 8×2 + 4×3) | 33/17 ≈ 1.941 | 69/17 ≈ 4.059 | 7: GB-0015, 0028, 0076, 0086, 0092, 0105, 0120 | 7/17 ≈ 0.412 | 24/17 ≈ 1.412 | 69 × 24 / 17 = 1656/17 ≈ 97.412 | **97.4** |
| 4 | D | 10 | 22 (3×1 + 2×2 + 5×3) | 2.2 | 3.8 | 2: GB-0099, 0108 | 0.2 | 1.2 | 10 × 3.8 × 1.2 = 45.6 | **45.6** |
| 5 | G | 14 | 46 (10×3 + 4×4) | 23/7 ≈ 3.286 | 19/7 ≈ 2.714 | 2: GB-0035, 0134 | 1/7 ≈ 0.143 | 8/7 ≈ 1.143 | 14 × 19/7 × 8/7 = 2128/49 ≈ 43.429 | **43.4** |
| 6 | F | 12 | 37 (4×2 + 3×3 + 5×4) | 37/12 ≈ 3.083 | 35/12 ≈ 2.917 | 2: GB-0004, 0072 | 1/6 ≈ 0.167 | 7/6 ≈ 1.167 | 35 × 7 / 6 = 245/6 ≈ 40.833 | **40.8** |
| 7 | E | 5 | 20 (2×3 + 1×4 + 2×5) | 4.0 | 2.0 | 0 | 0 | 1 | 5 × 2 × 1 = 10 | **10.0** |
| — | diğer | 32 | — | — | — | — | — | — | puanlanmaz | en altta, yalnızca **32** |

- **Beklenen:**
  - Panoda temalar yukarıdan aşağı B, A, C, D, G, F, E sırasıyla görünür.
    - Puanlar: 229.5, 161.4, 97.4, 45.6, 43.4, 40.8, 10.0.
    - Kayıt sayıları: 29, 31, 17, 10, 14, 12, 5.
  - "Diğer" en altta, yalnızca 32 sayısıyla görünür.
  - Atlanan satır GB-0140'tır, nedeni "boş metin".
  - **Sözlüğün ayrıntısından bağımsız, bağlayıcı kısım:**
    - 1. sırada GB-0057, GB-0080 ve GB-0020'nin teması
    - 2. sırada GB-0084, GB-0030 ve GB-0137'nin teması
    - 3. sırada GB-0010, GB-0121 ve GB-0076'nın teması

    Tablo 40-C'deki sınır durumların hiçbiri bu sırayı değiştirmez.
  - 4-7. sıralar yalnızca sözlük Tablo 40-A'daki gibi kümelerse geçerlidir. D, G ve F arasındaki fark 5 puanın altında olduğundan bu sıra sözlüğe bağlıdır (E1).
  - Rapor (Tablo 40-A kümelemesiyle) beş temayı şu sırayla içerir. Alıntılar en yeniden eskiye, eşit tarihte küçük `id` önce gelir (K14):

| Sıra | Küme | Alıntılar |
|---|---|---|
| 1 | B | GB-0088 (10-05), GB-0057 (10-04), GB-0006 (10-03). GB-0105 de 10-03 tarihli ama `id`'si büyük. |
| 2 | A | GB-0077 (10-05), GB-0146 (10-05), GB-0105 (10-03) |
| 3 | C | GB-0076 (10-04), GB-0086 (10-03), GB-0105 (10-03) |
| 4 | D | GB-0099 (10-04), GB-0108 (09-26), GB-0050 (09-14) |
| 5 | G | GB-0134 (10-05), GB-0035 (09-26), GB-0138 (09-19) |

  - Sonuç Selin'in "iptal ücreti en üstte" beklentisinden farklıdır: iptal ücreti 2. sırada. Deniz'in ek notuna göre bu sonuç kabul edilir.

**Tablo 40-C: Sınır durumlar ilk üç sırayı değiştirmez**

| Değişiklik | Yeniden hesap | İlk üç |
|---|---|---|
| GB-0075 ve GB-0123 ("ücretsiz iptal") A'ya da girer | A: 33 kayıt, toplam 66, ortalama 2.0, pay 12/33. Puan 33 × 4 × 45/33 = 180.0 | B > A > C korunur |
| GB-0085 ve GB-0101 ("haber gelmiyor", "bildirim" kelimesi yok) B'ye girmez | B: 27 kayıt, toplam 43, pay 22/27. Puan 119 × 49 / 27 ≈ 216.0 | korunur |
| GB-0001, 0107 (kart), GB-0124, 0127 (kapora) ile GB-0007, 0129, 0094, 0146 (ödeme ya da para geçen iptal) C'ye de girer | C: 25 kayıt, toplam 50, ortalama 2.0, pay 9/25. Puan 4 × 34 = 136.0 | korunur |
| Pencere 09-21'i de kapsar (E14) | B: pay 25/29, puan 128 × 54 / 29 ≈ 238.3. Diğer kümelerde 09-21 tarihli kayıt yok. | korunur |
| D, F, G farklı bölünür ya da olumlu yorumlar bir temaya girer | 4-7. sıralar değişebilir | korunur |
| GB-0150 ayrıca sayılırsa (K10 ihlali) | D: 11 kayıt, toplam 24. Puan 42 × 13 / 11 ≈ 49.6 | Hata: D 10 kayıt olmalı |

---

## Kararı eksik

E2-E13, 8 Ekim kararlarıyla (K9-K19) kapandı. E1 yalnızca kısmen kapandı: K20, GB-0020'yi çözdü ama sözlüğün kendisi hâlâ yok. Kriter yazılırken kararlarda karşılığı olmayan yeni noktalar çıktı (E14-E22). Aşağıdaki durumlar için kriter **yazılmadı** ya da kriter yalnızca kısmen yazılabildi.

| # | Kriter yazmak için gereken karar | Etkilenen kriter / kanıt | Kime sorulmalı |
|---|---|---|---|
| E1 (kısmen açık) | `data/temalar.json` içeriği: tema adları, ifadeler, İngilizce karşılıklar ve temaların ne kadar ayrıntılı olacağı (giriş, şifre ve kayıt tek tema mı?). K20'nin sınırları: "**ücret**siz iptal" (GB-0075, GB-0123) iptal ücreti temasına girer mi? Ücret içermeyen iptal kayıtları (GB-0131, GB-0149) hangi temaya girer? Tema ifadesini içeren olumlu yorumlar (GB-0033 `Sadakat puanları güzel düşünülmüş`) temada sayılır mı? Sayılırsa ortalamayı yükseltir. | KK-40'ın 4-7. sıraları (45.6 / 43.4 / 40.8 birbirine yakın), KK-39. Dosya repoda yok. | Deniz (onaylar); ifade önerileri için Selin ve Mert |
| E14 | K9'daki "o gün dahil" ifadesi: pencere 14 gün mü (2026-09-22…10-05, kriterlerde varsayılan), yoksa 15 gün mü (09-21…10-05)? | KK-30 (B: 25.5 / 29.75), KK-40 (B: 229.5 / 238.3; sıra değişmiyor) | Deniz |
| E15 | "Okunan" toplam satır mı, kullanılan satır mı? K10 gereği bir kez sayılan tekrar kayıt "atlanan" sayısına girer mi, hangi kopya tutulur (ilk satır varsayımı)? Tekrarlanan `id` ve bozuk satırlar için neden metinleri nasıl yazılır? (Yalnızca "boş metin" ifadesi karara bağlı.) | KK-01, KK-27, KK-28, KK-29, KK-31 | Deniz |
| E16 | K11'in saymadığı satır sorunları: kapanmamış tırnak, fazla alan (tırnaksız virgül), bilinmeyen segment, yalnızca boşluktan oluşan metin, ondalıklı puan (`4.5`), farklı tarih biçimi (`05.10.2026`), UTF-8 BOM'lu ya da büyük harfli başlık (Excel çıktısı). Geçerli kanal listesi kararlarda yazmıyor; kriterler örnek dosyadaki `destek`, `magaza`, `anket` değerlerini esas aldı. Atlanan bir satırın tarihi "en yeni tarih" hesabına katılır mı? Bütün satırlar atlanırsa ne gösterilir? | KK-05, KK-27, KK-30 | Deniz; gerçekte hangi hataların geldiğini bilmesi için Ece |
| E17 | Sayı gösterimi: ortalama puan kaç ondalıkla gösterilir (K12 yalnızca puan için "bir ondalık" diyor)? Ondalık ayracı `8.0` mı `8,0` mı? Yuvarlama kuralı nedir? | KK-13, KK-31, KK-35, KK-40 | Deniz |
| E18 | K14'teki alfabetik sıra Türk alfabesine göre mi (Ç, Ğ, İ, Ö, Ş, Ü kendi yerinde), Unicode sırasına göre mi? Örneğin "İptal…" ile "Ödeme…" iki kurala göre ters sıralanır. | KK-32 (b) | Deniz |
| E19 | K15'in kapsamadığı telefon biçimleri: yurt dışı numaralar (`+44 …`), başında 0 olmayan 10 haneli numara (`532 555 12 34`), tire ya da parantezli yazım (`0532-555-12-34`, `(0532)`). K3 "telefon numaraları maskelenir" diyor ama K15 bu biçimleri tanımlamıyor. | KK-25, KK-34 | Mert, Deniz |
| E20 | Rapor dosya adındaki tarih: indirme günü mü, dosyadaki en yeni tarih mi? Rapor başlığı ve başlık seviyeleri ne olacak? | KK-35 | Deniz |
| E21 | K19 ölçüm koşulları: hangi makine (ekip dizüstü bilgisayarı mı?), ölçüm hangi anda başlayıp hangi anda biter? | KK-38 | Deniz, Mert |
| E22 | K17 yalnızca teslim edilen kodu mu kapsar? Teslim edilmeyen, yalnızca geliştirmede kullanılan bir test çalıştırıcı kullanılabilir mi? | KK-36 ve birim testiyle doğrulanan bütün kriterler | Mert |

**Bilinçli olarak kriter yazılmayanlar:**
- Selin'in "iptal ücreti en üstte çıkmalı" beklentisi (Deniz'in ek notu). Bunun yerine KK-17 ve KK-40 yazıldı. Formüle göre iptal ücreti 2. sırada çıkıyor.
- "Günde 14 iptal şikâyeti" sayısının tutturulması (K5).
- Platform veya sürüm analizi (K8). Bunun yerine KK-12 yazıldı.
- Kanal ağırlığı ayarı (K2, ikinci sürüm). Bunun yerine KK-14 yazıldı.

---

## E → KK eşlemesi

| E | Konu | Kapatan karar | Yeni kriter | Netleştirilen kriter | Açık kalan |
|---|---|---|---|---|---|
| E1 | Sözlük içeriği; GB-0020'nin teması | K20 (kısmen) | KK-39, KK-40 | KK-09 (K20 ile uyumlu, değişmedi) | Sözlüğün kendisi → E1 |
| E2 | "Son 14 gün"ün başlangıcı | K9 | KK-30 | KK-13 (E2/E3 çekincesi kalktı), KK-17 (tam puanlar), KK-40 | Pencere sınırı → E14 |
| E3 | Payın paydası | K9 | KK-30 | KK-13 | — |
| E4 | Tekrar kayıt, aynı `id`, dosya birleştirme | K10 | KK-28, KK-29 | KK-01, KK-08 | Sayımlarda görünüşü → E15 |
| E5 | Bozuk satır | K11 | KK-27 | KK-04 (kaynak), KK-05 ((d) eklendi; dosya ret ile satır atlama ayrıldı) | Listede olmayan türler → E16 |
| E6 | Panodaki sayılar | K12 | KK-31 | KK-01, KK-13…KK-17 (konsol şartı kalktı, `8.0` biçimi) | Ondalık ve ayraç → E17 |
| E7 | "Diğer" ve boş metin | K13 | — | KK-03 (boş metin artık "diğer"e değil atlanana gider), KK-08 ("diğer" yalnızca sayıyla, puansız), KK-18 ("diğer" raporda yok) | — |
| E8 | Eşitlik | K14 | KK-32, KK-33 | KK-16, KK-19 (alıntı sırası), KK-40 | Türkçe alfabe → E18 |
| E9 | Maske biçimi | K15 | KK-34 | KK-24 (`0532 *** ** 34` → `**** *** ** 34`), KK-25 (`+** *** *** ** 43`), KK-26 | K15 dışındaki numaralar → E19 |
| E10 | Rapor yapısı | K16 | KK-35 | KK-18 (dosya adı), KK-19 (tarih, kanal, `id`) | Dosya adındaki tarih → E20 |
| E11 | Kütüphane | K17 | KK-36 | KK-22, KK-23 | Geliştirme araçları → E22 |
| E12 | Tarayıcı | K18 | KK-37 | KK-10, KK-22, KK-23 (Safari karşılıkları) | — |
| E13 | Performans | K19 | KK-38 | — | Ölçüm koşulları → E21 |

Taslakta kararlarla çelişen üç ifade düzeltildi:
- KK-03 boş metni "diğer"e koyuyordu. K13'e göre bu satır atlanır.
- KK-08 "diğer"in altında kayıt listesi bekliyordu. K13'e göre "diğer" yalnızca sayısıyla görünür.
- KK-24'teki maske `0532 *** ** 34` idi. K15'e göre doğrusu `**** *** ** 34`.

---

Bu ortamda betik çalıştırma izni olmadığı için KK-40'taki hesaplar elle yapıldı ve iki kez kontrol edildi. Bilmen gereken iki şey var:
- **İlk üç sıra sağlam:** bildirim, iptal ücreti, ödeme. Tablo 40-C'deki sınır durumların hiçbiri bunu değiştirmiyor.
- **4. ve 5. sıra henüz kesin değil:** D, G ve F arasındaki fark 5 puanın altında ve sözlük gelmeden netleşmez. Bu yüzden E1 listede açık kaldı.

Ayrıca kriterleri yazarken kararlarda karşılığı olmayan dokuz yeni soru çıktı (E14-E22). Bunlar Deniz ve Mert'e sorulmalı.
