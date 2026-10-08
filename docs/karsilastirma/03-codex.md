# Radar: kabul kriterleri

**Kaynaklar:** `docs/kararlar.md` (K1–K20 ve Deniz’in ek notu), `docs/notlar/toplanti-notu.md` (3 Ekim), `docs/notlar/slack-dokumu.md` (4–6 Ekim) ve `data/ornek-geri-bildirim.csv` dosyasının 150 veri satırının tamamı (GB-0001…GB-0150).

**Hedef:** 16 Ekim Cuma demosu (K7). Kabul kriterleri geçtiğinde ve sonucu etkileyen açık kararlar kapatıldığında iş “bitti” sayılır.

## Nasıl okunur

- **Fixture:** “Fixture: GB-0030, GB-0133”, başlık satırı `id,tarih,kanal,metin,puan,segment` ile belirtilen kayıtların örnek CSV’den aynen kopyalandığı küçük test dosyasıdır. Değişiklik gereken testlerde değişiklik ayrıca belirtilir.
- **Satır ve kayıt sayısı:** Bu belgede “okunan satır” başlık hariç incelenen veri satırını; “işlenen kayıt” doğrulama ve tekrar kontrolünden sonra hesaplara katılan kaydı anlatır. Atlanan satırlar işlenen kayıt sayısına girmez.
- **Tema sözlüğü:** `data/temalar.json` henüz yok. K20 iptal temasının kapsamını netleştirir; diğer tema sınırları ve eşleşme ifadeleri için PM onaylı sözlük hâlâ gerekir. KK-39’daki tam dosya hesabı, üyeleri açıkça belirtilmiş bir gruplamaya dayanır; bu gruplama sözlük onayının yerine geçmez.
- **Puanlama:** Kayıt sayısı, ortalama puan ve son 14 gün payı, geçerli ve tekrarsız tema kayıtları üzerinden hesaplanır. Bir kayıt birden çok temaya girerse her temada bir kez sayılır.
- **Son 14 gün:** En yeni tarih dahil toplam 14 takvim günüdür. Örnek dosyada aralık **2026-09-22…2026-10-05**, iki uç dahil. Payın paydası temanın kendi kayıt sayısıdır.
- **Görünürlük:** K12’deki sayılar panodan doğrulanır. Ara hesaplar ve ekranda sunulmayan kayıt üyelikleri hesaplama çıktısından doğrulanabilir.
- **Sıralama:** Hesaplanan puan esas alınır; ekranda bir ondalıkla gösterilir. Selin’in belirli bir temayı ilk sırada görme beklentisi sıralama kuralı değildir.

---

## 1. Dosya yükleme

### KK-01 · Örnek dosyanın tamamı okunur, atlanan satırlar açıklanır

**Tür:** başarı · **Kaynak:** K4, K10, K11, K12, K13

- **Ön koşul:** Radar tarayıcıda açık.
- **Eylem:** `data/ornek-geri-bildirim.csv` yüklenir.
- **Beklenen:**
  - Dosya reddedilmez, pano açılır.
  - Üstte **150 okunan**, **2 atlanan** satır gösterilir; hesaplara **148 geçerli, tekrarsız kayıt** katılır.
  - GB-0140, **“boş metin”** nedeniyle atlanır.
  - GB-0011 ve GB-0150’nin `id` dışındaki bütün alanları aynı olduğu için çift yalnız bir kez sayılır; bir satırın tekrar nedeniyle atlandığı açıklanır.
  - GB-0001 hesaplara katılır. GB-0011/GB-0150 çifti iki ayrı kayıt veya iki ayrı alıntı olarak kullanılmaz.
  - Farklı `id`’li eş kayıtların hangisinin temsilci olarak tutulacağı E4’te açık kalır.

### KK-02 · Tırnak, virgül ve emoji içeren metinler bölünmeden okunur

**Tür:** sınır · **Kaynak:** K4

- **Ön koşul:** KK-01’deki yükleme.
- **Eylem:** Aşağıdaki kayıtların metni incelenir.
- **Beklenen:**
  - GB-0105 tek parça okunur: `Uygulama "harika" ama iptal ücreti, bildirimler, ödeme... hepsi sorun`. CSV’deki kaçışlı çift tırnak, metinde tek tırnak çifti olarak görünür. Virgüller yeni sütun açmaz.
  - GB-0001’in `Kayıtlı kartım silinmiş, her seferinde yeniden giriyorum.` metni tek parça okunur ve puanı `1` olarak kalır.
  - GB-0057’nin `Bildirim yine gecikti 😡` metni emojiyle birlikte görünür.

### KK-03 · Boş metinli kayıt atlanır, dosya işlenmeye devam eder

**Tür:** sınır · **Kaynak:** K11, K12, K13

- **Ön koşul:** Fixture: GB-0140 (`metin` boş), GB-0134.
- **Eylem:** Fixture yüklenir.
- **Beklenen:**
  - Dosya reddedilmez.
  - **2 satır okunur, 1 satır atlanır, 1 kayıt işlenir.**
  - Atlanan satırın nedeni **“boş metin”** olarak gösterilir.
  - GB-0140 hiçbir temanın veya “diğer”in sayısına, puanına ya da rapor alıntılarına katılmaz.
  - GB-0134 sözlüğün belirlediği temaya; eşleşme yoksa “diğer”e katılır.

### KK-04 · Ad ya da telefon sütunu içeren ham dosya reddedilir

**Tür:** hata · **Kaynak:** K3, K4, K11

- **Ön koşul:** Fixture: GB-0001…GB-0003. Başlığa `ad,telefon`, her satıra `Test Kişi,05000000000` eklenir.
- **Eylem:** Dosya yüklenir.
- **Beklenen:**
  - Bu dosyadan pano veya rapor oluşmaz.
  - Dosyanın beklenen başlıkla (`id,tarih,kanal,metin,puan,segment`) eşleşmediği gösterilir.
  - Ek sütunlardaki `Test Kişi` ve `05000000000` sayfada görünmez.

### KK-05 · Başlığı farklı ya da CSV olmayan dosya reddedilir

**Tür:** hata · **Kaynak:** K4, K11

- **Ön koşul:** Dört dosya hazırlanır:
  - (a) `puan` sütunu silinmiş örnek CSV.
  - (b) Başlığı `tarih,kanal,metin,puan,segment` olan, `id` içermeyen dosya.
  - (c) Örnek CSV’nin `.xlsx` biçiminde kaydedilmiş hâli.
  - (d) Başlığı `tarih,id,kanal,metin,puan,segment` olan, sütunları buna göre yer değiştirilmiş CSV.
