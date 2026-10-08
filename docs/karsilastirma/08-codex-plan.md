# Radar uygulama planı

Plan, **K1–K46’yı bağlayıcı** kabul eder; PRD ve kabul kriterlerindeki eski ifadeler bu kararlara göre yorumlanır. Teslim kapsamı **KK-01–KK-48**’dir. Hiçbir dosya yazılmadı.

Özellikle şu son kararlar uygulanacak:

- Tema adı **“İptal ücreti ve politikası”** olacak (K37).
- Övgü kelimelerle eşleşecek; aynı kayıt şikâyet temasında da eşleşirse orada da sayılacak, istek temaları sıralanacak (K39).
- Raporda öncelik puanına ek olarak **yeniliksiz temel puan** bulunacak (K40).
- E-posta `a***@***` biçiminde maskelenecek (K42); KK-34’teki eski beklenti kullanılmayacak.
- Bugün tarayıcının yerel tarihinden alınacak, testlere dışarıdan verilecek (K45).
- Rapor başlıkla başlayacak, kapsam satırı hemen altında bulunacak (K46).

## 1. Dosya yapısı

Sunucusuz ve ağ isteksiz açılış için çalışma zamanı **tek `index.html`** olacak: CSS ve JavaScript dosyanın içinde, JavaScript ise `type="module"` olarak bulunacak. Harici modül importu, `fetch`, CDN veya derleme adımı kullanılmayacak.

Tarayıcının diskten kendiliğinden `data/temalar.json` okuması yerine, başlangıçta kullanıcı bu dosyayı seçecek; içerik File API ile okunacak. Bu, planın açıkça belirtilen kullanım varsayımıdır.

| Dosya | Tek cümlelik görevi |
|---|---|
| `index.html` | Tek sayfalık arayüzü, stilleri, saf uygulama modüllerini ve tarayıcı bağlantılarını içerir. |
| `data/temalar.json` | Sonraki skill’in önerdiği ve Deniz’in onayladığı tema sözlüğünü taşır. |
| `data/ornek-geri-bildirim.csv` | Mevcut örnek veriyi tam dosya kabul testlerinin girdisi olarak korur. |
| `package.json` | Bağımlılık içermeden ES module kullanımını ve `"test": "node --test"` komutunu tanımlar. |
| `tests/helpers/load-module.js` | HTML içindeki işaretlenmiş ES module kaynağını okuyup Node’da aynı kodun test edilmesini sağlar. |
| `tests/helpers/fixtures.js` | Örnek CSV’den seçilen kayıtları ve kriterlerdeki sentetik fixture’ları hazırlar. |
| `tests/csv.test.js` | CSV ayrıştırma, doğrulama, tekrar ve çelişkili kimlik kurallarını sınar. |
| `tests/themes.test.js` | Normalizasyonu, sözlük eşleşmelerini ve övgü/diğer ayrımını sınar. |
| `tests/scoring.test.js` | Tarih penceresini, puanı, sıralamayı ve sayı gösterimini sınar. |
| `tests/privacy-report.test.js` | Maskelemeyi, alıntı seçimini ve Markdown raporunu sınar. |
| `tests/pipeline.test.js` | Örnek dosyanın uçtan uca sonucunu sabit beklenen sonuçlarla karşılaştırır. |
| `tests/hesapla-ornek.js` | Onaylı sözlükten KK-40’ın beklenen sonuçlarını ve girdi sürüm bilgilerini üretir. |
| `tests/fixtures/ornek-beklenen.json` | Sözlük onayından sonra hesaplanan üyelikleri, sayıları, sıralamayı ve rapor beklentilerini saklar. |
| `tests/helpers/performance-fixture.js` | KK-38’de tarif edilen 5.000 satırlık ölçüm dosyasını üretir. |
| `docs/dogrulama.md` | Gerçekten yapılan tarayıcı kontrollerini, sürümleri, cihazı ve performans ölçümlerini kaydeder. |

Test yükleyicisi yalnız Node’da çalışır; dosya üretmez ve uygulamanın ikinci bir kopyasını içermez. Tarayıcı başlangıcı bir ortam kontrolüyle ayrılır; Node importu sırasında DOM kodu çalışmaz.

