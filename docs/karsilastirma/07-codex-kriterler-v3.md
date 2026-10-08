# Radar: kabul kriterleri (K1–K36 ile güncellendi)

**Kaynaklar:** `docs/kararlar.md` içindeki K1–K36 ve Deniz’in ek notu; `docs/notlar/toplanti-notu.md`, `docs/notlar/slack-dokumu.md` ve `data/ornek-geri-bildirim.csv`.

**Hedef:** 16 Ekim Cuma demosu (K7). Aşağıdaki kriterlerin tamamı geçtiğinde iş “bitti” sayılır. Sözlüğe bağlı kriterler, Deniz’in sözlük onayı ve beklenen sonuçların hesaplanması tamamlanmadan geçmiş sayılmaz.

## Nasıl okunur

- **Fixture:** “Fixture: GB-0030, GB-0133” ifadesi, `id,tarih,kanal,metin,puan,segment` başlığıyla bu satırların örnek CSV’den aynen kopyalandığı küçük test dosyasıdır. Sentetik satırlar ilgili kriterde belirtilir. Her fixture ayrı değerlendirilir.
- **Sözlük:** `feedback-clustering` skill’i sözlük önerir; Deniz onaylar. Onaylanan sözlük `data/temalar.json` olur. Temalar kullanıcının derdi düzeyindedir; alt kırılımlar sürüm 2 kapsamındadır (K21, K32).
- **Tema testleri:** Tema eşleştirme kriterlerinin ön koşulu onaylı sözlüktür. Üyelikler Node’un yerleşik test aracıyla veya geliştirici konsolundaki tema → `id` listesiyle doğrulanabilir. Panoda kayıt listesi göstermek şart değildir.
- **Son 14 gün:** Pencere, geçerli satırların en yeni tarihi ve önceki 13 takvim günüdür. İki sınır da dahildir. Atlanan satırların tarihleri pencereyi etkilemez (K22, K31).
- **Test günü:** Tarihli fixture’lar, içerdikleri tarihlerden önce olmayan bir test gününde çalıştırılır. İleri tarih testi için gün ayrıca sabitlenir.
- **Sayım:** “Okunan”, başlık hariç dosyadaki satır sayısıdır. Tekrarlar ve bozuk satırlar atlananlara dahildir. Radar kişi değil kayıt sayar (K23, K34).
- **Sayı gösterimi:** Pano ve raporda puan ile ortalama puan virgül ayracıyla, bir ondalıkla ve yarım yukarı yuvarlanarak gösterilir: `8,0`, `2,0`. Kayıt ve satır sayıları tam sayıdır. Formül ara değerleri gösterim için yuvarlanmış değerlerden hesaplanmaz.
- **Ham veri:** CSV fixture’larında virgül sütun ayracıdır. Alıntılar ve sürüm numaraları özgün biçimlerini korur; metindeki `5.2` sürümü `5,2` olarak değiştirilmez.
- **Tam örnek dosya:** Beklenen tema sırası, tema sayıları, puanlar, “diğer” ve “övgü” sayıları ile rapor alıntıları **sözlük onaylanınca betikle hesaplanır** (KK-40). Önceden varsayılan kümeler veya sıralamalar bağlayıcı değildir.

---

## 1. Dosya yükleme

### KK-01 · Örnek dosyanın tamamı okunur

**Tür:** başarı · **Kaynak:** K4, K10–K13, K21, K23, K24, K30, K34

- **Ön koşul:** Radar tarayıcıda açık; onaylı sözlük mevcut.
- **Eylem:** `data/ornek-geri-bildirim.csv` yüklenir.
- **Beklenen:**
  - Dosya reddedilmez, pano açılır.
  - Üstte okunan ve atlanan satır sayıları ile atlanma nedenleri görünür.
  - GB-0140 “boş metin” nedeniyle atlanır.
  - GB-0011 tutulur; yalnızca `id`’si farklı olan tekrarı GB-0150 “tekrar” nedeniyle atlanır.
  - Kullanılabilir her kayıt, sözlükteki tema veya temalarda ya da “diğer” içinde yer alır. Olumlu yorumlar ayrı “övgü” temasında toplanır.
  - Tam dosyaya ilişkin beklenen sayılar **sözlük onaylanınca betikle hesaplanır** (KK-40).

### KK-02 · Tırnak, virgül ve emoji içeren metinler bölünmeden okunur

**Tür:** sınır · **Kaynak:** K4

- **Ön koşul:** KK-01’deki yükleme.
- **Eylem:** Ayrıştırılmış kayıt metinleri incelenir.
- **Beklenen:**
  - GB-0105 tek metin olarak okunur: `Uygulama "harika" ama iptal ücreti, bildirimler, ödeme... hepsi sorun`.
  - Kaçışlı çift tırnaklar tek tırnak çifti olur; metindeki virgüller yeni sütun açmaz.
  - GB-0001’in metni `Kayıtlı kartım silinmiş, her seferinde yeniden giriyorum.` olarak, puanı `1` olarak kalır.
  - GB-0057’nin metni `Bildirim yine gecikti 😡` olarak okunur.

### KK-03 · Boş metinli satır atlanır, dosya reddedilmez

**Tür:** sınır · **Kaynak:** K11, K13, K23

- **Ön koşul:** Fixture: GB-0140, GB-0134.
- **Eylem:** Fixture yüklenir.
- **Beklenen:**
  - Dosya reddedilmez.
  - Okunan **2**, atlanan **1**; neden **“boş metin”**.
  - GB-0140 hiçbir temaya veya “diğer” sayısına girmez.
  - GB-0134 kullanılabilir kayıt olarak değerlendirilir.

### KK-04 · Ad ya da telefon sütunu içeren ham dosya reddedilir

**Tür:** hata · **Kaynak:** K3, K4, K11

- **Ön koşul:** GB-0001…GB-0003 fixture’ının başlığına `ad,telefon`, satırlarına `Test Kişi,05000000000` eklenir.
- **Eylem:** Dosya yüklenir.
- **Beklenen:** Dosya bütünüyle reddedilir; bu dosyadan pano veya rapor oluşmaz. Beklenen sütunların `id,tarih,kanal,metin,puan,segment` olduğu belirtilir. Eklenen ad ve telefon ekranda görünmez.

### KK-05 · Başlığı farklı ya da CSV olmayan dosya reddedilir

**Tür:** hata · **Kaynak:** K4, K11, K24

