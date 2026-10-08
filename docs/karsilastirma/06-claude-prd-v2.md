# Radar: PRD (sürüm 2)

**Kaynaklar:** `docs/kararlar.md` (K#), `docs/kabul-kriterleri.md` (KK-#, E#), `docs/notlar/toplanti-notu.md` (TN), `docs/notlar/slack-dokumu.md` (SD), `docs/acik-noktalar.md` (AN), `docs/karsilastirma/05-claude-elestiri.md` (CL#), `docs/karsilastirma/05-codex-elestiri.md` (CX#).
**Not:** Bu sürüm K1-K36'yı içeriyor. K30-K36, 10 Ekim'de iki eleştiriden sonra alındı. Her itirazın sonucu en sondaki "Eleştiriye cevap" tablosunda.

---

## 1. Sorun
- Her çeyreğin başında "kullanıcı ne istiyor" sorusunun cevabı elle aranıyor. Destek kayıtları, App Store/Google Play yorumları ve NPS anketi üç ayrı yerde duruyor. (TN)
- Hedef, bir sonraki çeyreğin ilk üç işini kanıta dayanarak seçmek. (TN)
- Ekip içinde en büyük sorunun ne olduğu konusunda görüş ayrılığı var: Selin iptal ücreti diyor, Mert bildirim gecikmesi. (TN)

## 2. Kim için
- **Aracı kullanan:** Deniz (PM). CSV'yi yükleyip temaları ve önceliği görüyor. (TN)
- **Raporu okuyan:** Yönetim. Rapor markdown olarak Confluence'a yapıştırılacak. (TN)
- **Veriyi hazırlayan:** Ece. Ad ve telefon sütunları silinmiş tek bir CSV veriyor. (K4)
- **Başka kullanıcılar ve kullanıcı sayısı:** Bilinmiyor. Deniz'e sorulmalı. (AN 2.13)

## 3. Başarı nasıl ölçülür
- **Teslimin "bitti" sayılması:** KK-01…KK-40'ın güncellenmiş hâli Chrome, Safari ve Edge'de geçer. Beklenen sayılar onaylı sözlükle yeniden hesaplanır. (KK başlığı, KK-37, K30) Kriterler şu an kararlarla çelişiyor (bkz. 8. Riskler). Kriterleri kimin, ne zamana kadar güncelleyeceği belli değil (Açık karar 2).
- **Sıralamanın doğruluğu:** Sıralama formülden ne çıkarsa o kabul edilir. Belli bir temanın en üstte çıkması başarı ölçütü değildir. (Deniz'in ek notu, KK-17, KK-40)
- **Ürün hedefi** (örneğin çeyrek planlamasında kullanım, ölçüt ya da hedef değer): Bilinmiyor. Deniz'e sorulmalı. Radar'ın çeyrek önceliğini mi yoksa şu an artan konuyu mu gösterdiği de belli değil (Açık karar 4).

## 4. Kapsam (gereksinimler)
| Alan | Gereksinim | Kaynak |
|---|---|---|
| Girdi | Tek CSV yüklenir, başlık sabittir: `id,tarih,kanal,metin,puan,segment`. Başlık farklıysa ya da dosya CSV değilse dosyanın tamamı reddedilir. | K4, K11, KK-04, KK-05 |
| Girdi | Bozuk satır atlanır, dosya reddedilmez. Bozuk sayılanlar: eksik alan, 1-5 dışında puan, `YYYY-AA-GG` dışında tarih, bugünün tarihinden sonraki tarih ("ileri tarih" nedeniyle), `destek/magaza/anket` dışında kanal, `yeni/duzenli/kurumsal` dışında segment, boş metin. UTF-8 BOM kabul edilir. | K11, K13, K24, K31, KK-03, KK-27 |
| Girdi | `id` dışındaki alanları aynı olan kayıtlar bir kez sayılır: ilk satır tutulur, sonrakiler "tekrar" nedeniyle atlanır. Aynı `id` farklı içerikle iki kez gelirse iki satır da atlanır, neden "çelişkili id" olarak yazılır. Dosya birleştirme yapılmaz. | K10, K23, K34, KK-28, KK-29 |
| Girdi | Bütün satırlar atlanırsa pano yerine "Kullanılabilir satır yok" yazar. | K24 |
| Tema | Temalar `data/temalar.json` sözlüğünden gelir. Sözlüğü `feedback-clustering` skill'i önerir, Deniz onaylar. Temalar kullanıcının derdi düzeyindedir, örneğin "ödeme hatası" tek temadır. Sözlük bu düzeyde onaylanır. | K6, K21, K32, KK-06 |
| Tema | Birden çok temaya giren kayıt her temada sayılır. Hiçbir temaya girmeyen kayıt "diğer"e gider. "Diğer" puanlanmaz ve panonun en altında yalnızca sayısıyla görünür. | K6, K13, KK-07, KK-08 |
| Tema | Olumlu yorumlar "övgü" temasında toplanır ve sıralamaya girmez. Nasıl belirleneceği ve nerede görüneceği açık (Açık karar 3). | K21 |
| Tema | İngilizce, Türkçe karaktersiz ve büyük-küçük harf farklı (İ/I) yazılmış kayıtlar eşleriyle aynı temaya girer. | K8, KK-09, KK-10, KK-11 |
| Tema | "İptal ücreti" teması şunları kapsar: ücret, kesinti, ceza ya da para geçen iptal kayıtları, iptal süresi ve iptal politikası soruları. Bildirim yüzünden olan iptal bildirim temasına girer. K20'deki "yalnız" sınırını K21 ve K30 kaldırır. | K20, K21, K30, KK-39 |
| Puan | Puan = kayıt sayısı × (6 − ortalama puan) × (son 14 gündeki pay + 1). Pencere, geçerli satırların en yeni tarihi ve ondan önceki 13 gündür. | K1, K9, K22, K31, KK-13, KK-30 |
| Puan | Mutsuzluk puandan okunur. Puan ile metin uyuşmasa da puan esas alınır. | K1, K36 |
| Puan | Kanal ve segment puanı değiştirmez. Sıralama elle sabitlenmez. | K1, K2, KK-14, KK-15, KK-17 |
| Pano | Her tema için ad, puan, kayıt sayısı ve ortalama puan gösterilir. Üstte okunan ve atlanan satır sayısı, atlananların nedeni yazar. "Okunan", başlık hariç bütün satırlardır. | K11, K12, K23, KK-31 |
| Pano | Sıra puana göre büyükten küçüğedir. Puan eşitse kayıt sayısı, o da eşitse Türk alfabesine göre tema adı belirler. | K14, K26, KK-16, KK-32 |
| Pano | Sayılar Türkçe biçimde gösterilir: virgül ayraç, bir ondalık, yarım yukarı yuvarlama (`229,5`). | K25 |
| Pano, Rapor | Radar kayıt sayar, kişi saymaz. Pano ve raporda "kişi" değil "kayıt" yazar. | K34 |
| Rapor | `radar-raporu-YYYY-AA-GG.md` indirilir. Dosya adındaki tarih, dosyadaki en yeni tarihtir. Rapor `# Radar raporu: <tarih>` ile başlar, her tema `##` başlığıdır. | K16, K28, KK-18, KK-35 |
| Rapor | Raporun ilk satırı kapsamı söyler: tarih aralığı, kayıt sayısı ve kanal dağılımı. Bu satırın K28'deki başlıkla nasıl sıralanacağı açık (Açık karar 11). | K35 |
| Rapor | Raporda ilk 5 tema yer alır. Her tema için puan, kayıt sayısı, ortalama ve en yeni 3 alıntı yazar. Alıntının yanında tarih, kanal ve `id` bulunur. Metin birebir alınır, yalnızca maskelenir. Tarihi eşit alıntılarda `id`'si küçük olan önce gelir. | K7, K14, K16, KK-19, KK-33 |
| Rapor | 3'ten az kaydı olan temaya alıntı uydurulmaz. 5'ten az tema varsa rapor olanları gösterir. | KK-20, KK-21 |
| Rapor | "Raporu indir" düğmesinin yanında şu uyarı yazar: "Alıntılarda isim ya da başka kişisel bilgi olabilir. Göndermeden önce okuyun." | K33 |
| Teknik | Teslim edilen kodda hiçbir dış kütüphane kullanılmaz, CSV ayrıştırıcısı da Radar'ın kendi kodudur. Testler Node'un yerleşik test aracıyla yazılır. | K17, K29, KK-36 |
| Teknik | Chrome, Safari ve Edge'in güncel sürümlerinde sonuç aynı çıkar. | K18, KK-37 |
| Teknik | 5.000 satırlık dosyada pano 2 saniyenin altında açılır. Ölçüm ekibin standart dizüstünde, dosya seçildiği andan pano görünene kadar yapılır. | K19, K29, KK-38 |

## 5. Kapsam dışı
- Platform ve sürüm bilgisi, bu bilgiye göre analiz (K8, KK-12)
- Kanal ağırlığı: bütün kanallar eşit sayılır. Selin'in itirazı nedeniyle sürüm 2'de ayar olarak yeniden konuşulacak. (K2, KK-14)
- Destek panosundaki "günde 14" sayısını tutturmak (K5)
- "İptal ücreti en üstte çıkmalı" beklentisi (Deniz'in ek notu)
- Birden çok dosyayı birleştirmek (K10)
- Kişi sayısı: Radar yalnızca kayıt sayar (K34)
- Temaların alt kırılımı, örneğin ödeme hatasını kart reddi, çift çekim gibi alt temalara ayırmak: sürüm 2 (K32)
- Puan ile metin arasındaki uyuşmazlığı ele almak: sürüm 2 (K36)
- Yurt dışı telefon numaralarını maskelemek: sürüm 2 (K27)
- İsim maskeleme (K15)
- Sunucu ve dış servis (TN Kararlar, K3)
- "Diğer"in raporda yer alması (KK-18)
- 9 Ekim'den sonra çıkan uç durumlar: sürüm 2 (Deniz, 9 Ekim). İstisna: K30-K36 10 Ekim'de eleştiriler üzerine alındı ve bu sürümdedir.

## 6. Gizlilik
- Dosya tarayıcıdan dışarı gönderilmez. Dış servis ya da kütüphane çağrılmaz, başka alan adına sıfır istek yapılır. Radar çevrimdışı da aynı sonucu verir. (K3, K17, KK-22, KK-23, KK-36)
- Ad ya da telefon sütunu içeren ham dosya reddedilir ve bu değerler ekranda görünmez. (K4, K11, KK-04)
- Telefon numaraları panoda ve raporda maskelenir:
  - 0 ya da +90 ile başlayan 10-12 haneli numaralar, boşluklu ya da bitişik. Tireli, parantezli ve başında 0 olmayan Türkiye numaraları da buna dahil. Son iki hane dışındaki rakamlar `*` olur: `**** *** ** 34`.
  - E-posta `a***@alan.com` biçiminde maskelenir.
  - Telefon olmayan sayılar maskelenmez.
  - (K3, K15, K27, KK-24, KK-25, KK-26, KK-34)
- "Raporu indir" düğmesinin yanında kişisel bilgi uyarısı yazar. (K33)
- **Bilinen sınır:** Ağ isteği yapılmaması, raporun Confluence'a elle taşınmasını engellemez. Raporda şunlar açık kalabilir: isimler (K15), yurt dışı numaralar (K27), e-postanın alan adı, ayrıca alıntının yanındaki `kurumsal` segmenti, tarih ve `id`. Bu kurala karşı tek önlem K33'teki uyarı. Hukuk ya da veri sorumlusu onayı kaynaklarda görünmüyor. (CL6, CX3; Açık karar 6)

## 7. Teslim (demo)
- **Tarih:** 16 Ekim Cuma. (K7)
- **Gösterilecekler:** Pano ve indirilebilir rapor. (K7)
- **Ekibin kararı:** 9 Ekim'den sonra çıkan uç durumlar sürüm 2'ye yazılıyor, demoya mevcut kapsamla gidiliyor. (Deniz, 9 Ekim) K30-K36 bu kapsama dahil.
- **Sunumdaki ifade:** Yönetim sunumunda sonuçlar "örnek dosyaya göre" diye sunulur. (K35)
- **Örnek dosyada beklenen ilk üç tema:** Bildirim, iptal ücreti, ödeme. Bu sıra K21'den önce hesaplandı ve K30 gereği onaylı sözlükle yeniden hesaplanacak. (KK-40, K30) İki eleştiri, K21 kümesiyle iptal ücretini elle 35 kayıt ve 192,0 puan olarak hesapladı. Bildirim 229,5'te kaldığı için ilk iki sıra değişmiyor. Bu hesap bir betikle doğrulanmadı. (CL5, CX1)
- **Demoyu kimin sunacağı, kimin izleyeceği ve sonraki yönetim toplantısının tarihi:** Bilinmiyor. Deniz ve Mert'e sorulmalı. (SD'de yalnızca "yönetim toplantısı pazartesi" yazıyor.)

## 8. Riskler
- **Sözlük yok ve ilk üç sıra da ona bağlı:** `data/temalar.json` henüz repoda yok. Sözlüğe bağlı olan yalnızca 4-7. sıralar değil:
  - Bildirim temasının sözlükte şu kayıtları da yakalaması gerekiyor: İngilizce kayıtlar (GB-0080, 0121, 0137) ve "bildirim" kelimesi geçmeyen kayıtlar (GB-0024, 0111, 0085, 0101).
  - K32 tema ayrıntısını sabitledi, ama sözlüğün onay tarihi belli değil. (KK-40, E1, CL7, CX2)
- **Kabul kriterleri güncel değil:**
  - KK-31 `8.0` bekliyor, K25 `8,0` diyor.
  - KK-40 olumlu yorumları "diğer"de sayıyor, K21 ise "övgü" diyor.
  - KK-01'deki "okunan" değeri K23'ten önceki varsayıma dayanıyor.
  - KK-39 politika sorularını iptal ücretinin dışında tutuyor, K30 ise içine alıyor.
  - KK-29 aynı `id`'de ilk satırı tutuyor, K34 ise iki satırı da atlıyor.
  - İleri tarihli satır (K31) için bir kriter yok.
  - (KK, K21, K23, K25, K30, K31, K34)
- **Elle hesap:** KK-40'ın ve eleştirilerin hesapları betikle değil elle yapıldı. (KK son not, CL son not)
- **Birinci sırayı yenilik belirliyor:** Yenilik çarpanı olmadan bildirim (128) ile iptal ücreti (K21 ile 140) yakın. Bildirimi öne geçiren 1,79'luk yenilik çarpanı, iptal ücretininki 1,37. Mert bildirim artışını 5.2 sürümüne bağlıyor. Rapor temel puanı ve yenilik çarpanını ayrı göstermediği için bu farkın kaynağı raporda görünmüyor. (CL1, SD; Açık karar 4)
- **Paydaş beklentisi:** Formüle göre iptal ücreti 2. sırada çıkıyor. Selin bunun en üstte olmasını bekliyor. (KK-40, SD)
- **Olumlu ve istek kayıtları şikâyet puanını artırıyor:**
  - Formülde 5 puanlı bir kayıt bile temaya +1 ekliyor. Örneğin GB-0019 ve GB-0054 ödeme temasına girerse ödemenin puanı yükselir.
  - "Son dakika" ifadesi hem olumlu (GB-0029, 0062, 0087) hem şikâyet (GB-0064, 0128) kayıtlarında geçiyor.
  - İsteklerden oluşan bir tema, gerçek hatalar içeren bir temanın önüne geçebiliyor.
  - (CL3; Açık karar 3)
- **"İptal ücreti" adı geniş:** K30'dan sonra bu temada ücret geçmeyen kayıtlar da var. Yönetim hepsini ücret şikâyeti diye okuyabilir. (CL4; Açık karar 8)
- **Mutsuzluk puandan okunuyor:** Bazı kayıtlarda puan ile metin uyuşmuyor (GB-0133, GB-0078). K36 sürüm 1'de puanı esas alıyor. Kanalların puan anlamı ve anketin 0-10'dan dönüşümü doğrulanmadı. (K1, K36, AN 3.3, CX7; Açık karar 7)
- **Örnek dosya temsil etmeyebilir:** Dosya destek kayıtlarının bir kesiti, gerçek hacmi yansıtmayabilir. Bildirimin 29 kaydının 20'si `magaza`, iptal ücretinin 31 kaydının 16'sı `destek`. Kesitin nasıl seçildiği bilinmiyor. K35 kapsam satırını ve "örnek dosyaya göre" ifadesini getirdi, ama seçim yöntemini açıklamıyor. (K5, K35, AN 3.11, CL1, CX6; Açık karar 5)
- **Kişisel veri yönetime gidebilir:** Raporda isim, yurt dışı numara, e-posta alan adı ve kurumsal müşteriyi tanınır kılabilecek bilgiler kalabilir. Tek önlem K33'teki uyarı. (K15, K27, K33, CL6, CX3)

## 9. Açık kararlar
1. **Sözlüğün içeriği ve onay tarihi:** K32 ayrıntı düzeyini belirledi. Tema adları, ifadeler, İngilizce karşılıklar ve sözlüğün en geç hangi gün onaylanacağı belli değil. (K21, K32, E1, CL7, CX2) Kime: Deniz.
2. **Kabul kriterlerinin güncellenmesi:** K30 sayıların yeniden hesaplanacağını söylüyor. Bunu kimin, 16 Ekim'den önce hangi tarihe kadar yapacağı ve güncellenmezse demoda neyin "bitti" sayılacağı belli değil. Kriterler betikle doğrulanacak mı, o da belli değil. (K30, CL5, CX1) Kime: Deniz.
3. **"Övgü" teması:**
   - Kelimeyle mi puanla mı belirlenecek?
   - Övgü başka temalarda da sayılmaya devam edecek mi?
   - Panoda nerede görünecek, "diğer" sayısına girecek mi?
   - 4-5 puanlı kayıtlar ve istek kayıtları şikâyet temasının puanına katılacak mı?
   - (K21, KK-08, KK-40, CL3) Kime: Deniz.
4. **Radar ne gösteriyor:** Çeyrek önceliğini mi, şu an artan konuyu mu? Raporda temel puan ile yenilik çarpanı ayrı gösterilecek mi? (CL1) Kime: Deniz.
5. **Örnekleme yöntemi:** Girdi dosyası her kanaldan tam hacim mi alıyor, belli bir oranla mı? Bu veriyle hangi yönetim kararları alınabilir? (K5, K35, CL1, CX6) Kime: Ece, Deniz.
6. **Kişisel verinin yönetim raporuna çıkışı:** Kararlar:
   - K3'ün istisnaları (K15, K27) varken rapor Confluence'a gidebilir mi?
   - `id` raporda kalacak mı?
   - E-postanın alan adı açık kalacak mı?
   - Veri sorumlusu ya da hukuk onayı gerekiyor mu?
   - K33'teki uyarı bu soruları kapatmıyor. (CL6, CX3) Kime: Deniz, Mert, veri sorumlusu.
7. **Puanın anlamı:** Kanallardaki puanlar aynı şeyi mi ölçüyor? Anketin 0-10'dan 1-5'e dönüşümü nasıl yapılıyor? K36 uyuşmazlığı sürüm 2'ye bıraktı, dönüşüme değinmedi. (K4, K36, CX7) Kime: Ece, Deniz.
8. **"İptal ücreti" temasının adı:** K30 kapsamı genişletti ama tema adına değinmedi. Ad kalacak mı, yoksa örneğin "iptal ücreti ve politikası" mı olacak? (K30, CL4) Kime: Deniz.
9. **Atlama nedenlerinin metni:** "Boş metin", "tekrar", "ileri tarih" ve "çelişkili id" belli. Eksik alan, puan, tarih biçimi, kanal ve segment hataları panoda hangi ifadeyle yazılacak? (E15, K11, K13, K23, K31, K34) Kime: Deniz.
10. **K31'den doğan tarih soruları:** Kararlar:
    - "Bugünün tarihi" neye göre alınacak? Sonuç yükleme gününe bağlı olacağı için testlerin bunu nasıl sabitleyeceği de belli değil.
    - Rapor dosya adındaki tarih (K28: "dosyadaki en yeni tarih") da pencere gibi yalnızca geçerli satırlardan mı alınacak?
    - Kime: Deniz, Ece.
11. **Rapor başı:** K28 raporun `# Radar raporu: <tarih>` ile başlayacağını, K35 ilk satırın kapsamı söyleyeceğini yazıyor. Kapsam satırı başlıktan hemen sonra mı gelecek? (K28, K35) Kime: Deniz.

## 10. Eleştiriye cevap
| # | İtiraz | Karar | PRD'deki yeri |
|---|---|---|---|
| CL1 | Birinci sırayı yenilik çarpanı ve bir sürüm hatası belirliyor. Kanal dağılımı ve örnekleme sıralamayı etkiliyor. Rapor temel puanı ayrı göstermiyor. | **Kısmen kapandı.** K35 kapsam satırını ve "örnek dosyaya göre" ifadesini getirdi. Neyin gösterildiği, örnekleme ve temel puanın ayrı gösterilmesi kararsız. | §4 Rapor (K35), §7, §8 "Birinci sırayı yenilik belirliyor" ve "Örnek dosya", §9-4, §9-5 |
| CL2 | Tek bir ileri tarihli satır pencereyi kaydırıp birinci sırayı değiştirebilir. Atlanan satırın tarihi belli değil. | **Kapandı.** K31: ileri tarih bozuk satırdır, pencere geçerli satırlardan hesaplanır. Eski Açık karar 4 kaldırıldı. Rapor adındaki tarih ve "bugün"ün kaynağı yeni açık karar. | §4 Girdi ve Puan, §9-10 |
| CL3 | Formül olumlu yorumları da mutsuzluk sayıyor, "övgü"nün nasıl belirleneceği tanımsız. İstek kayıtları sıralamaya giriyor. | **Kapanmadı.** Yeni karar yok. | §4 Tema (övgü), §8 "Olumlu ve istek kayıtları", §9-3 |
| CL4 | K20 ile K21 çelişiyor. PRD aynı konuyu hem gereksinim yapmış hem açık bırakmış, çelişkiyi de yanlış yere koymuş. | **Kapandı.** K30: K21 geçerli. Eski Açık karar 2 kaldırıldı. Tema adı sorusu kapanmadı. | §4 Tema (iptal ücreti), §8 "İptal ücreti adı geniş", §9-8 |
| CL5 | "Bitti" tanımı karşılanamaz, beklenen değerler eskimiş ve elle hesaplanmış. | **Kısmen kapandı.** K30: sayılar onaylı sözlükle yeniden hesaplanır. Kimin, ne zamana kadar yapacağı kararsız. | §3, §7, §8 "Kabul kriterleri güncel değil" ve "Elle hesap", §9-2 |
| CL6 | Maskelenmemiş isim, yurt dışı numara, e-posta alan adı ve `id` Confluence'a gidiyor. Onay görünmüyor. | **Kısmen kapandı.** K33: indirme düğmesinin yanında uyarı. İçeriğin çıkış koşulu, `id` ve veri sorumlusu onayı kararsız. | §4 Rapor (K33), §6, §8 "Kişisel veri", §9-6 |
| CL7 | Sözlük kritik yolda ama sahibi ve tarihi yok. İlk üç sıra da sözlüğe bağlı. Açık kararlar demo çıktısını değiştiriyor. | **Kısmen kapandı.** K32 tema ayrıntısını belirledi. Onay tarihi ve açık kararların kapanma tarihi kararsız (tarih eklenmedi). | §4 Tema (K32), §8 "Sözlük yok", §9-1, §9-2 |
| CX1 | "Bitti" şartı sağlanamıyor: K20/K21/KK-39 çelişiyor, KK-40 eski sonucu bekliyor. | **Kısmen kapandı.** K30 çelişkiyi kapattı ve sayıların yeniden hesaplanmasını istedi. Güncel beklentilerin onayı ve tarihi kararsız. | §3, §4 Tema, §7, §9-2 |
| CX2 | Sözlüğün ayrıntısı ilk üç sırayı değiştirebilir (ödeme alt temalara bölünürse). | **Kapandı.** K32: temalar kullanıcının derdi düzeyinde, "ödeme hatası" tek tema, alt kırılım sürüm 2'de. | §4 Tema, §5, §8 "Sözlük yok" |
| CX3 | Gizlilik sınırı çelişiyor (K3 / K27). Çevrimdışı çalışma raporu güvenli yapmıyor. | **Kısmen kapandı.** K33 uyarısı eklendi. K3'ün istisnaları ve rapora çıkış koşulu kararsız. | §6 "Bilinen sınır", §9-6 |
| CX4 | İlgisiz bir tarih hatası birinci temayı değiştirebilir. | **Kapandı.** K31. | §4 Girdi ve Puan, §9-10 |
| CX5 | Kayıt sayısı kişi sayısı gibi okunabilir. Çelişkili `id`'de dosya sırası sonucu belirliyor. | **Kapandı.** K34: kayıt sayılır ve "kayıt" yazar. Çelişkili `id`'de iki satır da atlanır. KK-29'un güncellenmesi gerekiyor. | §4 Girdi ve Pano/Rapor, §5, §8 "Kabul kriterleri güncel değil" |
| CX6 | Eşit kanal ağırlığı seçilmiş bir örnekten tarafsız öncelik üretmez. | **Kısmen kapandı.** K35 kapsamı ve kanal dağılımını rapora koyuyor. Seçim yöntemi açıklanmadı. | §4 Rapor, §7, §8 "Örnek dosya", §9-5 |
| CX7 | Puan, metindeki şiddeti temsil etmiyor. Kanal puanlarının anlamı ve anket dönüşümü tanımsız. | **Kısmen kapandı.** K36: sürüm 1'de puan esas, uyuşmazlık sürüm 2'de. Dönüşümün doğrulanması kararsız. | §4 Puan, §5, §8 "Mutsuzluk puandan okunuyor", §9-7 |

---

- **Kararla gelen yeni açık noktalar:** Eleştiri dışında, kararların kendisinden üç açık nokta çıktı. Bunları da "Açık kararlar"a ekledim:
  - K31'deki "bugün"ün kaynağı.
  - K31 ile K28 arasında rapor tarihinin hangi satırlardan alınacağı.
  - K28 ile K35 arasında raporun ilk satırının ne olacağı.
- **Örnek dosyadaki sayılar:** PRD'de geçen 192,0, 229,5, 1,79 gibi sayılar eleştirilerin elle yaptığı hesaplardan alındı. Ben yeniden hesaplamadım, PRD'de de doğrulanmadıkları yazıyor.