## 2. Modüller ve sınırları

Modüller ayrı sorumluluklara sahip olacak, fakat çalışma zamanındaki tek HTML koşulu nedeniyle **aynı ES module içinde** bulunacak.

| Modül | Sorumluluk ve sınır |
|---|---|
| **CSV** | Metni başlık, kayıtlar ve ayrıştırma hatalarına dönüştüren saf fonksiyonlardır; dosya veya DOM okumaz. |
| **Doğrulama ve tekilleştirme** | Kayıtları verilen `today` ile doğrular, çelişkili `id`’leri ve tekrarları ayırır, kullanılabilir kayıtları ve atlama nedenlerini döndürür. |
| **Tema sözlüğü ve eşleştirme** | Sözlük yapısını doğrular, eşleştirme için metni normalleştirir ve kayıt başına benzersiz tema üyelikleri üretir. |
| **Analiz ve puan** | Kullanılabilir kayıtların kapsamını, kanal dağılımını, tarih penceresini, tema istatistiklerini ve sırasını hesaplar. |
| **Maskeleme ve gösterim** | Telefon/e-posta maskesini ve Türkçe sayı biçimini üretir; kaynak metni veya hesaplama değerlerini değiştirmez. |
| **Rapor** | Analiz sonucundan dosya adını ve Markdown metnini üretir; indirme işlemi yapmaz. |
| **Tarayıcı bağlantısı** | Dosya seçimi, File API, yerel bugün, uygulama durumu, DOM güncellemesi, Blob indirmesi ve performans ölçümünü yönetir. |

Veri akışı:

```text
CSV metni → ayrıştırma → doğrulama → çelişkili id → tekrar
          → kullanılabilir kayıtlar → tema üyelikleri → analiz
          → maskeli gösterim verisi → pano / Markdown raporu
```

Temel sınırlar:

- **Kaynak metin korunur:** Normalizasyon yalnız eşleştirmede kullanılır; alıntı kaynak metinden alınır ve maskelenir.
- **Ham metin DOM’a girmez:** Gizli alanlar ve `data-*` öznitelikleri dahil, görüntülenecek metin önce maskelenir ve `textContent` ile yerleştirilir.
- **Bir kayıt bir temada bir kez sayılır:** Birden fazla kuralın eşleşmesi o temanın sayısını artırmaz; farklı temalarda eşleşmesi artırır.
- **Kapsam kaydı bir kez sayar:** Tema toplamları örtüşebilse de rapor kapsamı ve kanal dağılımı kullanılabilir kayıtlar üzerinden hesaplanır.
- **Övgü üyeliği şikâyet üyeliğini silmez:** Övgü puanlanmaz, diğerin üstünde yalnız sayısıyla görünür; hiçbir temayla eşleşmeyen kayıt diğer olur.
- **Hesaplama gösterimden bağımsızdır:** Ortalama ve puan ara adımlarda yuvarlanmaz; sıralama gösterilen bir ondalığa göre yapılmaz.
- **Tarih hesabı takvim günleriyle yapılır:** Yerel bugün dışarıdan alınır; 14 günlük pencere saat ve yaz saati farklarından etkilenmez.
- **Yüklemeler birbirine karışmaz:** Yeni CSV bağımsız hesaplanır; tamamlanan sonuç tek seferde yerleştirilir ve eski yükleme yeni sonucu ezemez.

## 3. Uygulama sırası

Her adımın sonunda sayfa açılır, o aşamanın işi kullanıcı tarafından denenebilir ve mevcut testler `npm test` ile geçer. Henüz eklenmemiş özellikler için sahte sonuç gösterilmez.

