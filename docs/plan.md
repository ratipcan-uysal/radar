# Radar uygulama planı

Kaynaklar `docs/prd.md` (sürüm 2), `docs/kararlar.md` (K1-K46) ve `docs/kabul-kriterleri.md` (KK-01…KK-48). Kabul kriterleriyle kararlar çeliştiğinde kararlara uydum (11 Ekim notu). Çelişkileri §5'te listeledim.

---

## 0. Plana temel olan varsayımlar

- **Ham metin hesap katmanında kalır.** Hesap katmanı panoya ve rapora yalnız maskeli metin verir. Ham telefon ya da e-posta DOM'a ve rapora hiç ulaşmaz (KK-24, KK-34, KK-42).
- **Pano da alıntı gösterir.** Her temanın altında rapordaki 3 maskeli alıntı açılıp kapanan bir alanda durur. K3 "panoda maskelenir" dediği için panoda metin bekleniyor.
- **Reddedilen dosya panoyu tamamen temizler.** KK-05 iki seçeneğe izin veriyor; karışık pano çıkma riski en az olan bu.
- **"Bugün" dışarıdan verilir.** Tarayıcıda yerel tarih bileşenlerinden (`getFullYear/getMonth/getDate`) hesaplanır, `toISOString()` kullanılmaz çünkü o UTC verir. Testlerde parametre olarak geçilir (K45).
- **Puan kesirli sayıyla hesaplanır, ondalıkla değil.** Puan = n × (6 − toplam/n) × (yeni/n + 1) = (6n − toplam)(n + yeni) / n. Eşitlik kontrolü (K14) ve yarım yukarı yuvarlama (K25) tam sayılarla yapılır, kayan nokta hatası olmaz. Örnek, KK-30: (24−7)·6/4 = 25,5.
- **Türkçe harf dönüşümü elle yazılır.** `İ→i`, `I→i`, `ı→i`, `ş→s`, `ğ→g`, `ü→u`, `ö→o`, `ç→c`, ardından `toLowerCase()`. `toLocaleLowerCase('tr')` kullanılmaz, böylece üç tarayıcıda aynı sonuç çıkar (KK-10, KK-37).

---

## 1. Dosya yapısı