- **Eylem:** Her dosya ayrı ayrı yüklenir.
- **Beklenen:**
  - Dört dosya da reddedilir; bu dosyalardan pano veya rapor oluşmaz.
  - Başlığı farklı dosyalarda beklenen başlık gösterilir.
  - Önceden yüklenmiş geçerli dosyanın panosu korunabilir veya temizlenebilir; reddedilen dosyadan kayıt eklenmiş yarım ya da karışık pano kalmaz.

Eksik alan, puan, tarih ve kanal hataları KK-29’da satır düzeyinde ele alınır. Kapanmamış CSV tırnağından toparlanma E5’te açık kalır.

---

## 2. Tema eşleştirme

### KK-06 · Temalar yalnızca onaylı sözlükten gelir

**Tür:** başarı · **Kaynak:** K6, K20

- **Ön koşul:** PM’in onayladığı `data/temalar.json` mevcut; örnek CSV yüklü.
- **Eylem:** Panodaki tema adları sözlükle karşılaştırılır.
- **Beklenen:**
  - Her tema adı sözlükte birebir bulunur. “Diğer” ayrı bir eşleşmeyen kayıt bölümüdür.
  - Veriden yeni tema adı türetilmez.
  - Sözlükteki iptal ücreti eşleşmeleri K20’ye ve KK-38’e uygundur.

### KK-07 · Birden çok temaya giren kayıt her temada sayılır

**Tür:** sınır · **Kaynak:** K1, K6, K10

- **Ön koşul:** Sözlükte GB-0105’in “iptal ücreti”, “bildirimler” ve “ödeme” ifadelerini kapsayan ayrı temalar var; örnek CSV yüklü.
- **Eylem:** Bu temaların kayıt üyelikleri ve hesapları incelenir.
- **Beklenen:**
  - GB-0105 üç temada da bulunur.
  - Her temanın kayıt sayısına **1**, puan toplamına **2** ekler.
  - Aynı temada birden fazla ifade eşleşmesi olsa da kayıt o temada bir kez sayılır.
  - “Diğer”e girmez.
  - Dosyanın işlenen kayıt sayısında bir kayıt olarak kalır; tema kayıt sayılarının toplamı bu nedenle işlenen kayıt sayısından büyük olabilir.

### KK-08 · Eşleşmeyen geçerli kayıtlar “diğer” sayısına katılır

**Tür:** sınır · **Kaynak:** K6, K10, K13

- **Ön koşul:** Geçerli, boş olmayan ve sözlükte hiçbir ifadeyle eşleşmeyen bir kayıt içeren fixture.
- **Eylem:** Dosya yüklenir, pano incelenir.
- **Beklenen:**
  - Eşleşmeyen kayıt “diğer”in sayısını **1** artırır.
  - “Diğer”, panonun en altında yalnız kayıt sayısıyla görünür; puanlanmaz ve tema sıralamasına girmez.
  - Boş metinli ve tekrar nedeniyle atlanan satırlar bu sayıya girmez.
  - Tema üyeliklerindeki benzersiz kayıtlar ile “diğer” kayıtlarının birleşimi bütün işlenen kayıtları kapsar. Örnek dosyada bu birleşim **148** kayıttır.
  - Bu kapsama kontrolü hesaplama çıktısından yapılabilir; K13, “diğer” kayıtlarının metinlerini panoda listeleme şartı getirmez.

### KK-09 · Türkçe karaktersiz kayıt, karakterli eşiyle aynı temaya girer

**Tür:** sınır · **Kaynak:** K6; örnek CSV

- **Ön koşul:** Onaylı sözlük mevcut; örnek CSV yüklü.
- **Eylem:** Her çiftin tema üyelikleri karşılaştırılır.
- **Beklenen:** Her çiftin tema kümesi aynıdır:

| Karaktersiz kayıt | Karakterli eş | Ortak konu |
|---|---|---|
| GB-0058 | GB-0041 | İptal ücreti |
| GB-0093 | GB-0021 | İptal ücreti |
| GB-0146 | GB-0094 | İptal sonrası para çekilmesi |
| GB-0111 | GB-0024 | Masa hazır mesajı |
| GB-0059 | GB-0031 | Bildirim gecikmesi |
| GB-0142 | GB-0144 | Bildirimin gelmemesi |
| GB-0076 | GB-0010 | Ödemenin iki kez çekilmesi |
| GB-0047 | GB-0017 | Sadakat puanlarının sıfırlanması |

### KK-10 · Büyük-küçük harf farkı eşleşmeyi bozmaz

**Tür:** sınır · **Kaynak:** K6; örnek CSV

- **Ön koşul:** Onaylı sözlük mevcut; örnek CSV yüklü.
- **Eylem:** GB-0013 (`İptal ücretini…`), GB-0100 (`Iptal ucretinin…`) ve GB-0034 (`iptal ücretini…`) incelenir.
- **Beklenen:**
  - Üç kayıt da aynı iptal ücreti temasına girer.
  - GB-0100, GB-0077 ile aynı ilgili tema üyeliklerine sahiptir.
  - `İ`, `I` ve `i` farkı bu eşleşmeleri engellemez.

### KK-11 · İngilizce yorum, Türkçe eşiyle aynı temaya girer

**Tür:** sınır · **Kaynak:** K8

- **Ön koşul:** Onaylı sözlük mevcut; örnek CSV yüklü.
- **Eylem:** İngilizce kayıtların üyelikleri incelenir.
- **Beklenen:**
  - GB-0137, GB-0007 ile aynı iptal ücreti temasına girer.
  - GB-0080, GB-0051 ile aynı bildirim temasına girer.
  - GB-0121, GB-0102 ile aynı ödeme temasına girer.
  - İngilizce kayıtlar için ayrı “İngilizce” veya “yabancı dil” teması ya da bölümü oluşturulmaz.

### KK-12 · Platform ve sürüm bilgisi ayrıştırılmaz

**Tür:** sınır · **Kaynak:** K8

- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** GB-0056 (`5.2 sürümünden…`), GB-0142 (`Android’de…`) ve pano incelenir.
- **Beklenen:**
  - İki kayıt GB-0003 ile aynı bildirim temasına girer.
  - Panoda platform veya sürüm filtresi, sütunu ya da kırılımı bulunmaz.
  - Metindeki platform ve sürüm ifadeleri alıntıda korunur.