| Adım | Yapılacak iş ve çalışır çıktı | “Bitti” ölçütü | KK kapsamı |
|---|---|---|---|
| **1 — İskelet** | Yerel HTML açılışı, sözlük/CSV seçim alanları, boş durum, hata alanı ve Node test bağlantısı kurulur. | Üç tarayıcıda sayfa ağ olmadan açılır; inline ES module Node’da da yüklenir; `npm test` geçer. | KK-36; KK-22, KK-23 ve KK-37’nin başlangıç kontrolü. |
| **2 — CSV okuma** | Ayrıştırıcı, sabit başlık, BOM, alan doğrulamaları, ileri tarih, çelişkili `id` ve tekrar işlemleri eklenir; ekranda okunan/atlanan özeti gösterilir. | Virgül, kaçışlı tırnak ve emoji korunur; hatalı dosya reddedilir, hatalı kayıt atlanır; tüm kayıtlar atlanınca tam mesaj görünür; ardışık dosyalar birleşmez. | KK-02–05, KK-43–44; KK-27–29 ve KK-45’in girdi kısmı. |
| **3 — Tema eşleştirme** | Yerel JSON okuma, sözlük doğrulama, Türkçe normalizasyon ve çoklu üyelik eklenir; tema adları ve sayıları görülebilir. | Tema adları yalnız sözlükten gelir; İngilizce ve karaktersiz eşler doğru üyeliklere girer; övgü/diğer ve bildirim kaynaklı iptal ayrımı uygulanır. | KK-06–07, KK-09–12, KK-39; KK-08 ve KK-41’in üyelik kısmı. |
| **4 — Puan** | Geçerli kayıtların tarih penceresi, ortalama, temel puan, yenilik, öncelik ve sıralama hesaplanır. | Küçük fixture’ların sayısal beklentileri tutar; kanal/segment sonucu değiştirmez; kaynak puan kullanılır; yuvarlama yalnız gösterimde yapılır. | KK-13–15, KK-17, KK-30, KK-32, KK-48; KK-27–29 ve KK-45’in sayısal kısmı. |
| **5 — Pano** | Nihai tema tablosu, atlama nedenleri, Türkçe sayılar ve övgü/diğer yerleşimi tamamlanır. | Ad, öncelik, kayıt sayısı ve ortalama görünür; övgü ve diğer puansızdır; hata/boş durumlar tutarlıdır; ham kişisel veri DOM’a girmez; performans ölçülür. | KK-16, KK-31, KK-38; KK-01, KK-08, KK-24–26, KK-34, KK-41–42 ve KK-47’nin pano kısmı. |
| **6 — Rapor** | İlk beş tema, temel puan, en yeni üç maskeli alıntı, kapsam satırı, dosya adı ve indirme eklenir. | İndirilen Markdown panoyla tutarlıdır; tarih ve `id` eşitlikleri doğrudur; eksik tema/alıntı doldurulmaz; uyarı aynen görünür; tam dosya ve tarayıcı kontrolleri tamamlanır. | KK-18–21, KK-33, KK-35, KK-46; KK-40 ve önceki adımların rapor kısımları; KK-22–23, KK-37’nin tam doğrulaması. |

**Sözlük bağımlılığı:** İlk iki adım onaylı sözlük olmadan tamamlanabilir. Sonraki adımlar sentetik test sözlüğüyle geliştirilebilir; gerçek sözlük gerektiren KK’lar Deniz’in onayı olmadan geçmiş sayılmaz. Plan şimdi sözlük içeriği üretmez.

**Puan sözleşmesi:**

```text
Temel puan = kayıt sayısı × (6 − tam ortalama)
Yenilik    = 1 + pencere içindeki tema kayıtları / bütün tema kayıtları
Öncelik    = temel puan × yenilik
```

Rapor **önceliğe göre** ilk beşi seçer ve her biri için temel puanı da yazar.

## 4. Test stratejisi

### Node: `npm test`

Yalnız `node:test`, `node:assert/strict` ve gereken yerleşik Node modülleri kullanılır.

| Test alanı | Doğrulanacak KK’lar |
|---|---|
| CSV, başlık, doğrulama, sayım, tekrar ve çelişki | KK-01–05, KK-27–29, KK-43–45’in veri sonuçları |
| Sözlük, normalizasyon ve üyelik | KK-06–12, KK-39, KK-41 |
| Formül, tarih, sıralama ve sayı biçimi | KK-13–17, KK-30–32, KK-45, KK-48 |
| Maskeleme ve üyelik/puan korunması | KK-24–26, KK-34, KK-42; e-posta beklentisi K42’ye göre |
| Rapor içeriği ve alıntı seçimi | KK-18–21, KK-33, KK-35, KK-47; ayrıca K40 temel puanı |
| Tam örnek dosya | KK-40 ve KK-01’in tam dosya beklentileri |