- **Ön koşul:** Dört dosya hazırlanır:
  - `puan` sütunu eksik CSV.
  - Başlığı `tarih,kanal,metin,puan,segment` olan, `id` sütunu eksik CSV.
  - `.xlsx` dosyası.
  - Başlığı ve satırları `id,tarih,kanal,puan,metin,segment` sırasına taşınmış CSV.
- **Eylem:** Dosyalar ayrı ayrı yüklenir.
- **Beklenen:**
  - Dört dosya da bütünüyle reddedilir; reddedilme mesajı görünür.
  - Bu dosyalardan pano veya rapor oluşmaz; dosya reddi satır atlama olarak sayılmaz.
  - Önceki geçerli pano kalıyorsa değişmeden kalır; temizleniyorsa tamamen temizlenir. Karışık pano oluşmaz.
  - Doğru başlığın önündeki UTF-8 BOM ret nedeni değildir (KK-43).

---

## 2. Tema eşleştirme

### KK-06 · Temalar yalnızca onaylı sözlükten gelir

**Tür:** başarı · **Kaynak:** K6, K21, K32

- **Ön koşul:** `feedback-clustering` skill’inin önerdiği, Deniz’in onayladığı sözlük `data/temalar.json` olarak mevcut.
- **Eylem:** Sözlük, tema üyelikleri ve panodaki adlar incelenir.
- **Beklenen:**
  - Tema adları onaylı sözlükle birebir eşleşir; eşleşmeyen kayıtlar “diğer”e gider.
  - Veriden yeni tema adı üretilmez.
  - Sözlük kullanıcının derdi düzeyindedir; örneğin “ödeme hatası” tek temadır. Alt kırılımlar oluşturulmaz.
  - Olumlu yorumlar ayrı “övgü” temasında toplanır (KK-41).

### KK-07 · Birden çok temaya giren kayıt her temada sayılır

**Tür:** sınır · **Kaynak:** K1, K6

- **Ön koşul:** Onaylı sözlükte GB-0105’in “iptal ücreti”, “bildirimler” ve “ödeme” ifadelerini kapsayan ayrı temalar mevcut.
- **Eylem:** GB-0105’in üyelikleri incelenir.
- **Beklenen:** Kayıt üç temada da bulunur. Her temanın kayıt sayısına **1**, puan toplamına **2** katkı yapar. “Diğer”e girmez.

### KK-08 · “Diğer” puanlanmaz, sıralamaya girmez, en altta yalnız sayısıyla görünür

**Tür:** sınır · **Kaynak:** K6, K13, K22, K25

- **Ön koşul:** GB-0030 ile sözlükte hiçbir ifadeyle eşleşmeyen şu satırlar yüklenir:

  ```csv
  GB-0901,2026-10-05,anket,qwerty,1,duzenli
  GB-0902,2026-10-05,anket,asdf,1,duzenli
  ```

- **Eylem:** Pano incelenir; rapor indirilir.
- **Beklenen:**
  - Sıralamadaki tek tema GB-0030’un temasıdır. Pencere dışında kaldığından puanı **5,0** olur.
  - “Diğer” panonun en altında **2** kayıt olarak görünür; puan, ortalama ve sıra numarası gösterilmez.
  - “Diğer” raporda tema olarak yer almaz.
  - Fixture’ın üç kaydı da hesaba katılmıştır.

### KK-09 · Türkçe karaktersiz yazım tema eşleşmesini bozmaz

**Tür:** sınır · **Kaynak:** K6, K21, K30; örnek CSV

- **Ön koşul:** Onaylı sözlük ve örnek CSV yüklü.
- **Eylem:** Aşağıdaki kayıt çiftlerinin tema kümeleri karşılaştırılır.
- **Beklenen:** Her çift aynı tema kümesine girer.

| Karaktersiz kayıt | Karakterli kayıt | Ortak konu |
|---|---|---|
| GB-0058 | GB-0041 | İptal ücreti |
| GB-0093 | GB-0021 | İptal ücreti |
| GB-0146 | GB-0094 | İptal ücreti |
| GB-0111 | GB-0024 | Bildirim |
| GB-0059 | GB-0031 | Bildirim |
| GB-0142 | GB-0144 | Bildirim |
| GB-0076 | GB-0010 | Ödeme |
| GB-0047 | GB-0017 | Sadakat puanı |

### KK-10 · Büyük-küçük harf farkı eşleşmeyi bozmaz

**Tür:** sınır · **Kaynak:** K6, K18

- **Ön koşul:** Onaylı sözlük ve örnek CSV yüklü.
- **Eylem:** GB-0013 (`İptal…`), GB-0100 (`Iptal…`) ve GB-0034 (`iptal…`) incelenir.
- **Beklenen:** Üç kayıt aynı iptal ücreti temasına girer. GB-0100, GB-0077 ile aynı tema kümesindedir. Sonuç desteklenen üç tarayıcıda aynıdır.

### KK-11 · İngilizce yorum Türkçe eşiyle aynı temaya girer

**Tür:** sınır · **Kaynak:** K8, K21

- **Ön koşul:** Onaylı sözlük ve örnek CSV yüklü.
- **Eylem:** İngilizce kayıtların üyelikleri incelenir.
- **Beklenen:**
  - GB-0137, GB-0007 ile aynı iptal ücreti temasındadır.
  - GB-0080, GB-0051 ile aynı bildirim temasındadır.
  - GB-0121, GB-0102 ile aynı ödeme temasındadır.
  - Dil için ayrı tema veya bölüm oluşturulmaz.

### KK-12 · Platform ve sürüm bilgisi ayrıştırılmaz

**Tür:** sınır · **Kaynak:** K8

- **Ön koşul:** Onaylı sözlük ve örnek CSV yüklü.
- **Eylem:** GB-0056, GB-0142 ve pano incelenir.
- **Beklenen:** İki kayıt da GB-0003 ile aynı bildirim temasındadır. Platform veya sürüm filtresi, sütunu ya da kırılımı bulunmaz.

---

## 3. Puanlama

**Formül:** Puan = kayıt sayısı × (6 − temanın ortalama puanı) × (pay + 1).

**Pay:** Temanın pencereye düşen kayıt sayısı / temanın toplam kayıt sayısı.

### KK-13 · Yeni kaydı olmayan bir temanın puanı

**Tür:** başarı · **Kaynak:** K1, K9, K22, K25, K31