```
index.html                 Tek sayfa: dosya seçici, durum alanı, pano kabı, "Raporu indir" düğmesi ve K33 uyarısı.
radar.css                  Panonun düz CSS stili.
package.json               "type": "module", "scripts": { "test": "node --test" }, bağımlılık yok.
README.md                  Sayfanın nasıl açılacağı ve testlerin nasıl çalışacağı (birkaç satır).

src/
  csv.js                   CSV metnini alan dizilerine böler: tırnak, çift tırnak kaçışı, CRLF/LF, BOM.
  tarih.js                 YYYY-AA-GG doğrular (2026-02-30 dahil), gün çıkarır, 14 günlük pencereyi hesaplar.
  dogrula.js               Başlığı kontrol eder, satırları doğrular, tekrar ve çelişkili id'yi ayıklar; okunan, atlanan ve nedenleri üretir.
  normalize.js             Metni eşleştirme için Türkçe küçük harfe ve aksansız biçime çevirir.
  sozluk.js                temalar.json'un şemasını doğrular ve kuralları normalize edilmiş biçime getirir.
  tema.js                  Her kaydı temalara, "övgü"ye ya da "diğer"e atar.
  puan.js                  Tema başına sayı, toplam puan, pencere içi sayı, puan, temel puan ve sıralamayı hesaplar.
  maske.js                 Telefon (K15, K27) ve e-posta (K42) maskesini uygular.
  bicim.js                 Kesirli sayıyı Türkçe tek ondalığa çevirir (yarım yukarı, virgül ayraç).
  alinti.js                Tema başına en yeni 3 kaydı seçer (tarih azalan, sonra id artan).
  analiz.js                Saf ana fonksiyon: analizEt(csvMetni, sozluk, bugun) → Sonuc.
  rapor.js                 Sonuc'tan markdown metnini ve dosya adını üretir.
  pano.js                  Sonuc'u DOM'a çizer (tarayıcıya bağlı).
  uygulama.js              Giriş noktası: sözlüğü yükler, dosya seçimini dinler, analizi çalıştırır, panoyu çizer, raporu indirtir.

data/
  ornek-geri-bildirim.csv  Mevcut örnek dosya.
  temalar.json             Onaylı sözlük; skill önerir, Deniz onaylar (K21, K37).

tests/
  yardimci.js              Örnek CSV'den id listesiyle satırları aynen kopyalayıp fixture metni kurar.
  fixtures/test-sozluk.json  Ürün sözlüğünden bağımsız, yalnız testler için küçük sözlük (T/B/İ/Ö temaları ve övgü).
  csv.test.js, tarih.test.js, dogrula.test.js, normalize.test.js, tema.test.js,
  puan.test.js, maske.test.js, bicim.test.js, alinti.test.js, rapor.test.js
                           Her modülün kendi birim testleri.
  kabul.test.js            Fixture'lı KK'lar; analizEt ve rapor.js üzerinden uçtan uca, test sözlüğüyle.
  sozluk-onayli.test.js    Onaylı sözlüğe bağlı KK'lar (06, 09-12, 39, 41); temalar.json yoksa nedenini yazarak atlanır.
  ornek-dosya.test.js      KK-40: tam örnek dosyanın sonucunu onaylı beklenen değerlerle karşılaştırır.
  kaynak.test.js           KK-36/KK-22 statik kontrolü: dış URL, dış import, bağımlılık yok; saf modüllerde DOM/fetch yok.
  beklenen/hesapla.mjs     K38 betiği: örnek CSV ve onaylı sözlükten beklenen sonuçları üretir.
  beklenen/ornek-sonuc.json  Betiğin ürettiği, Deniz'in onayladığı beklenen değerler.
  araclar/buyuk-dosya.mjs  KK-38 için 5.000 satırlık dosyayı tarifine göre üretir.
```

## 2. Modüller ve aradaki sınır

```
 TARAYICI KATMANI (test edilmez, elle ya da ajanla doğrulanır)
 uygulama.js : fetch('data/temalar.json'), File.text(), new Date() → bugun,
               Blob + URL.createObjectURL + <a download>
 pano.js     : yalnız textContent ile yazar (innerHTML yok)
        │ csvMetni, sozluk, bugun                 ▲ Sonuc (yalnız maskeli metin)
        ▼                                         │
 SAF KATMAN (node --test ile test edilir)
 analizEt = csv → dogrula(bugun) → tema(sozluk) → puan → alinti → maske
 rapor.js : raporMetni(Sonuc), dosyaAdi(Sonuc)
 yardımcılar: tarih, normalize, bicim, sozluk
```

- **Saf modüller** (`src/` altında `pano.js` ve `uygulama.js` dışındaki her şey) `document`, `window`, `fetch`, `Date.now()` ya da `new Date()` kullanmaz. Sözlük ve bugün parametre olarak gelir. `kaynak.test.js` bunu metin taramasıyla zorlar.
- **Sonuc sözleşmesi:**
  - `durum`: `'red' | 'bos' | 'tamam'`
  - `redNedeni`: sabit metin; dosya içeriği hiç yankılanmaz (KK-04)
  - `okunan`, `atlanan`, `nedenler: {neden: sayı}`: K44 sırasıyla
  - `kapsam: {ilk, son, kayit, kanallar}`
  - `pencere: {bas, son}`
  - `temalar[]`: sıralı; her biri `{ad, kayit, ortalama, puan, temelPuan, alintilar[]}`
  - `ovgu: {kayit}`, `diger: {kayit}`, `sozlukSurumu`