Test günü sabit verilir; KK-45 için `2026-10-08` kullanılır. Tarih sınırları, Türkçe harf eşleşmeleri, yarım yukarı yuvarlama ve çelişkili satırların ters sırada verilmesi ayrıca sınanır.

KK-40 beklentileri sözlük onayından sonra betikle üretilir; sözlük ve CSV özeti ile test günü kaydedilir. **Normal `npm test` çalışması beklenti dosyasını yeniden üretmez.** Küçük fixture’larda sabit üyelik ve sayısal beklentiler bulunur; böylece uygulamanın kendi çıktısıyla karşılaştırılması tek doğrulama yöntemi olmaz.

### Tarayıcı: elle veya mevcut tarayıcı ajanıyla

Chrome, Safari ve Edge’de gerçek dosya seçimiyle şu kontroller yapılır:

- Dosya reddi, yükleme değişimi ve kullanılabilir kayıt yok durumu: KK-01, KK-03–05, KK-27–29, KK-43–45.
- Pano alanları, sıralama, övgü/diğer yerleşimi ve etiketler: KK-08, KK-12, KK-14, KK-16–17, KK-31, KK-41, KK-47.
- DOM’da ham telefon/e-posta bulunmaması: KK-24–26, KK-34, KK-42.
- Gerçek indirme, dosya adı, Markdown içeriği ve uyarı: KK-18–21, KK-33, KK-35, KK-46–47.
- Ağ kaydı ve bağlantı kesildikten sonraki sonuç eşitliği: KK-22–23.
- Tarayıcılar arasında sonuç eşitliği: KK-10, KK-37, KK-40.
- Standart ekip dizüstünde her tarayıcıda üç ölçümün de iki saniyenin altında olması: KK-38.

KK-36 ayrıca kaynak ve bağımlılık incelemesiyle doğrulanır. KK-47’nin **“örnek dosyaya göre”** sunum ifadesi demo sırasında kontrol edilir. Node testleri tarayıcı davranışını veya performans kriterini geçmiş saydırmaz.

## 5. Riskler ve cevabı olmayan sorular

K37–K46 ile kapanan PRD soruları yeniden açılmayacak. Kalan noktalar:

1. **Yerel sözlük yükleme — kullanım varsayımı:** Sunucu ve ağ isteği olmadan JSON’un File API ile seçilmesi planlandı; Deniz’in her açılışta sözlüğü seçmesi kabul edilen kullanım mı?
2. **Sözlük — teslim bağımlılığı:** `data/temalar.json` henüz yok; K37 onay tarihini belirliyor fakat gerçek içerik olmadan üyelik testleri ve KK-40 kapatılamaz.
3. **Bozuk CSV ve satır sayımı — tanım boşluğu:** Çok satırlı tırnaklı metinde “okunan” fiziksel satırı mı mantıksal kaydı mı sayacak; kapanmamış tırnak için K44’ün hangi nedeni kullanılacak? Plan varsayımı mantıksal kayıt sayımıdır; sonda kalan satır sonu ek kayıt sayılmaz.
4. **Birden fazla hata — öncelik boşluğu:** Aynı kayıtta birden fazla hata veya geçersiz kayıtla çelişkili `id` varsa hangi neden öncelikli olacak? Plan varsayımı doğrulama → geçerli kayıtlarda çelişki → tekrar sırasıdır ve her atlanan kayıt tek nedenle sayılır.
5. **Performans — ölçüm ortamı:** “Standart ekip dizüstü”nün cihazı ve ölçüm ayarları belirtilmemiş; KK-38 için bunlar sabitlenmeli ve dosya okuma, hesaplama ile görünür çizimin tamamı süreye dahil edilmelidir.