- **Ön koşul:** Fixture:
  - GB-0030: `2026-09-14`, puan **1**.
  - GB-0133: `2026-08-25`, puan **3**.
  - GB-0134: `2026-10-05`, puan **3**.
  - İlk iki kayıt aynı temada (T); GB-0134 T’de değil.
- **Eylem:** Fixture yüklenir.
- **Beklenen:**
  - En yeni geçerli tarih `2026-10-05`; pencere `2026-09-22…2026-10-05`.
  - T: kayıt sayısı **2**, ortalama **2,0**, mutsuzluk **4**, pay **0**, yenilik **1**.
  - Puan = 2 × 4 × 1; panoda **8,0**.

### KK-14 · Kanal puanı değiştirmez

**Tür:** sınır · **Kaynak:** K2, K24, K25

- **Ön koşul:** KK-13 fixture’ında GB-0030’un kanalı `magaza`, GB-0133’ünki `anket` yapılır.
- **Eylem:** Fixture yüklenir.
- **Beklenen:** T’nin puanı **8,0** kalır. Kanal ağırlığı ayarı bulunmaz.

### KK-15 · Segment puanı değiştirmez

**Tür:** sınır · **Kaynak:** K1, K24, K25

- **Ön koşul:** KK-13 fixture’ında GB-0030’un segmenti `yeni`, GB-0133’ünki `kurumsal` yapılır.
- **Eylem:** Fixture yüklenir.
- **Beklenen:** T’nin puanı **8,0** kalır.

---

## 4. Pano

### KK-16 · Temalar puana göre büyükten küçüğe sıralanır

**Tür:** başarı · **Kaynak:** K1, K12–K14, K21, K26

- **Ön koşul:** Onaylı sözlük ve geçerli CSV yüklü.
- **Eylem:** Tema sırası hesaplanan puanlarla karşılaştırılır.
- **Beklenen:**
  - Sıralanan temaların puanları büyükten küçüğe gider.
  - Eşit puanlarda KK-32 uygulanır.
  - “Övgü” sıralamaya girmez; “diğer” sıralama dışında, en alttadır.
  - Tam örnek dosyanın beklenen sırası KK-40 kapsamında hesaplanır.

### KK-17 · Sıralama elle sabitlenmez; sonuç formülden çıkar

**Tür:** sınır · **Kaynak:** K1, K9, K22, K25; Deniz’in ek notu

- **Ön koşul:** Fixture: GB-0006, GB-0051, GB-0057 ve GB-0030. İlk üç kayıt bildirim temasında (B), son kayıt iptal ücreti temasında (İ); tema kümeleri birbirinden ayrıdır.
- **Eylem:** Fixture yüklenir.
- **Beklenen:**
  - En yeni tarih `2026-10-04`; pencere `2026-09-21…2026-10-04`.
  - B: 3 kayıt, ortalama **1,0**, pay 3/3, puan **30,0**.
  - İ: 1 kayıt, ortalama **1,0**, pay 0/1, puan **5,0**.
  - B, İ’nin üstünde görünür. Belirli bir temayı öne alan sabit kural bulunmaz.

---

## 5. Rapor

### KK-18 · Rapor sıralamadaki ilk 5 temayla indirilebilir Markdown dosyasıdır

**Tür:** başarı · **Kaynak:** K7, K13, K16, K21, K28

- **Ön koşul:** Onaylı sözlük ve geçerli CSV yüklü.
- **Eylem:** Rapor indirilir.
- **Beklenen:**
  - `radar-raporu-YYYY-AA-GG.md` adlı düz metin dosyası iner.
  - Sıralamadaki ilk 5 tema, panodaki sırayla yer alır.
  - Sonraki temalar raporda tema bölümü olarak bulunmaz.
  - “Diğer” ve “övgü” ilk 5’e sayılmaz, tema bölümü olarak rapora girmez.
  - Tam örnek dosyanın beklenen temaları ve alıntıları KK-40 kapsamında hesaplanır.

### KK-19 · Her tema için en yeni 3 kaydın metni birebir alıntılanır

**Tür:** başarı · **Kaynak:** K7, K14–K16, K27

- **Ön koşul:** Fixture: GB-0003, GB-0051, GB-0006, GB-0057. Dört kayıt aynı bildirim temasında.
- **Eylem:** Rapor indirilir.
- **Beklenen:**
  - Tam 3 alıntı vardır: GB-0057, GB-0006, GB-0051. GB-0003 alıntılanmaz.
  - Her alıntının yanında tarih, kanal ve `id` bulunur.
  - GB-0057’nin metni `Bildirim yine gecikti 😡` olur.
  - Metin kısaltılmaz, çevrilmez veya düzeltilmez. Telefon ve e-posta maskelemesi uygulanır.

### KK-20 · 3’ten az kaydı olan temada uydurma ya da boş alıntı olmaz

**Tür:** sınır · **Kaynak:** K7, K16

- **Ön koşul:** KK-13 fixture’ı.
- **Eylem:** Rapor indirilir.
- **Beklenen:** T altında yalnız GB-0030 ve GB-0133, bu sırayla alıntılanır. Üçüncü alıntı veya boş doldurma satırı bulunmaz.

### KK-21 · 5’ten az sıralanan tema varsa rapor olanları gösterir

**Tür:** sınır · **Kaynak:** K7, K21

- **Ön koşul:** KK-17 fixture’ı.
- **Eylem:** Rapor indirilir.
- **Beklenen:** Önce B, sonra İ yer alır. Boş tema başlığı veya doldurma satırı bulunmaz.

---

## 6. Gizlilik

### KK-22 · Dosya tarayıcıdan dışarı gönderilmez

**Tür:** başarı · **Kaynak:** K3, K17, K18, K29

- **Ön koşul:** Desteklenen tarayıcının ağ kaydı açık; kayıtları koruma seçeneği etkin.
- **Eylem:** Radar açılır, CSV yüklenir, pano incelenir ve rapor indirilir.
- **Beklenen:**
  - Sayfa açılışındaki istekler yalnız Radar’ın kendi adresine gider.
  - Başka alan adına istek yapılmaz.
  - Dosya seçiminden rapor indirmesine kadar ağ isteği yapılmaz.
  - Teslim edilen dosyalarda paketlenmiş dış kütüphane bulunmaz.

### KK-23 · Radar ağ bağlantısı olmadan çalışır

**Tür:** sınır · **Kaynak:** K3, K17, K18

- **Ön koşul:** Radar açıldıktan sonra ağ kesilir.
- **Eylem:** CSV yüklenir, rapor indirilir.
- **Beklenen:** KK-01, KK-18 ve onay sonrası KK-40 sonuçları çevrimiçi sonuçlarla aynıdır. İşlem sırasında ağ hatası oluşmaz.

