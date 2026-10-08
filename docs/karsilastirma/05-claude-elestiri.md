## 1. Birinci sırayı kullanıcı önceliği değil, girdi dosyasının yapısı ve bir sürüm hatası belirliyor

**Ne yanlış:** PRD birinci sırayı ("bildirim") sağlam bir sonuç gibi sunuyor (`prd.md:74`, `:81`). Oysa yenilik çarpanı çıkarılınca iki tema neredeyse eşit. K21'deki sözlükle sıra tersine bile dönüyor:

| Tema | Yeniliksiz temel puan | Yenilikle puan |
|---|---|---|
| Bildirim (B) | 128 | 229,5 |
| İptal ücreti (A), KK-40 kümesi | 122 | 161,4 |
| İptal ücreti (A), K21 sözlüğüyle (GB-0075, 0123, 0131, 0149 dahil) | **140** | 192,0 |

- Temel puan, formülde `kayıt × (6 − ortalama)` kısmıdır; KK-40 Tablo 40-B'den alındı.
- Bildirim birinci çıkıyor çünkü yenilik çarpanı 1,79, iptal ücretininki 1,37.

**Kanıt:**
- Bildirim teması baştan sona son 16 güne sıkışmış. En eski kaydı 09-20 tarihli (GB-0003, 0024, 0040, 0085).
- Mert bu artışı 5.2 sürümüne bağlıyor (`slack-dokumu.md:10`; GB-0056, GB-0061). Yani bu bir sürüm hatası, çeyrek boyunca süren bir konu değil.
- İptal ücreti 08-25'ten 10-05'e kadar her hafta var (GB-0133, GB-0005, GB-0077).
- Kanal dağılımı farklı:
  - Bildirimin 29 kaydının 20'si `magaza`.
  - İptal ücretinin 31 kaydının 16'sı `destek`.
- K5 örnek dosyayı "destek kayıtlarının bir kesiti" diye tanımlıyor (`kararlar.md:11`). Ama dosyada mağaza ve anket kayıtları da var.
- Selin bir günde 14 iptal şikâyeti diyor (`slack-dokumu.md:4`). Dosyada 6 haftada yalnızca 16 destek kaynaklı iptal kaydı var.
- K2 "bütün kanallar eşit" diyor. Bir kanaldan örnek alınıp diğerleri tam geliyorsa bu eşitlik fiilen ortadan kalkıyor. Destek kanalının ağırlığını, kimsenin bilmediği örnekleme oranı belirliyor.

**Etki:**
- **Yönetim kararı:** Çeyreğin ilk işi büyük ihtimalle zaten düzeltilecek bir sürüm hatası olarak seçilir.
- **Demo:** Selin "dün 14 geldi" dediğinde haklı bir itiraz yapmış olur. Ekibin elinde bunu açıklayacak bir gösterge yok, çünkü rapor temel puanı ve yenilik çarpanını ayrı göstermiyor.

**Gereken karar:**
- Radar "çeyrek önceliğini" mi gösteriyor, "şu an artan konuyu" mu? (Deniz)
- Girdi dosyası her kanaldan tam hacim mi alıyor, yoksa belli bir oranla mı? (Ece)
- Raporda temel puan ile yenilik çarpanı ayrı gösterilecek mi?

## 2. Tek bir hatalı tarih bütün sıralamayı değiştirebilir

**Ne yanlış:**
- Pencere, dosyadaki en yeni tarihe göre kuruluyor (K9, K22).
- Tarih yalnızca biçim olarak denetleniyor (K24, `prd.md:28`). İleri tarihli bir satır, örneğin yazım hatasıyla `2026-11-05`, geçerli sayılıyor.

**Kanıt:**
- Böyle tek bir satır pencereyi 3 haftadan fazla ileri kaydırır. Gerçek kayıtların hiçbiri pencereye düşmez ve bütün temalarda yenilik 1 olur.
- Sonuç: bildirim 128, iptal ücreti (K21 ile) 140. **Birinci sıra değişir.**
- Atlanan bir satırın tarihinin hesaba katılıp katılmadığı da hâlâ açık (`prd.md:90`). Yani bozuk bir satır bile pencereyi kaydırabilir.

**Etki:**
- **Demo:** Ece'nin yeni dökümünde tek bir yazım hatası pano sırasını bozar ve hiçbir uyarı çıkmaz.
- **Yönetim kararı:** Rapordaki tarih de yanlış olur, çünkü dosya adı bu tarihten üretiliyor (K28).

**Gereken karar:** Tarih için bir üst sınır olacak mı (örneğin yükleme gününden sonraki tarih bozuk sayılır)? Atlanan satırın tarihi en yeni tarih hesabına katılacak mı? Bu soru şu an "sürüm 2" denip geçiştirilecek bir uç durum değil. (Deniz)