---

## 3. Puanlama

**Formül (K1, K9):**

\[
Puan = n \times (6-\overline{p}) \times \left(1+\frac{r}{n}\right)
\]

- \(n\): Temanın geçerli, tekrarsız kayıt sayısı.
- \(\overline{p}\): Bu kayıtların ortalama puanı.
- \(r\): Bu kayıtlardan son 14 güne düşenlerin sayısı.
- Kanal ve segment formüle girmez.
- “Diğer” için puan hesaplanmaz.

### KK-13 · Yeni kaydı olmayan bir temanın puanı

**Tür:** başarı · **Kaynak:** K1, K9

- **Ön koşul:** Fixture: GB-0030 (2026-09-14, puan 1), GB-0133 (2026-08-25, puan 3), GB-0134 (2026-10-05, puan 3). İlk iki kayıt T temasında; GB-0134 T’de değil.
- **Eylem:** Fixture yüklenir.
- **Beklenen:**
  - Referans tarih **2026-10-05**, pencere **2026-09-22…2026-10-05**.
  - T’nin kayıt sayısı: **2**.
  - Ortalama puanı: \((1+3)/2 = 2\).
  - Mutsuzluk: \(6-2 = 4\).
  - Son 14 gün payı: \(0/2 = 0\).
  - Yenilik: \(1+0 = 1\).
  - Puan: \(2 \times 4 \times 1 = \mathbf{8}\).
  - Panoda puan bir ondalıkla **8,0** değerini gösterir.

### KK-14 · Kanal puanı değiştirmez

**Tür:** sınır · **Kaynak:** K2

- **Ön koşul:** KK-13 fixture’ında GB-0030’un kanalı `magaza`, GB-0133’ünki `anket` yapılır.
- **Eylem:** Değiştirilmiş fixture yüklenir.
- **Beklenen:** T’nin puanı yine **8** olur. Panoda kanal ağırlığı ayarı bulunmaz.

### KK-15 · Segment puanı değiştirmez

**Tür:** sınır · **Kaynak:** K1

- **Ön koşul:** KK-13 fixture’ında GB-0030’un segmenti `yeni`, GB-0133’ünki `kurumsal` yapılır.
- **Eylem:** Değiştirilmiş fixture yüklenir.
- **Beklenen:** T’nin puanı yine **8** olur.

---

## 4. Pano

### KK-16 · Temalar puana, kayıt sayısına ve tema adına göre sıralanır

**Tür:** başarı · **Kaynak:** K1, K14

- **Ön koşul:** Geçerli dosya yüklü; onaylı sözlük mevcut.
- **Eylem:** Panodaki tema sırası hesaplarla karşılaştırılır.
- **Beklenen:**
  1. Puanı yüksek tema önce gelir.
  2. Puanlar eşitse kayıt sayısı fazla tema önce gelir.
  3. Kayıt sayıları da eşitse tema adı alfabetik sıralanır.
  - Bir ondalıklı gösterim hesaplanan puanın yerine kullanılmaz.
  - “Diğer” bu sıralamanın dışında, en altta bulunur.

### KK-17 · Sıralama elle sabitlenmez; sonuç formülden çıkar

**Tür:** sınır · **Kaynak:** K1, K9; Deniz’in ek notu

- **Ön koşul:** Fixture: GB-0006, GB-0051, GB-0057 ve GB-0030. İlk üç kayıt B temasında; GB-0030 İ temasında.
- **Eylem:** Fixture yüklenir.
- **Beklenen:**
  - En yeni tarih **2026-10-04**, pencere **2026-09-21…2026-10-04**.
  - B: \(n=3\), ortalama \(1\), son 14 gün payı \(3/3=1\).
  - B’nin puanı: \(3 \times 5 \times 2 = \mathbf{30}\).
  - İ: \(n=1\), ortalama \(1\), son 14 gün payı \(0/1=0\).
  - İ’nin puanı: \(1 \times 5 \times 1 = \mathbf{5}\).
  - B, İ’nin üstünde görünür. Belirli bir temayı öne alan ek kural bulunmaz.

---

## 5. Rapor

### KK-18 · Rapor, sıralamadaki ilk 5 temayla indirilebilir Markdown dosyasıdır

**Tür:** başarı · **Kaynak:** K7, K13, K16

- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** Rapor indirilir.
- **Beklenen:**
  - `.md` uzantılı düz metin dosya iner.
  - Dosya adı `radar-raporu-YYYY-AA-GG.md` biçimindedir.
  - Panodaki sıralanan temaların ilk 5’i aynı sırayla raporda bulunur.
  - Altıncı ve sonraki temalar ile “diğer” rapora alınmaz.
  - Dosya adındaki tarihin kaynağı E10’da açık kalır.

### KK-19 · Her tema için en yeni 3 kaydın maskelenmiş metni alıntılanır

**Tür:** başarı · **Kaynak:** K7, K14, K15, K16

- **Ön koşul:** Fixture: GB-0003 (09-20), GB-0051 (10-01), GB-0006 (10-03), GB-0057 (10-04). Dört kayıt aynı temada.
- **Eylem:** Rapor indirilir.
- **Beklenen:**
  - Tema altında sırayla **GB-0057, GB-0006, GB-0051** alıntılanır.
  - GB-0003 alıntılanmaz.
  - Tarih azalan sıralanır; aynı tarihte küçük `id` önce gelir.
  - Her alıntının yanında tarih, kanal ve `id` bulunur.
  - K15’teki telefon ve e-posta maskelemesi dışında metin değiştirilmez; kısaltılmaz, çevrilmez veya düzeltilmez.
  - GB-0057’nin alıntısı `Bildirim yine gecikti 😡` olarak kalır.

### KK-20 · 3’ten az kaydı olan temada uydurma veya boş alıntı olmaz

**Tür:** sınır · **Kaynak:** K7, K10, K16

- **Ön koşul:** KK-13 fixture’ı; T’de iki kayıt var.
- **Eylem:** Rapor indirilir.
- **Beklenen:**
  - T altında sırayla GB-0030 ve GB-0133 bulunur.
  - Üçüncü alıntı, boş madde veya doldurma metni bulunmaz.
  - Alıntı sayısını tamamlamak için atlanmış tekrar kayıtlar kullanılmaz.