### KK-24 · Metindeki telefon numarası panoda ve raporda maskelenir

**Tür:** başarı · **Kaynak:** K3, K15

- **Ön koşul:** Fixture: GB-0084, GB-0120.
- **Eylem:** Görünen metinler ve indirilen rapor incelenir.
- **Beklenen:**
  - GB-0084: `İptal ücreti kesildi, beni arayın **** *** ** 34`.
  - Panoda gösterilen metinlerde, DOM’da ve raporda `0532 555 12 34`, `0532`, `555 12` ve `987 65` bulunmaz.
  - Maskeleme üyelikleri ve hesaplamaları değiştirmez. GB-0084’ün kaynak puanı **1** olarak kullanılır.

### KK-25 · +90 ile başlayan numara da maskelenir

**Tür:** sınır · **Kaynak:** K3, K15

- **Ön koşul:** KK-24 fixture’ı.
- **Eylem:** GB-0120 incelenir.
- **Beklenen:** Metin `Ödeme sorunu var, numaram +** *** *** ** 43` olur. Son iki hane dışındaki rakamlar maskelenir; `+` ve boşluklar korunur. `987 65` ve `9876543` görünmez.

### KK-26 · Telefon olmayan sayılar ve “telefon” kelimesi maskelenmez

**Tür:** sınır · **Kaynak:** K7, K15, K27

- **Ön koşul:** Örnek CSV yüklü.
- **Eylem:** Ayrıştırılmış metinler, gösterildikleri yüzeyler ve rapora giren alıntılar incelenir.
- **Beklenen:** Şu ifadeler değişmez:
  - GB-0041: `50 TL`.
  - GB-0098: `400 TL`.
  - GB-0064: `75 TL`.
  - GB-0056: `5.2 sürümünden`.
  - GB-0051: `20 dakika`.
  - GB-0015: `3D Secure`.
  - GB-0030: `2 saat`.
  - GB-0126: `Telefon numarası restoranın değil başka bir yerin.`

---

## 7. Önceki ek kriterlerin güncel hâli

### KK-27 · Bozuk satırlar atlanır; dosya reddedilmez, neden yazılır

**Tür:** hata · **Kaynak:** K4, K11, K23, K24

- **Ön koşul:** KK-13 fixture’ına şu satırlar eklenir:

  ```csv
  GB-0057,2026-10-04,magaza,Bildirim yine gecikti 😡,0,yeni
  GB-0006,2026-10-03,magaza,Onay bildirimi rezervasyon saatinden sonra geldi.,10,duzenli
  GB-0051,2026-10-01,magaza,"Masanız hazır bildirimi 20 dakika geç geldi, kapıda bekledik.",1
  GB-0088,2026-02-30,magaza,Telefonu yeniden başlatınca birikmiş bildirimler birden geldi.,2,duzenli
  GB-0080,2026-09-25,twitter,Table ready notification arrived way too late.,1,yeni
  ```

- **Eylem:** Fixture yüklenir.
- **Beklenen:**
  - Dosya reddedilmez; pano açılır.
  - Okunan **8**, atlanan **5**.
  - Nedenler açıkça belirtilir: 2 puan hatası, 1 eksik alan, 1 geçersiz tarih, 1 bilinmeyen kanal.
  - Bozuk satırlar tema üyeliklerine ve hesaplamalara girmez.
  - Bildirim teması oluşmaz; T’nin puanı **8,0** kalır. GB-0134 normal değerlendirilir.

### KK-28 · Tekrar eden kayıt bir kez sayılır; dosyalar birleştirilmez

**Tür:** sınır · **Kaynak:** K10, K23, K25

- **Ön koşul:** KK-13 fixture’ına şu satır eklenir:

  ```csv
  GB-0901,2026-09-14,destek,"2 saat önce iptal ettim yine de ücret aldınız, bu nasıl kural?",1,duzenli
  ```

- **Eylem:** Önce fixture, sonra örnek CSV, ardından yeniden KK-13 fixture’ı yüklenir.
- **Beklenen:**
  - İlk yüklemede GB-0030 tutulur; GB-0901 “tekrar” nedeniyle atlanır. Okunan **4**, atlanan **1**.
  - T: **2** kayıt, ortalama **2,0**, puan **8,0**.
  - Örnek CSV’de GB-0011 tutulur, GB-0150 “tekrar” nedeniyle atlanır.
  - GB-0139’un alanları farklı olduğundan tekrar sayılmaz.
  - Son yüklemede yalnız KK-13 fixture’ının sonuçları görünür; T’nin puanı **8,0** olur.
  - Dosyalar birleştirilmez; aynı anda birden fazla dosya seçilemez.

### KK-29 · Aynı `id` aynı içerikle tekrarlanırsa ilk satır tutulur; farklı içerikle gelirse ikisi de atlanır

**Tür:** sınır · **Kaynak:** K10, K23, K34

- **Ön koşul:**
  - (a) KK-13 fixture’ına GB-0030’un aynısı, aynı `id` ile eklenir.
  - (b) KK-13 fixture’ına şu farklı içerikli satır eklenir:

    ```csv
    GB-0030,2026-10-04,magaza,Bildirim yine gecikti 😡,1,yeni
    ```

  - (c) Aynı çelişkili satır gerçek GB-0030’un önüne alınır.
- **Eylem:** Üç fixture ayrı ayrı yüklenir.
- **Beklenen:**
  - (a) İlk GB-0030 tutulur, ikinci satır “tekrar” nedeniyle atlanır. Okunan **4**, atlanan **1**; T puanı **8,0**.
  - (b) ve (c) GB-0030 `id`’li iki satır da “çelişkili id” nedeniyle atlanır. Okunan **4**, atlanan **2**.
  - Çelişkili satırların hiçbiri tema veya “diğer” sayısına girmez.
  - T’de yalnız GB-0133 kalır; puanı **3,0** olur. Bildirim teması oluşmaz.
  - Çelişkinin sonucu satır sırasına bağlı değildir.

### KK-30 · Son 14 gün geçerli satırların en yeni tarihine göre hesaplanır; pay temanın kendi kayıtları üzerinden alınır

**Tür:** sınır · **Kaynak:** K9, K22, K25, K31