## 3. Formül, olumlu yorumları da mutsuzluk sayıyor ve "övgü" teması tanımsız

**Ne yanlış:**
- `kayıt × (6 − ortalama)` ifadesi, her kayıt için `(6 − puan)` değerlerinin toplamına eşittir.
- Bu yüzden 5 puanlık bir övgü de temanın puanına +1 ekler. Mutsuzluk hiçbir zaman sıfır olmuyor.
- K21 olumlu yorumları "övgü" temasına koyuyor. Ama nasıl belirleneceği yazmıyor: kelimeyle mi, puanla mı? K6'daki "birden çok temaya giren her temada sayılır" kuralına göre övgü başka temada da sayılır mı? Bu da yazmıyor.
- PRD bu konuda yalnızca görünümü soruyor (`prd.md:89`).

**Kanıt:**
- **Sadakat teması:** 5 kaydın 3'ü övgü (GB-0033, 0063, 0090). Övgüler içerideyken puan 10,0, çıkarılınca 6,0.
- **"İade" kelimesi:** GB-0019 ve GB-0054 ("destek ekibi iademi aynı gün yaptı", puan 5) ödeme temasına girerse ödemenin puanı 97,4'ten 100,9'a çıkar.
- **"Son dakika" ifadesi:** GB-0029, 0062, 0087'de ("son dakika masa bulduk") olumlu, GB-0064 ve 0128'de ("son dakika iptal ettim") iptal şikâyeti olarak geçiyor.
- **Alaycı kullanım:** GB-0105'teki `"harika"` alaycı.
- **Masa tercihi teması (G):** Puanların hepsi 3-4 ve kayıtların çoğu istek ("olsun", "eklenebilir"). Yine de raporda 5. sıraya giriyor ve "restoran bilgisi yanlış" temasının (F) önüne geçiyor. F'de gerçek hatalar var: GB-0072 ("gittik kapalıydı"), GB-0060 ("adres eski").

**Etki:**
- **Yönetim kararı:** Yönetim raporunun 4. ve 5. sırası, gerçek sorunlardan çok kelime çakışmasına ve istek kayıtlarına göre oluşuyor.

**Gereken karar:**
- Övgü kelimeyle mi puanla mı belirlenecek?
- Övgü başka temalarda sayılmaya devam edecek mi?
- 4-5 puanlı kayıtlar şikâyet temasının puanına katılacak mı? (Deniz)

## 4. K20 ile K21 çelişiyor, PRD ise aynı konuyu hem karara bağlıyor hem açık bırakıyor

**Ne yanlış:**
- K20'ye göre iptal ücreti teması **"yalnız** ücret, kesinti, ceza ya da para geçen" kayıtları kapsar (`kararlar.md:35`).
- K21 ise ücret geçmeyen "ücretsiz iptal süresi" ve politika sorularını da bu temaya alıyor (`kararlar.md:43`).
- PRD bu iki kararı birleştirip gereksinim olarak yazmış (`prd.md:35`). Aynı belgede konuyu açık karar olarak da bırakıyor (`prd.md:88`).
- Üstelik açık kararda çelişkiyi yanlış yere koyuyor: "K21 ile KK-39 çelişiyor" diyor. Asıl çelişki iki kararın kendi arasında.

**Kanıt:** GB-0075, GB-0123, GB-0131, GB-0149 kayıtları. KK-39 (`kabul-kriterleri.md:418`) bu kayıtları açıkça temanın dışında tutuyor.

**Etki:**
- **Demo:** Geliştirici hangi kuralı kodlayacağını bilemez. K21 "testler buna göre yazılır" diyor, yani testler de çelişkili olur.
- **Yönetim kararı:** "İptal ücreti" adı altında artık ücreti olmayan şikâyetler de sayılıyor. Yönetim 35 kaydı ücret şikâyeti diye okur.

**Gereken karar:** K21, K20'deki "yalnız" kelimesini geçersiz kılıyor mu? Kılıyorsa tema adı da değişecek mi (örneğin "iptal ücreti ve politikası")? (Deniz)

## 5. "Bitti" tanımı bu hâliyle karşılanamaz ve beklenen değerler eskimiş

**Ne yanlış:**
- PRD işin bitmesini "KK-01…KK-40'ın hepsi geçer" diye tanımlıyor (`prd.md:20`).
- Aynı PRD bu kriterlerin kararlarla çeliştiğini de yazıyor (`prd.md:79`).