### KK-21 · 5’ten az tema varsa rapor mevcut temaları gösterir

**Tür:** sınır · **Kaynak:** K7, K13, K16

- **Ön koşul:** KK-17 fixture’ı; iki tema var.
- **Eylem:** Rapor indirilir.
- **Beklenen:** İki tema pano sırasıyla raporda bulunur. Boş tema başlığı veya doldurma satırı bulunmaz. “Diğer”, tema sayısını tamamlamak için kullanılmaz.

---

## 6. Gizlilik

### KK-22 · Dosya tarayıcıdan dışarı gönderilmez

**Tür:** başarı · **Kaynak:** K3, K17

- **Ön koşul:** Tarayıcının ağ izleme aracı açık; istek geçmişi korunuyor.
- **Eylem:** Radar açılır, örnek CSV yüklenir, pano incelenir, rapor indirilir.
- **Beklenen:**
  - Sayfa açılırken bütün istekler Radar’ın kendi adresine gider.
  - Başka alan adına CDN, analitik, font, API veya başka amaçla **0 istek** yapılır.
  - Dosya seçildikten sonra rapor indirmesi dahil hiçbir ağ isteği yapılmaz.
  - Aynı adresten yüklenmesi, dış kütüphaneyi K17’ye uygun hâle getirmez; ayrıca KK-35 doğrulanır.

### KK-23 · Radar ağ bağlantısı olmadan çalışır

**Tür:** sınır · **Kaynak:** K3, K17

- **Ön koşul:** Radar açıldıktan sonra tarayıcı çevrimdışı yapılır.
- **Eylem:** Örnek CSV yüklenir, rapor indirilir.
- **Beklenen:** KK-01’deki sayılar, tema hesapları, sıralama ve rapor içeriği çevrimiçi sonuçla aynıdır. İşlem ağ bağlantısı beklemez ve ağ hatası üretmez.

### KK-24 · Metindeki telefon numarası panoda ve raporda maskelenir

**Tür:** başarı · **Kaynak:** K3, K15

- **Ön koşul:** Fixture: GB-0084, GB-0120. Kayıtlar ilgili temalarına giriyor.
- **Eylem:** Pano açılır, rapor indirilir.
- **Beklenen:**
  - GB-0084 şu metinle görünür: `İptal ücreti kesildi, beni arayın **** *** ** 34`.
  - Son iki hane dışındaki her rakam `*` olur; boşluklar korunur.
  - Ham numara ve gizlenmesi gereken parçaları görünür metinde, DOM içinde veya raporda bulunmaz: `0532 555 12 34`, `555 12`, `987 65`.
  - Maskeleme tema üyeliğini ve puanlamayı değiştirmez. GB-0084’ün puanı ortalamaya **1** olarak katılır.

### KK-25 · +90 ile başlayan numarada ülke kodu da maskelenir

**Tür:** sınır · **Kaynak:** K3, K15

- **Ön koşul:** KK-24 fixture’ı.
- **Eylem:** GB-0120 panoda ve raporda incelenir.
- **Beklenen:**
  - Metin `Ödeme sorunu var, numaram +** *** *** ** 43` olarak görünür.
  - `+` ve boşluklar yerinde kalır; son iki hane dışındaki bütün rakamlar, `90` dahil, maskelenir.
  - `+90 555 987 65 43`, `987 65` ve `9876543` ham biçimde bulunmaz.
  - `Ödeme sorunu var, numaram` kısmı değişmez.

### KK-26 · Telefon olmayan sayılar ve “telefon” kelimesi maskelenmez

**Tür:** sınır · **Kaynak:** K3, K7, K15

- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** Kayıtlar panoda ve rapora girdiyse raporda incelenir.
- **Beklenen:**
  - Şu ifadeler değişmeden görünür: GB-0041 `50 TL`, GB-0098 `400 TL`, GB-0064 `75 TL`, GB-0056 `5.2 sürümünden`, GB-0051 `20 dakika`, GB-0015 `3D Secure`, GB-0030 `2 saat`.
  - GB-0126’nın `Telefon numarası restoranın değil başka bir yerin.` metni değişmez.

---

## 7. Ek kararlarla eklenen kriterler

### KK-27 · Son 14 günün sınırı ve paydası doğru uygulanır

**Tür:** sınır · **Kaynak:** K1, K9

- **Ön koşul:** Fixture: GB-0089 (09-21, puan 2), GB-0143 (09-22, puan 1), GB-0088 (10-05, puan 2), GB-0134 (10-05, puan 3). İlk üç kayıt T temasında; GB-0134 T’de değil.
- **Eylem:** Dosya farklı yükleme günlerinde işlenir.
- **Beklenen:**
  - Her yüklemede referans tarih **2026-10-05** olur.
  - **09-22 dahil**, **09-21 hariç**, **10-05 dahil**.
  - T için \(n=3\), ortalama \(5/3\), son 14 gün kayıt sayısı \(r=2\), pay \(2/3\).
  - Payda dosyanın toplam 4 kaydı veya bütün temaların yeni kayıtları değildir.
  - Puan:
    \[
    3 \times (6-5/3) \times (1+2/3)
    = 65/3
    = 21{,}666\ldots
    \]
  - Panoda **21,7** görünür. Yükleme günü değişince sonuç değişmez.

### KK-28 · Tekrarlar bir kez sayılır ve dosyalar birleştirilmez

**Tür:** sınır · **Kaynak:** K10, K12

- **Ön koşul:** Üç ayrı test hazırlanır.
- **Eylem ve beklenen:**
  - **Farklı `id`, eş içerik:** GB-0011 ve GB-0150 birlikte yüklenir. **2 satır okunur, 1 tekrar atlanır, 1 kayıt işlenir.** Tema sayısına bir kayıt, puan toplamına **2** katılır. Çift raporda iki alıntı oluşturmaz.
  - **Aynı `id`, farklı içerik:** GB-0011 iki kez yazılır; ikinci satırın metni ve puanı değiştirilir. İkinci satır atlanır; ilk satırın metni ve puanı kullanılır.
  - **İki ayrı yükleme:** Önce KK-13, sonra KK-17 fixture’ı yüklenir. İkinci yükleme başarıyla tamamlandığında pano ve rapor yalnız ikinci dosyanın kayıtlarından oluşur. Önceki dosya yeni dosyaya eklenmez; birleştirme işlemi sunulmaz.

### KK-29 · Bozuk satırlar atlanır ve nedenleri gösterilir