- **Biçimlendirme `bicim.js` içinde yapılır.** Sayılar Sonuc'ta kesir olarak (pay/payda) durur. Pano ve rapor aynı fonksiyonla biçimlendirir, bu yüzden iki yerde de aynı sayı görünür (KK-35).
- **Sözlük yükleme farkı:** tarayıcı `fetch`, Node testleri `readFileSync` kullanır. İkisi de aynı `sozlukHazirla(json)` fonksiyonuna verir.

## 3. Uygulama sırası

Her adımın sonunda `npm test` yeşildir ve sayfa açılıp bir şey gösterir.

### Adım 0: İskelet
- **Yapılacak:** `package.json`, `index.html`, boş `uygulama.js` (sözlüğü yükler, "Dosya seçin" yazar), `kaynak.test.js`, `README.md`.
- **Bitti ölçütü:**
  - `npm test` geçer.
  - Sayfa (Soru 1'deki yöntemle) açılır, konsolda hata yoktur.
  - Ağ kaydında yalnız kendi dosyaları görünür.
  - `temalar.json` yoksa sayfada anlaşılır bir hata çıkar.
- **KK:** KK-36 (statik kısım), KK-22 (açılış istekleri).

### Adım 1: CSV okuma ve doğrulama
- **Yapılacak:** `csv.js`, `tarih.js`, `dogrula.js`. Geçici pano yalnız okunan, atlanan, nedenler, ret mesajı ve "Kullanılabilir satır yok" gösterir.
- **Doğrulama sırası:**
  1. Başlık birebir karşılaştırılır (BOM atıldıktan sonra; büyük-küçük harf duyarlı). Uymazsa dosyanın tamamı reddedilir.
  2. Her satıra tek neden verilir: eksik alan → geçersiz tarih → ileri tarih → bilinmeyen kanal → geçersiz puan (yalnız `^[1-5]$`) → bilinmeyen segment → boş metin (yalnız boşluk da boştur).
  3. Geçerli satırlar id'ye göre gruplanır. İçerikleri farklıysa gruptaki hepsi "çelişkili id" olur. Aynıysa ilki tutulur, diğerleri "tekrar" olur.
  4. Farklı id'li ama id dışındaki alanları aynı satırlarda ilki tutulur, diğerleri "tekrar" olur.
- **Bitti ölçütü:**
  - Örnek dosyada GB-0140 "boş metin", GB-0150 "tekrar" nedeniyle atlanır; GB-0139 tutulur.
  - KK-29 (b) ile (c) aynı sonucu verir.
  - xlsx baytları reddedilir.
- **KK:**
  - Tam: KK-02, KK-03, KK-04, KK-05, KK-43, KK-44, KK-27, KK-28, KK-29 (sayım kısımları).
  - Kısmi: KK-45 (atlama kısmı), KK-31 (okunan/atlanan), KK-01 (atlama kısmı).

### Adım 2: Tema eşleştirme
- **Yapılacak:** `normalize.js`, `sozluk.js`, `tema.js`, `tests/fixtures/test-sozluk.json`. Pano tema adını, kayıt sayısını, övgüyü ve diğeri gösterir.
- **Önerilen sözlük şeması (Soru 2):**
  - Her temada `kurallar` var. Her kural normalize edilmiş ifadelerden oluşan bir listedir; listedeki bütün ifadeler metinde geçerse kural tutar (VE).
  - Temanın kurallarından herhangi biri tutarsa kayıt temaya girer (VEYA).
  - Bu yapı GB-0094 ve GB-0146'nın "iptal + para" durumunu yakalar. GB-0020 ve GB-0070'in "bildirim yüzünden iptal" kayıtlarını ise iptal temasının dışında bırakır (KK-39).
- **Bitti ölçütü:**
  - Test sözlüğüyle GB-0105 üç temaya girer.
  - GB-0013, GB-0100 ve GB-0034 aynı temaya girer.
  - Övgü-yalnız kayıt "diğer"e düşmez.
  - Bozuk sözlük JSON'u açık bir hata verir.
- **KK:**
  - Tam: KK-07, KK-10.
  - Mekanizma olarak: KK-06, KK-41.
  - Kısmi: KK-08 (sayım), KK-48 (eşleşme).
  - Testleri yazılır ama atlanır: KK-09, KK-11, KK-12, KK-39 (onaylı sözlük gelene kadar).

### Adım 3: Puan ve sıralama
- **Yapılacak:** `puan.js`, `bicim.js`, `analiz.js`. Pencere yalnız geçerli satırlardan hesaplanır, "diğer" ve "övgü" kayıtları da buna dahildir (KK-08). Temel puan (K40) ayrıca tutulur.
- **Sıralama:** puan azalan → kayıt sayısı azalan → `localeCompare(…, 'tr')`. Övgü ve diğer sıralamaya girmez.
- **Bitti ölçütü:**
  - KK-13 fixture'ında T 8,0 çıkar.
  - KK-30'da B 25,5 çıkar ve gösterilen ortalama 1,8 olur.
  - `bicim(5,4)` "1,3", `bicim(124,100)` "1,2" verir.
- **KK:** KK-08, KK-13, KK-14, KK-15, KK-17, KK-30, KK-31 (sayılar), KK-32, KK-45, KK-48. KK-27, KK-28 ve KK-29'un puan kısımları da kapanır.

### Adım 4: Pano
- **Yapılacak:** `maske.js`, `alinti.js`, `pano.js`.
  - Pano üstte okunan, atlanan ve nedenleri gösterir.
  - Altında sıralı temalar gelir: ad, puan, kayıt sayısı, ortalama ve açılıp kapanan maskeli alıntılar.
  - Ardından "Övgü: n kayıt", en altta "Diğer: n kayıt".
  - Bütün etiketlerde "kayıt" yazar, "kişi" yazmaz.
- **Maske kuralı:**
  - `+`, rakam, boşluk, tire ve parantezden oluşan dizileri adaylar.
  - Adayda rakam sayısı 10-12 olmalı ve başı 0, +90 ya da 5 olmalı.
  - Son iki rakam dışındaki rakamlar `*` olur, ayraçlar yerinde kalır.
  - E-posta `a***@***` olur.
- **Bitti ölçütü:**
  - Örnek dosyada DOM'da `0532` ya da `987 65` aranınca bulunmaz.
  - "50 TL", "5.2" ve "3D Secure" değişmeden kalır.
  - Arka arkaya iki dosya yüklenince sonuçlar birleşmez.
  - Ret mesajından sonra pano boştur.
- **KK:**
  - Tam: KK-16, KK-24, KK-25, KK-26, KK-34, KK-42, KK-44 (ekran).
  - Kısmi: KK-31 (görsel), KK-05 (temizleme), KK-28 (ardışık yükleme), KK-47 (etiket).

### Adım 5: Rapor
- **Yapılacak:** `rapor.js`, indirme düğmesi ve yanında K33 uyarısı (aynen).
- **Rapor biçimi:**
  - Ad: `radar-raporu-<enYeniGeçerliTarih>.md`.
  - İlk satır `# Radar raporu: <tarih>`, hemen altında kapsam satırı (K46).
  - Sıralamadaki ilk 5 tema, her biri `##` başlıklı. Başlık altında puan, temel puan, kayıt sayısı, ortalama ve en fazla 3 alıntı yer alır. Alıntıların yanında `tarih / kanal / id` yazar.
- **Bitti ölçütü:**
  - KK-35 fixture'ında rapor metni beklenen satırlarla birebir eşleşir.
  - İndirilen dosya üç tarayıcıda da doğru adla iner.
- **KK:** KK-18, KK-19, KK-20, KK-21, KK-33, KK-35, KK-46, KK-47. KK-24, KK-25, KK-34 ve KK-42'nin rapor tarafı da kapanır.

### Adım 6: Onaylı sözlük ve kapanış (13-15 Ekim)
- **Yapılacak:**
  - `data/temalar.json` gelir; `sozluk-onayli.test.js` atlanmadan çalışır.
  - `hesapla.mjs` beklenen sonuçları üretir, Deniz onaylar, `ornek-sonuc.json` olarak repoya girer.
  - Ölçüm ve tarayıcı turu yapılır.
- **Bitti ölçütü:** `npm test` hiç testi atlamadan yeşildir ve üç tarayıcıdaki kontrol listesi doldurulmuştur.
- **KK:** KK-01, KK-06, KK-09, KK-11, KK-12, KK-39, KK-40, KK-41 (sözlükle), KK-22, KK-23, KK-37, KK-38.

## 4. Test stratejisi

| Yöntem | KK | Not |
|---|---|---|
| **Birim/uçtan uca, test sözlüğüyle** (`node --test`) | 02, 03, 04, 05, 07, 08, 10, 13, 14, 15, 17, 19, 20, 21, 24, 25, 26*, 27, 28, 29, 30, 31, 32, 33, 34, 35, 42, 43, 44, 45, 47, 48 | Fixture'lar `yardimci.js` ile örnek CSV'den aynen kopyalanır. KK-45'te bugün `2026-10-08` verilir. Maske testleri hem `maske.js` üzerinde hem de "Sonuc'un JSON'unda ham numara yok" kontrolüyle yapılır. |
| **Birim, onaylı sözlükle** | 01, 06, 09, 11, 12, 26 (rapordaki alıntılar), 39, 40, 41 | Sözlük yokken nedeni yazılarak atlanır, `npm test` kırmızıya dönmez. |
| **Statik kaynak taraması** (`kaynak.test.js`) | 36, 22 (kod kısmı) | `http(s)://`, dış `import`, CDN, `package.json` bağımlılığı ve saf modüllerde DOM/fetch aranır. |
| **Tarayıcıda, ajanla** (Chrome) | 01, 04, 05, 16, 24, 28, 31, 34, 42, 44, 46 | Sayfa açılır, fixture'lar yüklenir, DOM metni ve ekran görüntüsü kontrol edilir. Ajan aracı teslim edilen koda girmez (K29). |
| **Tarayıcıda, elle** | 22 ve 23 (ağ kaydı, çevrimdışı), 37 (Chrome, Safari, Edge), 38 (ekip dizüstü, 3 ölçüm × 3 tarayıcı) | KK-37'de tarayıcıya bağlı noktalara bakılır: `localeCompare('tr')`, `File.text()` ile emoji, `<a download>`, İ/I. Ölçüm için `uygulama.js` dosya seçiminden çizime kadar geçen süreyi konsola yazar. |
| **Demo kontrol listesi** | 47 ("örnek dosyaya göre" ifadesi) | Kodla ilgili değil, sunum metni. |

## 5. Riskler ve açık sorular

### Riskler
- **Sözlük kritik yolda.** Onay en geç 13 Ekim, demo 16 Ekim. Önlem: mekanizma test sözlüğüyle önceden bitmiş olur, sözlük gelince yalnız veri değişir. Basit anahtar kelime listesi yetmez:
  - GB-0033 sadakat puanını övüyor. Sadakat teması bunu yakalamamalı (KK-41), bu yüzden sadakat kuralları bir sorun kelimesi içermeli.
  - GB-0094 ve GB-0146 "iptal" ile "para"nın birlikte geçmesini gerektiriyor.
- **Övgü kelimeleri istekleri de yakalayabilir.** Örneğin "teşekkür" kelimesi, istek kaydı olan GB-0134'ü (3 puan) övgüye alır. K39'a göre bu kayıt başka temada da sayılmaya devam eder, puan değişmez. Ama övgü sayısı şişer.
- **Kriterlerle kararlar çelişiyor; testler kararlara göre yazılacak:**
  - KK-34 e-postayı `a***@ornek.com` bekliyor, K42 `a***@***` diyor.
  - KK-43'teki "geçersiz segment / geçersiz tarih biçimi / alan sayısı sorunu" yerine K44'teki ifadeler kullanılacak.
  - KK-35 temel puanı istemiyor, K40 istiyor.
  - PRD §6'daki e-posta biçimi eski.
  - Kriter belgesinin güncellenmesi gerekiyor.
- **Beklenen değerler kendini doğrulayabilir.** KK-40 betiği uygulamanın kendi modüllerini kullanırsa test, kodu kendisiyle karşılaştırır (Soru 5).
- **Performans düşük risk.** 5.000 satır ve birkaç düzine kuralla hesap milisaniyeler sürer. Panoya yalnız tema başına 3 alıntı basıldığı için DOM küçük kalır.

### Kararlarda cevabı olmayan sorular
1. **Sayfa nasıl açılacak? (Mert)** `index.html` çift tıkla (`file://`) açılırsa Chrome ES module importlarını ve `fetch('data/temalar.json')` çağrısını engeller. Önerim yerel statik dosya sunucusu: `python3 -m http.server`, macOS'ta kurulu geliyor. Bu da yalnız `localhost`'a istek yapar, dolayısıyla KK-22 "kendi adresi" koşuluna uyar. Bu, K3'teki "sunucu yok" kuralına aykırı sayılır mı? Sayılırsa tek alternatif bütün kodu ve sözlüğü tek HTML dosyasına gömmek. Bu da ya derleme adımı ister ya da modül yapısını bozar.
2. **`temalar.json` şeması kimde? (Deniz, skill)** Skill'in çıktı biçimi tanımlı değil. Önerdiğim şema:
   ```json
   { "surum": "...", "temalar": [{ "ad": "...", "kurallar": [["iptal", "ucret"], ["cancellation fee"]] }], "ovgu": { "kurallar": [] } }
   ```
   Skill doğrudan bu biçimde mi üretecek, yoksa öneriyi biz mi çevireceğiz? İki durumda da onay bu dosya üzerinden verilmeli.
3. **K44 dışında kalan satır durumları hangi nedenle yazılacak? (Deniz, Ece)** Kapanmamış tırnak, fazla alan ve tırnak içinde satır sonu için K44'te ifade yok. "Okunan" fiziksel satır mı, CSV kaydı mı? Bu ikisi yalnız çok satırlı metinde ayrışır. Önerim:
   - Satır satır ayrıştırma; satır sonu kayıt içinde izinli değil.
   - Fazla alan da kapanmamış tırnak da "eksik alan" nedeniyle atlanır.
   - Bozuk satır id ve tekrar kontrollerine girmez.
   - Bir satırda birden çok sorun varsa §3 Adım 1'deki sıraya göre tek neden yazılır.
4. **Maske yıldızları markdown'da biçim bozuyor. (Deniz)** `**** *** ** 34` gibi bir alıntı Confluence'ta kalın ya da italik yazıya dönüşebilir. Yıldızı `\*` diye kaçırırsak KK-24'teki birebir metin beklentisi dosyada bozulur. Alıntıyı satır içi kod (`` ` ``) içine almak ya da kaçışı kabul etmek seçenekler. Hangisi?
5. **KK-40 betiği uygulamanın kodundan bağımsız olacak mı, onayı kim verecek? (Deniz, Mert)** Önerim:
   - `hesapla.mjs` geçerlilik kuralları, formül, pencere ve sıralamayı ayrı ve sade bir kodla yeniden yazar.
   - Uygulamayla yalnız sözlük dosyasını paylaşır.
   - Çıktısını Deniz onaylar, sonra `ornek-sonuc.json` olarak repoya girer.
   - Bu iki uygulamanın bakım maliyetini kabul ediyor muyuz?

---

**12 Ekim:** §5'teki beş soru `docs/kararlar.md` K47-K51 ile kapandı.