- **Ön koşul:** Fixture: GB-0003, GB-0089, GB-0143, GB-0088 ve GB-0077. İlk dört kayıt bildirim temasında (B), GB-0077 iptal ücreti temasında (İ).
- **Eylem:** Fixture, tarihlerinin ileri tarih sayılmadığı iki farklı günde yüklenir.
- **Beklenen:**
  - En yeni geçerli tarih `2026-10-05`; pencere `2026-09-22…2026-10-05`.
  - B’nin kayıt sayısı **4**, tam ortalaması 7/4 = **1,75**, mutsuzluğu **4,25**.
  - GB-0143 ve GB-0088 içeride; GB-0089 ve GB-0003 dışarıdadır.
  - B’nin payı 2/4 = **0,5**, yeniliği **1,5**, puanı **25,5**; gösterilen ortalama **1,8**.
  - İ: 1 kayıt, ortalama **3,0**, pay 1/1, puan **6,0**.
  - Sonuç iki yükleme gününde aynıdır.
  - Payın paydası temanın toplam kayıt sayısıdır; bütün dosyanın yeni kayıt sayısı kullanılmaz.

### KK-31 · Panoda gerekli sayılar Türkçe biçimde gösterilir

**Tür:** başarı · **Kaynak:** K12, K13, K23, K25, K34

- **Ön koşul:** KK-13 fixture’ı ile GB-0140.
- **Eylem:** Pano incelenir; sayı biçimlendirme fonksiyonu birim testiyle doğrulanır.
- **Beklenen:**
  - Üstte okunan **4**, atlanan **1**, neden “boş metin”.
  - Her sıralanan tema için ad, puan, kayıt sayısı ve ortalama görünür.
  - T: puan **8,0**, kayıt sayısı **2**, ortalama **2,0**.
  - Puan ve ortalama bir ondalıkla, virgül ayracıyla gösterilir.
  - Yarım yukarı yuvarlama uygulanır: **1,25 → 1,3**; **1,24 → 1,2**.
  - “Diğer” yalnız kayıt sayısıyla görünür.
  - Sayı etiketlerinde “kişi” yerine “kayıt” kullanılır.

### KK-32 · Eşit puanlı temalarda önce kayıt sayısı, sonra Türkçe alfabetik sıra belirler

**Tür:** sınır · **Kaynak:** K14, K25, K26

- **Ön koşul:**
  - (a) Fixture: GB-0042, GB-0112, GB-0030. İlk iki kayıt ödeme temasında (Ö), son kayıt iptal ücreti temasında (İ).
  - (b) Fixture: GB-0042, GB-0112, GB-0098, GB-0117. İlk iki Ö’de, son iki İ’dedir.
- **Eylem:** Fixture’lar ayrı ayrı yüklenir.
- **Beklenen:**
  - (a) Pencere `2026-09-01…2026-09-14`. Ö ve İ puanları **10,0** olur. Ö’nün kayıt sayısı daha fazla olduğundan önce gelir.
  - (b) Pencere `2026-08-18…2026-08-31`. İki tema da 2 kayıt ve **20,0** puana sahiptir.
  - İkinci eşitlik tema adlarının `localeCompare` ile `tr` yereline göre karşılaştırılmasıyla çözülür.
  - Karşılaştırıcı testinde “İptal ücreti”, “Ödeme hatası”ndan önce gelir.

### KK-33 · Tarihi eşit alıntılarda `id`’si küçük olan önce gelir

**Tür:** sınır · **Kaynak:** K7, K14

- **Ön koşul:** Fixture sırası: GB-0065, GB-0057, GB-0051, GB-0045. Hepsi aynı bildirim temasında.
- **Eylem:** Rapor indirilir.
- **Beklenen:** Alıntı sırası GB-0057, GB-0045, GB-0051 olur. GB-0065 alıntılanmaz. Seçim dosyadaki satır sırasına bağlı değildir.

### KK-34 · Bitişik numara ve e-posta maskelenir, isim maskelenmez

**Tür:** sınır · **Kaynak:** K3, K15, K33

- **Ön koşul:** KK-24 fixture’ına şu satırlar eklenir:

  ```csv
  GB-0901,2026-10-05,destek,"İptal ücreti kesildi, beni arayın 05325551234",1,duzenli
  GB-0902,2026-10-05,destek,"Ödeme sorunu var, numaram +905559876543",2,yeni
  GB-0903,2026-10-05,destek,İptal ücreti için ayse.yilmaz@ornek.com adresine yazın,2,yeni
  GB-0904,2026-10-05,destek,"Ödeme sorunu, Ayşe Yılmaz adına kayıtlı kart",2,yeni
  ```

- **Eylem:** Görünen metinler ve rapor incelenir.
- **Beklenen:**
  - GB-0901: `İptal ücreti kesildi, beni arayın *********34`.
  - GB-0902: `Ödeme sorunu var, numaram +**********43`.
  - GB-0903: `İptal ücreti için a***@ornek.com adresine yazın`.
  - GB-0904’te `Ayşe Yılmaz` değişmeden kalır.
  - Ham telefon ve e-posta kullanıcı adı panoda, DOM’da veya raporda bulunmaz.
  - Maskeleme eşleşmeleri ve puanları değiştirmez.
  - İsimlerin kalabileceğini belirten indirme uyarısı KK-46’ya göre görünür.

### KK-35 · Rapor biçimi ve dosya tarihi

**Tür:** başarı · **Kaynak:** K16, K25, K28, K31, K34, K35

- **Ön koşul:** KK-13 fixture’ı.
- **Eylem:** Rapor indirilir.
- **Beklenen:**
  - Dosya adı `radar-raporu-2026-10-05.md` olur; indirme günü kullanılmaz.
  - Dosya `# Radar raporu: 2026-10-05` başlığıyla başlar.
  - Başlığın hemen ardından gelen ilk içerik satırı tarih aralığını, kayıt sayısını ve kanal dağılımını belirtir (KK-47).
  - Her tema `##` başlığıdır.
  - T bölümünde puan **8,0**, kayıt sayısı **2**, ortalama **2,0** bulunur; değerler panoyla aynıdır.
  - Alıntılar GB-0030 ve GB-0133 sırasındadır. Yanlarında sırasıyla `2026-09-14 / destek / GB-0030` ve `2026-08-25 / magaza / GB-0133` yer alır.
  - Alıntılar maskelidir; sayım “kayıt” olarak adlandırılır.

### KK-36 · Teslim edilen kodda hiçbir dış kütüphane kullanılmaz

**Tür:** başarı · **Kaynak:** K3, K17, K29