**Tür:** hata · **Kaynak:** K4, K11, K12

- **Ön koşul:** Doğru başlıklı, birbirinden farklı `id`’lere sahip altı veri satırlık CSV hazırlanır:
  - Bir geçerli satır.
  - Bir eksik alanlı satır.
  - Puanı `0` olan satır.
  - Puanı `6` olan satır.
  - Tarihi `2026-02-30` olan satır.
  - Kanalı `eposta` olan satır; örnekte kullanılan geçerli kanallar `destek`, `magaza`, `anket`.
- **Eylem:** Dosya yüklenir.
- **Beklenen:**
  - Dosya bütünüyle reddedilmez; geçerli kayıt işlenir ve pano açılır.
  - **6 okunan, 5 atlanan satır** gösterilir.
  - Atlanma nedenleri anlaşılır biçimde gösterilir: eksik alan **1**, geçersiz puan **2**, geçersiz tarih **1**, bilinmeyen kanal **1**.
  - Atlanan satırlar tema sayısına, ortalamaya, son 14 gün payına veya rapor alıntılarına katılmaz.

### KK-30 · Kararlaştırılan sayılar panoda görünür

**Tür:** başarı · **Kaynak:** K12, K13

- **Ön koşul:** KK-13 fixture’ı yüklü.
- **Eylem:** Pano incelenir.
- **Beklenen:**
  - Üstte **3 okunan, 0 atlanan satır** görünür.
  - Her sıralanan tema için **ad, puan, kayıt sayısı ve ortalama puan** görünür.
  - T için puan bir ondalıkla **8,0**, kayıt sayısı **2**, ortalama puan **2** değerini gösterir.
  - “Diğer” için yalnız kayıt sayısı gösterilir; tema puanı veya ortalama puan gösterilmez.
  - Atlanan satır varsa sayının yanında veya erişilebilir açıklamasında nedenler bulunur.

### KK-31 · Eşit puanlarda kayıt sayısı, ardından tema adı belirleyicidir

**Tür:** sınır · **Kaynak:** K14

- **Ön koşul:** Fixture:
  - GB-0030, GB-0133 ve GB-0094’ün puanları `2` yapılır; üçü İ temasında.
  - GB-0006 ve GB-0051’in puanları `3` yapılır; ikisi B temasında.
  - GB-0134 referans tarihi 2026-10-05 yapar; İ ve B’de değildir.
- **Eylem:** Fixture yüklenir.
- **Beklenen:**
  - İ: \(3 \times (6-2) \times (1+0/3)=12\).
  - B: \(2 \times (6-3) \times (1+2/2)=12\).
  - İ, kayıt sayısı **3** olduğu için B’nin (**2**) önünde yer alır.
  - Ek eşitlik testinde, farklı temalardaki GB-0030 ve GB-0050 ile referans tarihi sağlayan GB-0134 kullanılır. İlk iki temanın puanı **5**, kayıt sayısı **1** olur; aralarındaki sıra onaylı tema adlarının alfabetik sırasıdır.

### KK-32 · Eşit tarihli alıntılarda küçük `id` önce gelir

**Tür:** sınır · **Kaynak:** K7, K14, K16

- **Ön koşul:** Fixture: GB-0077, GB-0146, GB-0105, GB-0084. Dördü aynı iptal ücreti temasına giriyor.
- **Eylem:** Rapor indirilir.
- **Beklenen:**
  - Bu temanın alıntıları sırayla **GB-0077, GB-0146, GB-0105** olur.
  - 2026-10-05 tarihli iki kayıt arasında GB-0077 önce gelir.
  - 2026-10-02 tarihli GB-0084 bu temanın üç alıntısına girmez.
  - Bir kaydın başka temada da alıntılanması, bu temadaki seçimden çıkarılmasına neden olmaz.

### KK-33 · Bitişik telefonlar ve e-posta maskelenir; isim korunur

**Tür:** sınır · **Kaynak:** K15

- **Ön koşul:** GB-0084’ün metni şu şekilde değiştirilir:
  `İptal ücreti kesildi, beni arayın 05325551234; e-posta ali@example.com; ad Ali Yılmaz.`
  İkinci testte telefon `+905559876543` yapılır.
- **Eylem:** Her fixture ayrı yüklenir; pano ve rapor incelenir.
- **Beklenen:**
  - `05325551234` → `*********34`.
  - `+905559876543` → `+**********43`.
  - `ali@example.com` → `a***@example.com`.
  - `Ali Yılmaz` değişmez.
  - Ham telefon ve e-posta görünür metinde, DOM içinde ve raporda bulunmaz.
  - Maskeleme puanı ve tema üyeliğini değiştirmez.
  - K15’in tanımladığı telefon kapsamı, `0` veya `+90` ile başlayan, boşluklu ya da bitişik **10–12 rakamlı** numaralardır. Diğer ülke kodları E9’da açık kalır.

### KK-34 · Rapor tema bilgilerini ve alıntı kaynaklarını içerir

**Tür:** başarı · **Kaynak:** K7, K14, K15, K16

- **Ön koşul:** KK-13 fixture’ı yüklü.
- **Eylem:** Rapor indirilir.
- **Beklenen:**
  - Dosya adı `radar-raporu-YYYY-AA-GG.md` biçimindedir.
  - T için bir Markdown başlığı, puan **8**, kayıt sayısı **2** ve ortalama puan **2** bulunur.
  - İki alıntı bulunur; her biri kendi tarih, kanal ve `id` bilgileriyle ilişkilidir.
  - İlk alıntının kaynak bilgileri GB-0030, `2026-09-14`, `destek`; ikincininki GB-0133, `2026-08-25`, `magaza` olur.
  - Alıntılar K15’e göre maskelenmiş metindir.
  - Başlık seviyesi ve dosya adındaki tarihin kaynağı bu kriterle belirlenmez; E10’da açık kalır.

### KK-35 · Paketlenmiş olanlar dahil dış kütüphane kullanılmaz

**Tür:** kısıt · **Kaynak:** K3, K17

- **Ön koşul:** Uygulamanın kaynakları ve tarayıcıya verilen dosyaları erişilebilir.
- **Eylem:** Kaynaklar, bağımlılıklar ve yüklenen dosyalar incelenir.
- **Beklenen:**
  - Uygulama hiçbir dış kütüphaneyi kullanmaz.
  - CDN’den yüklenen, aynı adresten sunulan veya uygulama dosyasına gömülmüş üçüncü taraf kütüphane bulunmaz.
  - CSV okuma, hesaplama, maskeleme ve rapor üretimi için dış kütüphane kullanılmaz.
  - Tarayıcının yerleşik API’leri bu yasak kapsamında dış kütüphane sayılmaz.