**Kanıt:**
- KK-31 `8.0` bekliyor, K25 `8,0` diyor. İkisi aynı anda geçemez.
- KK-40'ta "diğer" 32 kayıt, ama K21 bu kayıtların 24'ünü "övgü"ye taşıyor.
- KK-40'ta iptal ücreti 31 kayıt ve 161,4 puan. K21 ile 35 kayıt ve **192,0** puan oluyor. Bunu bu inceleme sırasında elle hesapladım. PRD yalnızca "bu sıra K21'den önce hesaplandı" demekle yetiniyor (`prd.md:74`).
- Beklenen değerlerin hepsi elle hesaplanmış ve bir betikle doğrulanmamış (`kabul-kriterleri.md:543`).

**Etki:**
- **Demo:** Demoda biri panoyu KK-40 ile karşılaştırırsa en az A satırı uyuşmaz. Bu fark hata gibi görünür.

**Gereken karar:** Kriterleri kim, 16 Ekim'den önce hangi tarihe kadar günceller? Bu yapılmazsa demo için "bitti" tanımı nedir? (Deniz)

## 6. Gizlilik: maskelenmemiş veriler Confluence'a gidiyor

**Ne yanlış:**
- Rapor yönetim için Confluence'a yapıştırılacak (`toplanti-notu.md:23`).
- İsimler maskelenmiyor (K15). PRD bunu "bilinen sınır" diye yazıp geçiyor (`prd.md:68`), ama kimin onayladığı yazmıyor.
- Yurt dışı numaraların maskelenmesi sürüm 2'ye bırakıldı (K27).
- Buna karşın turist yorumları bilinçli olarak kapsama alındı:
  - İngilizce yorumlar aynı temalarda sayılıyor (K8; `slack-dokumu.md:19`).
  - GB-0116 ve GB-0121 turist kaydı.
  - GB-0099 ve GB-0108'de kullanıcılar yurt dışı numarayla kayıt olamadığını yazıyor.
- E-posta maskesi alan adını açık bırakıyor (`a***@firma.com.tr`). Alıntının yanında `kurumsal` segmenti, tarih ve `id` de duruyor. Bu, kurumsal müşteriyi tanınır kılabilir.
- **(Zayıf)** `id` destek sistemindeki kayıt numarasıysa, o sisteme erişimi olan herkes alıntıdan müşteriye ulaşabilir. `id`'nin ne olduğu kaynaklarda yazmıyor.

**Etki:**
- **Gizlilik:** KVKK riski. Kararı Mert ve Deniz vermiş (`kararlar.md:30`), ama hukuk ya da veri sorumlusu tarafında bir onay görünmüyor.

**Gereken karar:**
- İsimler ve yurt dışı numaralar açıkken rapor Confluence'a gidebilir mi?
- Gidecekse yapıştırmadan önce elle kontrol adımı olacak mı?
- `id` raporda kalacak mı? (Deniz, Mert ve veri sorumlusu)

## 7. Tema sözlüğü kritik yolda, ama sahibi ve teslim tarihi yok

**Ne yanlış:**
- `data/temalar.json` henüz yok.
- Akış şöyle: skill sözlüğü önerir, Deniz onaylar, testler yazılır, sonra kod.
- PRD bu riski yalnızca "4-7. sıralar" diye küçültüyor (`prd.md:78`).
- Kapsam 9 Ekim'de dondurulmuş (`prd.md:73`). Ama 5 açık karar doğrudan demo çıktısını değiştiriyor (`prd.md:86-91`), ve bunlar 9 Ekim'den sonra çıkmış uç durumlar değil.

**Kanıt:**
- İlk üç sıranın bağlayıcı kısmı bile sözlüğe bağlı. Sözlük bu kayıtları da yakalamalı:
  - İngilizce kayıtlar: GB-0080, 0121, 0137.
  - "Bildirim" kelimesi geçmeyen kayıtlar: GB-0024, 0111 ("masa hazır mesajı") ve GB-0085, 0101 ("haber gelmiyor").
- Demo 16 Ekim Cuma, yönetim toplantısı hemen ardından pazartesi (`slack-dokumu.md:22`). Sözlük onayı gecikirse panoyu doğrulamak için zaman kalmıyor.

**Etki:**
- **Demo:** Pano ya onaysız bir sözlükle ya da hiç doğrulanmadan gösterilir.

**Gereken karar:** Sözlük en geç hangi gün onaylanacak? 5 açık karar kimde ve hangi tarihe kadar kapanacak? (Deniz)

---

Bütün hesapları örnek dosya ve KK-40 kümeleri üzerinden elle yaptım. Betiği çalıştırmak için onay gerekiyordu, bu yüzden doğrulama betiği koşulmadı.