- **Ön koşul:** Teslim edilen Radar dosyaları ve test kaynakları mevcut.
- **Eylem:** Dosyalar, bağımlılıklar ve test çalıştırma yöntemi incelenir.
- **Beklenen:**
  - Teslim edilen kodda dış kütüphane bulunmaz; paketlenmiş kopyalar da yasaktır.
  - HTML yalnız Radar’ın kendi dosyalarını yükler.
  - Çalışma zamanı bağımlılığı bulunmaz.
  - CSV ayrıştırma Radar’ın kendi koduyla yapılır.
  - K17 teslim edilen koda uygulanır. Testler Node’un yerleşik test aracıyla yazılır.

### KK-37 · Chrome, Safari ve Edge’in güncel sürümlerinde aynı sonuç alınır

**Tür:** başarı · **Kaynak:** K18, K29

- **Ön koşul:** Test günü itibarıyla üç tarayıcının en son kararlı sürümleri; sürümler test kaydına yazılır.
- **Eylem:** Belgedeki tarayıcıdan doğrulanan kriterler üç tarayıcıda çalıştırılır. Kaynak incelemeleri ve Node testleri ayrıca yürütülür.
- **Beklenen:** Tema sırası, sayılar, maskeleme, emoji, İ/I eşleşmesi, hata durumları ve rapor içeriği aynıdır. Performans her tarayıcıda KK-38’i sağlar.

### KK-38 · 5.000 satırlık dosyada pano 2 saniyenin altında açılır

**Tür:** başarı · **Kaynak:** K19, K29

- **Ön koşul:**
  - Örnek CSV’nin 33 tam kopyası ve ilk 50 veri satırıyla 5.000 veri satırı hazırlanır.
  - `id`’ler benzersiz olacak şekilde yeniden numaralanır.
  - Her kopyanın tarihleri kopya sırası kadar geriye alınır; ilk kopya değişmez.
  - Ölçüm ekibin standart dizüstü bilgisayarında yapılır; cihaz ve tarayıcı sürümü kaydedilir.
- **Eylem:** Dosya seçildiği andan pano tamamen görünene kadar geçen süre ölçülür. Her tarayıcıda 3 ölçüm yapılır.
- **Beklenen:** Dosya reddedilmez. Üç tarayıcıdaki bütün ölçümler **2 saniyenin altındadır**.

### KK-39 · İptal ücreti teması ücretli iptalleri ve iptal süresi veya politikası sorularını kapsar

**Tür:** sınır · **Kaynak:** K8, K21, K30

- **Ön koşul:** Onaylı sözlük ve örnek CSV yüklü.
- **Eylem:** İlgili kayıtların tema üyelikleri incelenir.
- **Beklenen:**
  - GB-0030, GB-0096, GB-0052, GB-0103, GB-0094, GB-0064 ve GB-0137, GB-0084 ile aynı iptal ücreti temasındadır.
  - GB-0075 ve GB-0123’ün ücretsiz iptal süresi soruları aynı temaya girer.
  - GB-0131 ve GB-0149’un iptal politikası soruları aynı temaya girer; ücret kelimesi aranması gerekmez.
  - GB-0020 ve GB-0070 bildirim temasına girer; yalnız bildirim yüzünden iptal anlattıkları için iptal ücreti temasına girmez.
  - K20’nin daha dar kapsamı yerine K21 ve K30 uygulanır.

### KK-40 · Tam örnek dosyanın beklenen sonuçları onaylı sözlükten hesaplanır

**Tür:** başarı · **Kaynak:** K1, K6, K9–K14, K21–K26, K30–K32, K34–K36

**Durum: sözlük onaylanınca betikle hesaplanır.**

- **Ön koşul:** Deniz’in onayladığı `data/temalar.json` mevcut; testte kullanılan sözlük ve örnek CSV sürümleri kaydedilmiş.
- **Eylem:**
  - Node’un yerleşik test aracıyla kullanılacak beklenen sonuçlar, örnek CSV ve onaylı sözlük üzerinden bir hesaplama betiğiyle üretilir.
  - Pano ve indirilen rapor bu sonuçlarla karşılaştırılır.
- **Beklenen:**
  - Betik geçerlilik, ileri tarih, tekrar ve çelişkili `id` kurallarını uygular.
  - Tema üyelikleri, “övgü” ve “diğer”, okunan ve atlanan sayıları ile atlanma nedenleri hesaplanır.
  - Geçerli kayıtların tarih aralığı, kanal dağılımı ve 14 günlük pencere hesaplanır.
  - Tema başına kayıt sayısı, ortalama, pay ve puan; ardından sıralama ve rapor alıntıları hesaplanır.
  - Puan ve ortalamalar K25’e göre gösterilir; eşitlikler K14 ve K26’ya göre çözülür.
  - Pano ve rapor hesaplanan sonuçlarla eşleşir.
  - Sözlük onayından önce tam dosya için hiçbir sıra, sayı veya alıntı seçimi bağlayıcı beklenti sayılmaz.

---

## 8. K21–K36 ile eklenen kriterler

### KK-41 · Olumlu yorumlar ayrı “övgü” temasında toplanır ve sıralamaya girmez

**Tür:** sınır · **Kaynak:** K21, K30

- **Ön koşul:** Fixture: GB-0033 ve GB-0047; onaylı sözlük mevcut.
- **Eylem:** Üyelikler, sıralama ve rapor incelenir.
- **Beklenen:**
  - GB-0033, sadakat puanından söz etmesine rağmen olumlu yorum olarak “övgü” temasında toplanır.
  - GB-0047 sadakat puanı sorununu anlatan temada kalır.
  - GB-0033, sorun temasının kayıt sayısını veya ortalamasını artırmaz.
  - “Övgü” sıralamaya ve raporun ilk 5 tema seçimine girmez.
  - Olumlu yorum “diğer” olarak sınıflandırılmaz.

### KK-42 · Tireli, parantezli ve başında sıfır olmayan Türkiye numaraları maskelenir

**Tür:** sınır · **Kaynak:** K15, K27

- **Ön koşul:** GB-0084’ün üç ayrı fixture’ında telefon sırasıyla `0532-555-12-34`, `(0532) 555 12 34` ve `532 555 12 34` yapılır.
- **Eylem:** Metin gösterilen yüzeylerde ve raporda incelenir.
- **Beklenen:**
  - Son iki hane dışındaki rakamlar maskelenir.
  - Metinler sırasıyla `****-***-**-34`, `(****) *** ** 34` ve `*** *** ** 34` telefon parçalarını içerir.
  - Ham numaralar panoda, DOM’da veya raporda bulunmaz.
  - Tema üyeliği ve puan değişmez.
  - Yurt dışı numaralar için sürüm 1 kabul testi aranmaz.