### KK-36 · Chrome, Safari ve Edge’in güncel sürümlerinde çalışır

**Tür:** uyumluluk · **Kaynak:** K18

- **Ön koşul:** Test günü Chrome, Safari ve Edge’in güncel kararlı sürümleri kullanılır; sürüm ve işletim sistemi kaydedilir.
- **Eylem:** Bu belgedeki uygulanabilir kullanıcı akışları üç tarayıcıda da yürütülür.
- **Beklenen:**
  - Dosya seçme, doğrulama, pano açma, maskeleme, sıralama ve Markdown indirme çalışır.
  - Aynı fixture üç tarayıcıda aynı sayıları, tema sırasını ve rapor içeriğini üretir.
  - Çevrimdışı işleme ve ağdan dışarı veri göndermeme kriterleri üçünde de geçer.

### KK-37 · 5.000 satırlık dosyada pano 2 saniyenin altında açılır

**Tür:** performans · **Kaynak:** K19

- **Ön koşul:**
  - Başlık hariç **5.000 geçerli veri satırı** içeren CSV hazırlanır.
  - Satırların `id`’leri ve en az bir `id` dışı alanı farklıdır; dosya tekrar elemesiyle küçülen 5.000 kopyadan oluşmaz.
  - Örnek dosyadaki metinlerin uzunluğu ve konu çeşitliliği korunur.
  - Tarayıcı, sürüm ve test cihazı kaydedilir; Radar başlangıçta açık ve hazırdır.
- **Eylem:** Dosya seçilir. Ölçüm dosyanın uygulamaya tesliminden başlar; okuma, doğrulama, tekrar kontrolü, eşleştirme, hesaplama ve tamamlanmış panonun görünmesi dahildir.
- **Beklenen:**
  - Pano **2.000 ms’den kısa sürede** açılır.
  - Okunan **5.000**, atlanan **0**, işlenen **5.000** olur.
  - Ölçüm, yalnız dosyanın okunmasını veya yükleme göstergesinin görünmesini değil, hesapları tamamlanmış panoyu kapsar.

### KK-38 · İptal ücreti teması genel iptal kayıtlarını kapsamaz

**Tür:** sınır · **Kaynak:** K20

- **Ön koşul:** K20’ye uygun onaylı sözlük; fixture: GB-0020, GB-0070, GB-0030, GB-0084, GB-0146.
- **Eylem:** Tema üyelikleri incelenir.
- **Beklenen:**
  - GB-0020 ve GB-0070 bildirim temasına girer; yalnız rezervasyonun iptal olduğunu söyledikleri için iptal ücreti temasına girmez.
  - GB-0030 ücret alınmasını, GB-0084 ücret kesilmesini, GB-0146 iptal sonrası para çekilmesini anlattığı için iptal ücreti temasına girer.
  - Yalnız `iptal` kelimesinin geçmesi eşleşme için yeterli değildir.
  - Ücret, kesinti, ceza veya para bağlamı Türkçe karaktersiz yazımda ve İngilizce karşılıklarda da korunur.

### KK-39 · Tam örnek dosyanın sıralaması açık kayıt gruplarıyla hesaplanır

**Tür:** başarı · **Kaynak:** K1, K6, K9, K10, K13, K14, K20; örnek CSV’nin tamamı

- **Ön koşul:** Örnek CSV’nin tamamı kullanılır. Tema sözlüğü bulunmadığı için aşağıdaki üyelikler **hesabın açık varsayımıdır**. Sözlük bu üyelikleri onayladığında sayısal sonuçlar doğrudan kabul beklentisi olur; farklı üyelikler onaylanırsa aynı formülle yeniden hesaplanır.
- **Eylem:** Geçersiz ve tekrar kayıtlar ayrılır, her grubun sayısı, puan toplamı, ortalaması ve son 14 gün payı hesaplanır; sonuçlar sıralanır.
- **Beklenen:** Aşağıdaki üyeliklerle sıralama **B → A → C → D → F → E → H → G** olur. “Diğer” en altta, sıralamanın dışında kalır.

#### 1. İşlenecek kayıtlar ve tarih penceresi

- Başlık hariç okunan satır: **150**.
- Boş metin nedeniyle atlanan: **GB-0140**.
- GB-0011/GB-0150 eş kayıt çiftinden yalnız biri işlenir.
- İşlenen benzersiz kayıt: \(150-1-1=\mathbf{148}\).
- En yeni tarih: **2026-10-05**.
- Bu tarih dahil 14 gün: **2026-09-22…2026-10-05**.
- GB-0105, A, B ve C’de sayılır; dosya toplamında tek kayıttır.

#### 2. Hesapta kullanılan üyelikler

A–H, tema adı değil bu belgedeki hesap etiketleridir. Aşağıdaki numaraların hepsi `GB-` önekine sahiptir; örneğin `0005`, GB-0005’tir.

| Grup | Grubu tarif eden örnek kayıtlar | Hesaba katılan bütün kayıtlar |
|---|---|---|
| A | GB-0030: iptal sonrası ücret; GB-0084: iptal ücreti kesintisi | 0005, 0007, 0013, 0021, 0030, 0034, 0041, 0048, 0052, 0058, 0064, 0077, 0084, 0093, 0094, 0096, 0098, 0100, 0103, 0105, 0106, 0117, 0128, 0129, 0130, 0132, 0133, 0135, 0137, 0141, 0146 |
| B | GB-0003: geç bildirim; GB-0057: bildirim gecikmesi | 0003, 0006, 0009, 0020, 0024, 0031, 0040, 0045, 0051, 0053, 0056, 0057, 0059, 0061, 0065, 0070, 0071, 0080, 0083, 0085, 0088, 0089, 0095, 0101, 0105, 0111, 0142, 0143, 0144 |
| C | GB-0010: iki kez ödeme; GB-0076: aynı sorun; GB-0001: kayıtlı kartın silinmesi | 0001, 0008, 0010, 0015, 0026, 0028, 0042, 0055, 0068, 0076, 0082, 0086, 0092, 0102, 0105, 0107, 0112, 0120, 0121, 0124, 0127 |
| D | GB-0011: yeniden giriş; GB-0050: giriş SMS’i; GB-0099: kayıt olamama | 0011, 0046, 0050, 0066, 0069, 0081, 0099, 0108, 0109, 0139 |
| E | GB-0004: eski fotoğraflar; GB-0022: güncel olmayan fiyatlar | 0004, 0012, 0022, 0043, 0060, 0072, 0078, 0104, 0110, 0126, 0136, 0147 |
| F | GB-0027: masa alanı seçememe; GB-0134: cam kenarı masa isteği | 0018, 0027, 0035, 0038, 0067, 0073, 0097, 0113, 0114, 0118, 0122, 0134, 0138, 0148 |
| G | GB-0017: sadakat puanının sıfırlanması; GB-0033: sadakat puanlarına olumlu yorum | 0017, 0033, 0047, 0063, 0090 |
| H | GB-0014: olumlu keşif yorumu; GB-0116: kolay rezervasyon yorumu | 0002, 0014, 0016, 0019, 0023, 0025, 0029, 0032, 0036, 0037, 0039, 0044, 0049, 0054, 0062, 0074, 0079, 0087, 0091, 0115, 0116, 0119, 0125, 0145 |
| Diğer | Bu gruplamada eşleşmeyen genel iptal süresi ve politika kayıtları | 0075, 0123, 0131, 0149 |

**Üyelik varsayımlarının sınırları:**

- D’de GB-0011 hesap temsilcisi olarak yazılmıştır. GB-0150 tutulsa da tarih ve puan aynı olduğundan hesap değişmez.
- GB-0007 ve GB-0129 bu hesapta yalnız A’dadır; “ödeme sayfası” ifadesi tek başına C’ye üyelik sayılmamıştır.
- GB-0001 ve GB-0107 C’ye alınmıştır.
- G’de olumlu sadakat kayıtları da aynı konu grubundadır; H’ye ayrıca alınmamıştır.
- GB-0075, GB-0123, GB-0131 ve GB-0149 bu varsayımda “diğer”dedir. Kesin üyelikleri ve diğer grupların sınırları E1 kapsamında sözlükle onaylanmalıdır.
- Tema üyeliklerinin toplamı **146**’dır. GB-0105’in üç grupta bulunmasından gelen iki ek üyelik çıkarılınca **144** benzersiz temalı kayıt kalır; “diğer”deki **4** kayıtla toplam **148** olur.

#### 3. Son 14 güne düşen kayıtlar

| Grup | Son 14 gün kayıtları | Sayı \(r\) |
|---|---|---:|
| A | 0013, 0052, 0077, 0084, 0105, 0129, 0130, 0135, 0137, 0146 | 10 |
| B | 0006, 0009, 0020, 0045, 0051, 0053, 0056, 0057, 0059, 0061, 0065, 0070, 0071, 0080, 0083, 0088, 0095, 0101, 0105, 0111, 0142, 0143, 0144 | 23 |
| C | 0015, 0028, 0076, 0086, 0092, 0105, 0120 | 7 |
| D | 0099, 0108 | 2 |
| E | 0004, 0072 | 2 |
| F | 0035, 0134 | 2 |
| G | Yok | 0 |
| H | 0049, 0054, 0115, 0116, 0119 | 5 |

#### 4. Ara hesaplar ve sonuç

Puan toplamı yalnız ortalamayı hesaplamak içindir; öncelik puanı değildir.

| Sıra | Grup | Kayıt sayısı \(n\) | Kayıt puanları toplamı | Ortalama puan | Son 14 gün payı \(r/n\) | K1 hesabı | Hesaplanan puan | Panoda |
|---:|---|---:|---:|---|---|---|---:|---:|
| 1 | B | 29 | 46 | \(46/29=1,586207…\) | \(23/29=0,793103…\) | \(29×(6−46/29)×(1+23/29)\) | \(6656/29=229,517241…\) | **229,5** |
| 2 | A | 31 | 64 | \(64/31=2,064516…\) | \(10/31=0,322581…\) | \(31×(6−64/31)×(1+10/31)\) | \(5002/31=161,354839…\) | **161,4** |
| 3 | C | 21 | 41 | \(41/21=1,952381…\) | \(7/21=0,333333…\) | \(21×(6−41/21)×(1+7/21)\) | \(340/3=113,333333…\) | **113,3** |
| 4 | D | 10 | 22 | \(22/10=2,2\) | \(2/10=0,2\) | \(10×(6−2,2)×1,2\) | **45,6** | **45,6** |
| 5 | F | 14 | 46 | \(46/14=3,285714…\) | \(2/14=0,142857…\) | \(14×(6−46/14)×(1+2/14)\) | \(304/7=43,428571…\) | **43,4** |
| 6 | E | 12 | 37 | \(37/12=3,083333…\) | \(2/12=0,166667…\) | \(12×(6−37/12)×(1+2/12)\) | \(245/6=40,833333…\) | **40,8** |
| 7 | H | 24 | 111 | \(111/24=4,625\) | \(5/24=0,208333…\) | \(24×(6−4,625)×(1+5/24)\) | **39,875** | **39,9** |
| 8 | G | 5 | 20 | \(20/5=4\) | \(0/5=0\) | \(5×(6−4)×1\) | **10** | **10,0** |

Örneğin B’nin hesabı adım adım:

1. **29 kayıt**, puan toplamı **46**.
2. Ortalama: \(46/29\).
3. Mutsuzluk: \(6-46/29=128/29\).
4. Son 14 günde **23 kayıt**; pay \(23/29\).
5. Yenilik: \(1+23/29=52/29\).
6. Puan: \(29×128/29×52/29=6656/29=229,517241…\).

“Diğer” için hesap yapılmaz; panonun en altında **4** sayısı görünür.

#### 5. Aynı gruplamayla rapor beklentisi

İlk 5 grup **B, A, C, D, F** olur. Alıntılar tarih azalan, eşit tarihte `id` artan seçilir:

| Rapor sırası | Grup | Alıntılar, rapordaki sırayla |
|---:|---|---|
| 1 | B | GB-0088, GB-0057, GB-0006 |
| 2 | A | GB-0077, GB-0146, GB-0105 |
| 3 | C | GB-0076, GB-0086, GB-0105 |
| 4 | D | GB-0099, GB-0108, GB-0050 |
| 5 | F | GB-0134, GB-0035, GB-0138 |