### KK-43 · Ek satır doğrulamaları uygulanır; UTF-8 BOM kabul edilir

**Tür:** hata ve sınır · **Kaynak:** K11, K13, K24

- **Ön koşul:** Geçerli bir satırdan ayrı fixture’lar hazırlanır; her fixture’da yalnız bir değişiklik yapılır.

| Değişiklik | Beklenen |
|---|---|
| Kanal `twitter` | Satır atlanır; bilinmeyen kanal nedeni görünür |
| Segment `vip` | Satır atlanır; geçersiz segment nedeni görünür |
| Tarih `05.10.2026` | Satır atlanır; geçersiz tarih biçimi nedeni görünür |
| Puan `4.5` | Satır atlanır; geçersiz puan nedeni görünür |
| `metin` yalnız boşluklardan oluşur | Satır atlanır; “boş metin” nedeni görünür |
| Eksik veya fazla alan | Satır atlanır; alan sayısı sorunu belirtilir |
| Kapanmamış tırnak | Bozuk CSV kaydı kullanılmaz; nedeni belirtilir |
| Doğru başlığın önüne UTF-8 BOM eklenir | Dosya kabul edilir; sonuç BOM’suz dosyayla aynıdır |
| Başlık `ID,tarih,kanal,metin,puan,segment` yapılır | Başlık uyuşmazlığı nedeniyle dosya bütünüyle reddedilir |

- **Eylem:** Fixture’lar ayrı ayrı yüklenir.
- **Beklenen:** Geçerli kanallar yalnız `destek`, `magaza`, `anket`; geçerli segmentler yalnız `yeni`, `duzenli`, `kurumsal` olur. Bozuk satırlar tema, puan ve tarih hesaplarına girmez.

### KK-44 · Bütün satırlar atlanırsa kullanılabilir satır olmadığı belirtilir

**Tür:** hata · **Kaynak:** K23, K24

- **Ön koşul:** Doğru başlıklı, yalnız GB-0140’ı içeren fixture.
- **Eylem:** Fixture yüklenir.
- **Beklenen:**
  - Pano yerine tam olarak **“Kullanılabilir satır yok”** yazar.
  - Okunan **1**, atlanan **1**, neden “boş metin” bilgisi görülebilir.
  - Tema veya puan sonucu oluşmaz.

### KK-45 · İleri tarihli satır atlanır ve pencereyi değiştirmez

**Tür:** hata ve sınır · **Kaynak:** K22, K31

- **Ön koşul:** Test günü `2026-10-08` olarak sabitlenir. KK-13 fixture’ına şu satır eklenir:

  ```csv
  GB-0905,2026-10-09,destek,Bildirim yine gecikti,1,yeni
  ```

- **Eylem:** Fixture yüklenir.
- **Beklenen:**
  - Okunan **4**, atlanan **1**; neden tam olarak **“ileri tarih”**.
  - GB-0905 hiçbir temaya veya “diğer” sayısına girmez.
  - En yeni geçerli tarih `2026-10-05`, pencere `2026-09-22…2026-10-05` kalır.
  - T puanı **8,0** kalır; rapor tarihi `2026-10-05` olur.
- **Sınır kontrolü:** Ek satırın tarihi `2026-10-08` yapılınca ileri tarih nedeniyle atlanmaz; bugünün tarihi geçerlidir.

### KK-46 · Rapor indirme düğmesinin yanında kişisel bilgi uyarısı görünür

**Tür:** başarı · **Kaynak:** K15, K33

- **Ön koşul:** Geçerli dosya yüklü; rapor indirme düğmesi görünür.
- **Eylem:** Düğmenin çevresi incelenir.
- **Beklenen:** Düğmenin yanında şu metin aynen görünür:

  > Alıntılarda isim ya da başka kişisel bilgi olabilir. Göndermeden önce okuyun.

### KK-47 · Rapor örneklem kapsamını ve kanal dağılımını belirtir; kayıt sayar

**Tür:** başarı · **Kaynak:** K23, K34, K35

- **Ön koşul:** KK-28’in tekrar satırı içeren küçük fixture’ı yüklenir.
- **Eylem:** Pano, rapor ve demo yönetim sunumu incelenir.
- **Beklenen:**
  - Raporun ana başlığından sonraki ilk içerik satırında:
    - Tarih aralığı: `2026-08-25…2026-10-05`.
    - Kullanılabilir kayıt sayısı: **3**.
    - Kanal dağılımı: `destek: 1`, `magaza: 1`, `anket: 1`.
  - Atlanan tekrar kapsam sayısını ve kanal dağılımını artırmaz.
  - Birden fazla temaya giren kayıt kapsam toplamında yalnız bir kez sayılır.
  - Pano ve rapor sayım etiketlerinde “kişi” yerine “kayıt” kullanılır.
  - Yönetim sunumunda sonuçlar **“örnek dosyaya göre”** ifadesiyle sunulur.

### KK-48 · Puan ile metin uyuşmazlığında kaynak puanı esas alınır

**Tür:** sınır · **Kaynak:** K1, K36

- **Ön koşul:** Ayrı fixture’larda şu satır yüklenir; ikinci fixture’da yalnız puan **5** yapılır:

  ```csv
  GB-0906,2026-10-05,destek,Ödeme başarısız oldu ve sorun çözülmedi,1,duzenli
  ```

- **Eylem:** İki fixture’ın ödeme teması sonuçları karşılaştırılır.
- **Beklenen:**
  - İki satır da aynı ödeme temasıyla eşleşir.
  - İlk fixture’da ortalama **1,0**, öncelik puanı **10,0**.
  - İkinci fixture’da ortalama **5,0**, öncelik puanı **2,0**.
  - Olumsuz metin nedeniyle kaynak puanı değiştirilmez, yeniden tahmin edilmez veya satır atlanmaz.
  - Puan–metin uyuşmazlığı sürüm 2 kapsamındadır.

---

## Karar ve kapsam durumu

- **E1:** Sözlüğün hazırlanma ve onay yöntemi, iptal kapsamı, övgü ayrımı ve tema ayrıntısı K21, K30 ve K32 ile karara bağlandı. Onaylı sözlüğün kendisi bekleniyor; KK-40 bu nedenle hesaplama bekliyor.
- **E14:** K22 ile kapandı.
- **E15:** K23 ile kapandı; farklı içerikli aynı `id` için K34 uygulanır.
- **E16:** K24 ve K31 ile kapandı.
- **E17:** K25 ile kapandı.
- **E18:** K26 ile kapandı.
- **E19:** Türkiye numaraları K27 ile kapsandı; yurt dışı numaralar sürüm 2’ye bırakıldı.
- **E20:** K28 ile kapandı.
- **E21–E22:** K29 ile kapandı.

**Sürüm 1’de kabul beklentisi olmayanlar:**

- Belirli bir temanın mutlaka birinci olması.
- Destek sistemindeki “günde 14” sayısının tutturulması.
- Platform ve sürüm analizi.
- Kanal ağırlığı ayarı.
- Tema alt kırılımları.
- Yurt dışı telefon numarası maskelemesi.
- Puan–metin uyuşmazlığının çözülmesi.

---

## Değişiklik listesi

| Kriter / bölüm | Karar | Ne değişti |
|---|---|---|
| Kaynaklar, nasıl okunur, karar durumu | K21–K36 | Kaynak kapsamı güncellendi; kapanmış sorular açık karar olmaktan çıkarıldı. Sözlük onayı bekleyen işler belirtildi. |
| KK-01 | K21, K23, K30, K34 | Okunan/atlanan tanımı, tekrar nedeni ve övgü ayrımı netleştirildi. Tam dosya sayıları KK-40’taki hesaplamaya bırakıldı. |
| KK-03 | K23 | Küçük fixture için okunan 2, atlanan 1 kesinleştirildi. |
| KK-05 | K24 | UTF-8 BOM’un başlık uyuşmazlığı olmadığı belirtildi. |
| KK-06 | K21, K32 | Skill önerisi, Deniz onayı, kullanıcı derdi düzeyinde sözlük ve övgü ayrımı eklendi. |
| KK-08 | K22, K25 | Pencere kesinleştirildi; puan Türkçe biçime çevrildi. |
| KK-09, KK-11 | K21, K30 | Tema testleri onaylı sözlüğe bağlandı. |
| KK-13–KK-15, KK-17 | K22, K25, K31 | Geçerli tarihler esas alındı; puan ve gösterilen ortalamalar Türkçe biçime çevrildi. |
| KK-16 | K21, K26 | Övgü sıralamadan çıkarıldı; Türkçe eşitlik sırası ve onay sonrası tam dosya hesabı belirtildi. |
| KK-18, KK-21 | K21, K28 | İlk 5’in sıralanan temalardan seçildiği, övgünün seçime girmediği ve dosya tarihinin kurala bağlı olduğu belirtildi. |
| KK-19, KK-26 | K27 | Genişleyen telefon kapsamına uyum sağlandı; telefon olmayan sayılar ve özgün metin korunmaya devam etti. |
| KK-22, KK-36 | K29 | Kütüphane yasağının teslim edilen koda uygulandığı; testlerin Node’un yerleşik aracıyla yazıldığı netleştirildi. |
| KK-27 | K23, K24 | Okunan/atlanan sayıları kesinleştirildi; nedenlerin görünmesi beklentisi korundu, açık soru kaldırıldı. |
| KK-28 | K23, K30 | İlk kopyanın tutulması ve sonraki kopyanın “tekrar” sayılması kesinleştirildi. Sözlüksüz tam dosya tema sayısı kaldırıldı. |
| KK-29 | K23, K34 | Aynı içerikli tekrar ile çelişkili `id` ayrıldı. Farklı içerikli iki satırın da atlanması ve sıra bağımsızlığı yazıldı. |
| KK-30 | K22, K25, K31 | 14 gün sınırı kesinleştirildi; atlanan tarihler dışlandı; Türkçe gösterim ve tam ortalamayla hesaplama belirtildi. |
| KK-31 | K23, K25, K34 | Okunan sayısı kesinleştirildi; ortalama bir ondalığa çevrildi; yarım yukarı yuvarlama testi ve “kayıt” etiketi eklendi. |
| KK-32 | K26 | Açık alfabe sorusu kaldırıldı; `localeCompare` ile `tr` sırası ve karşılaştırma örneği eklendi. |
| KK-34 | K33 | İsimlerin maskelenmemesi korundu; indirme uyarısına bağlantı eklendi. |
| KK-35 | K25, K28, K31, K34, K35 | En yeni geçerli tarihle dosya adı, ana başlık, `##` tema başlıkları, kapsam satırı ve Türkçe sayılar yazıldı. |
| KK-37 | K29 | Tarayıcı testleri, Node testleri ve kaynak incelemelerinin doğrulama ortamları ayrıldı; yeni kriterler kapsama alındı. |
| KK-38 | K29 | Standart ekip dizüstü ve dosya seçiminden pano görünene kadar ölçüm kesinleştirildi. |
| KK-39 | K21, K30 | İptal süresi ve politika soruları kapsama alındı; K20’nin dar kapsamı kaldırıldı. |
| KK-40 | K21, K30, K32 | Varsayılan kümeler, bütün sıra ve sayı tabloları, alıntı listeleri ve “ilk üç sıra kesin” iddiası kaldırıldı. “Sözlük onaylanınca betikle hesaplanır” olarak işaretlendi. |
| KK-41 — yeni | K21 | Övgü ayrımı ve sıralama dışında tutulması için küçük fixture testi eklendi. |
| KK-42 — yeni | K27 | Tireli, parantezli ve başında sıfır olmayan Türkiye numaraları için maskeleme testleri eklendi. |
| KK-43 — yeni | K24 | Segment, tarih biçimi, puan, boşluk metni, bozuk CSV ve BOM testleri eklendi. |
| KK-44 — yeni | K24 | Bütün satırlar atlanınca “Kullanılabilir satır yok” durumu eklendi. |
| KK-45 — yeni | K31 | İleri tarih nedeni, geçerli tarihten pencere ve bugünün geçerli olması testleri eklendi. |
| KK-46 — yeni | K33 | Rapor indirme düğmesi yanındaki uyarının tam metni eklendi. |
| KK-47 — yeni | K34, K35 | Kayıt sayımı, rapor kapsamı, kanal dağılımı ve “örnek dosyaya göre” sunum beklentisi eklendi. |
| KK-48 — yeni | K36 | Metinle uyuşmasa da kaynak puanının kullanılması testi eklendi. |