GB-0105’in hem A hem C altında alıntılanması uygundur. Bu sonuç belirli bir temayı öne çıkarma beklentisine değil, belirtilen üyelikler ve kararlaştırılan formüle dayanır.

---

## Kararı eksik

Ek kararlar ana kuralları kapatmıştır. Aşağıdaki ayrıntılar karar metinlerinde hâlâ belirlenmemiştir; bu ayrıntılar için kesin sonuç kriteri yazılmamıştır.

| # | Kalan karar | Etkilenen kriter / kanıt | Kime sorulmalı |
|---|---|---|---|
| E1 | PM onaylı `data/temalar.json`: tema adları, ifadeler, İngilizce karşılıklar ve üyelik sınırları. Özellikle KK-39’daki gruplama onaylanmalı veya değiştirilmelidir. | K20, GB-0020’nin iptal ücreti temasına girmemesini kapatır; sözlüğün tamamını sağlamaz. KK-06…KK-12 ve KK-39 buna bağlıdır. | Deniz; ifade önerileri için Selin ve Mert |
| E2 | Geçersiz ya da tekrar nedeniyle atlanan bir satırda dosyanın en yeni geçerli tarihi bulunursa, referans tarih seçiminde o satır dikkate alınacak mı? | K9 dosyadaki en yeni tarihi söyler; K11/K13 atlanan satırların referans tarihe etkisini belirtmez. Mevcut tarih fixture’ları bu ayrımı içermez. | Deniz, Ece |
| E4 | `id` dışındaki alanları aynı, `id`’leri farklı kayıtlardan hangi `id` temsilci olarak tutulacak? | K10 bir kez sayılmasını belirler. GB-0011/GB-0150’nin hesap sonucu aynı olsa da rapordaki `id` farklı olabilir. | Deniz, Ece |
| E5 | Kapanmamış tırnak gibi CSV yapısını bozan durumda satır sınırı nasıl bulunacak ve sonraki kayıtlara nasıl devam edilecek? | K11 eksik alan, puan, tarih ve kanal hatalarını kapatır; tırnak nedeniyle birden çok fiziksel satırın birleştiği durumu açıkça tanımlamaz. | Deniz, Ece |
| E6 | Ortalama puan kaç ondalıkla gösterilecek? Öncelik puanını bir ondalığa yuvarlarken tam yarım değerlerde hangi kural uygulanacak? | K12 öncelik puanının bir ondalık olmasını belirler; ortalama hassasiyetini ve yarım değer yuvarlamasını belirtmez. | Deniz |
| E9 | `0` veya `+90` ile başlamayan yurt dışı telefon numaraları maskelenecek mi; maskelenecekse hangi tanıma göre? | K15 yalnız `0`/`+90` ile başlayan 10–12 rakamlı numaraları tanımlar. | Mert, Deniz |
| E10 | Rapor dosya adındaki tarih yükleme/indirme tarihi mi, dosyanın en yeni kayıt tarihi mi? Markdown başlık seviyeleri ne olacak? | K16 ad biçimini ve içerik alanlarını kapatır; tarih kaynağını ve başlık seviyelerini belirtmez. | Deniz |

**Bilinçli olarak kriter yazılmayanlar:**

- Selin’in “iptal ücreti en üstte çıkmalı” beklentisi; yerine KK-17 ve formüle bağlı KK-39 vardır.
- “Günde 14 iptal şikâyeti” sayısının tutturulması (K5).
- Platform veya sürüm analizi (K8).
- Dosya birleştirme (K10).
- 5.000 satırın üstü için süre veya dosya boyutu garantisi; K19 yalnız 5.000 satırdaki süreyi belirler.

## E maddelerinin kriterlere dönüşümü

| E | İlgili karar | Güncellenen / eklenen KK | Durum |
|---|---|---|---|
| E1 | K6, K20 | KK-06 netleştirildi; KK-38 ve KK-39 eklendi | İptal sınırı kapandı. Sözlük içeriği açık; KK-39 üyelikleri sözlük onayına bağlı. |
| E2 | K9 | KK-13 ve KK-17 netleştirildi; KK-27 ve KK-39 eklendi | Referans tarih ve 14 günlük pencere kapandı. Atlanan satırın referans tarihe etkisi açık. |
| E3 | K9 | KK-13 netleştirildi; KK-27 ve KK-39 eklendi | Kapandı: payda temanın kendi kayıt sayısı. |
| E4 | K10 | KK-01, KK-07, KK-08, KK-20 netleştirildi; KK-28 eklendi | Tekrar sayımı, aynı `id` ve birleştirmeme kapandı. Farklı `id`’li eş kayıtların temsilcisi açık. |
| E5 | K11 | KK-05 netleştirildi; KK-29 eklendi | Başlık reddi, belirtilen satır hataları ve neden gösterimi kapandı. Kapanmamış tırnaktan toparlanma açık. |
| E6 | K12 | KK-01, KK-13 netleştirildi; KK-30 eklendi | Zorunlu pano alanları ve puanın bir ondalık gösterimi kapandı. Ortalama hassasiyeti ve yarım değer yuvarlaması açık. |
| E7 | K13 | KK-03, KK-08, KK-16, KK-18, KK-21 netleştirildi | Kapandı: boş metin atlanır; “diğer” yalnız sayısıyla en altta, puansız ve rapor dışında. |
| E8 | K14 | KK-16 ve KK-19 netleştirildi; KK-31 ve KK-32 eklendi | Kapandı: tema eşitliğinde kayıt sayısı/ad; alıntı eşitliğinde küçük `id`. |
| E9 | K15 | KK-19, KK-24, KK-25, KK-26 netleştirildi; KK-33 eklendi | Tanımlı telefonlar, e-posta ve isim davranışı kapandı. Diğer ülke kodları açık. |
| E10 | K16, K14 | KK-18…KK-21 netleştirildi; KK-34 eklendi | Rapor alanları, ad biçimi ve alıntı sırası kapandı. Tarih kaynağı ve başlık seviyeleri açık. |
| E11 | K17 | KK-22 ve KK-23 netleştirildi; KK-35 eklendi | Kapandı: paketlenmiş olanlar dahil dış kütüphane yok. |
| E12 | K18 | KK-36 eklendi | Kapandı: Chrome, Safari ve Edge’in güncel sürümleri. |
| E13 | K19 | KK-37 eklendi | Kapandı: 5.000 veri satırında tamamlanmış pano 2 saniyenin altında açılır. |