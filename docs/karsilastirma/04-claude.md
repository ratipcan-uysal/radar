# Radar: PRD

**Kaynaklar:** `docs/kararlar.md` (K#), `docs/kabul-kriterleri.md` (KK-#, E#), `docs/notlar/toplanti-notu.md` (TN), `docs/notlar/slack-dokumu.md` (SD), `docs/acik-noktalar.md` (AN).
**Not:** Görevde K1-K20 yazıyordu, ama `kararlar.md` 9 Ekim'de alınan K21-K29'u da içeriyor. Bu kararları da dahil ettim.

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
- **Teslimin "bitti" sayılması:** KK-01…KK-40'ın hepsi Chrome, Safari ve Edge'de geçer. (KK başlığı, KK-37)
- **Sıralamanın doğruluğu:** Sıralama formülden ne çıkarsa o kabul edilir. Belli bir temanın en üstte çıkması başarı ölçütü değildir. (Deniz'in ek notu, KK-17, KK-40)
- **Ürün hedefi** (örneğin çeyrek planlamasında kullanım, ölçüt ya da hedef değer): Bilinmiyor. Deniz'e sorulmalı.

## 4. Kapsam (gereksinimler)
| Alan | Gereksinim | Kaynak |
|---|---|---|
| Girdi | Tek CSV yüklenir, başlık sabittir: `id,tarih,kanal,metin,puan,segment`. Başlık farklıysa ya da dosya CSV değilse dosyanın tamamı reddedilir. | K4, K11, KK-04, KK-05 |
| Girdi | Bozuk satır atlanır, dosya reddedilmez. Bozuk sayılanlar: eksik alan, 1-5 dışında puan, `YYYY-AA-GG` dışında tarih, `destek/magaza/anket` dışında kanal, `yeni/duzenli/kurumsal` dışında segment, boş metin. UTF-8 BOM kabul edilir. | K11, K13, K24, KK-03, KK-27 |
| Girdi | `id` dışındaki alanları aynı olan kayıtlar bir kez sayılır: ilk satır tutulur, sonrakiler "tekrar" nedeniyle atlanır. Aynı `id` tekrar gelirse ikinci satır atlanır. Dosya birleştirme yapılmaz. | K10, K23, KK-28, KK-29 |
| Girdi | Bütün satırlar atlanırsa pano yerine "Kullanılabilir satır yok" yazar. | K24 |
| Tema | Temalar `data/temalar.json` sözlüğünden gelir. Sözlüğü `feedback-clustering` skill'i önerir, Deniz onaylar. | K6, K21, KK-06 |
| Tema | Birden çok temaya giren kayıt her temada sayılır. Hiçbir temaya girmeyen kayıt "diğer"e gider. "Diğer" puanlanmaz ve panonun en altında yalnızca sayısıyla görünür. | K6, K13, KK-07, KK-08 |
| Tema | Olumlu yorumlar "övgü" temasında toplanır ve sıralamaya girmez. | K21 |
| Tema | İngilizce, Türkçe karaktersiz ve büyük-küçük harf farklı (İ/I) yazılmış kayıtlar eşleriyle aynı temaya girer. | K8, KK-09, KK-10, KK-11 |
| Tema | "İptal ücreti" teması ücret, kesinti, ceza ya da para geçen iptal kayıtlarını, ücretsiz iptal süresi ve iptal politikası sorularını kapsar. Bildirim yüzünden olan iptal bildirim temasına girer. | K20, K21, KK-39 |
| Puan | Puan = kayıt sayısı × (6 − ortalama puan) × (son 14 gündeki pay + 1). Pencere, dosyadaki en yeni tarih ve ondan önceki 13 gündür. | K1, K9, K22, KK-13, KK-30 |
| Puan | Kanal ve segment puanı değiştirmez. Sıralama elle sabitlenmez. | K1, K2, KK-14, KK-15, KK-17 |
| Pano | Her tema için ad, puan, kayıt sayısı ve ortalama puan gösterilir. Üstte okunan ve atlanan satır sayısı, atlananların nedeni yazar. "Okunan", başlık hariç bütün satırlardır. | K11, K12, K23, KK-31 |
| Pano | Sıra puana göre büyükten küçüğedir. Puan eşitse kayıt sayısı, o da eşitse Türk alfabesine göre tema adı belirler. | K14, K26, KK-16, KK-32 |
| Pano | Sayılar Türkçe biçimde gösterilir: virgül ayraç, bir ondalık, yarım yukarı yuvarlama (`229,5`). | K25 |
| Rapor | `radar-raporu-YYYY-AA-GG.md` indirilir. Dosya adındaki tarih, dosyadaki en yeni tarihtir. Rapor `# Radar raporu: <tarih>` ile başlar, her tema `##` başlığıdır. | K16, K28, KK-18, KK-35 |
| Rapor | Raporda ilk 5 tema yer alır. Her tema için puan, kayıt sayısı, ortalama ve en yeni 3 alıntı yazar. Alıntının yanında tarih, kanal ve `id` bulunur. Metin birebir alınır, yalnızca maskelenir. Tarihi eşit alıntılarda `id`'si küçük olan önce gelir. | K7, K14, K16, KK-19, KK-33 |
| Rapor | 3'ten az kaydı olan temaya alıntı uydurulmaz. 5'ten az tema varsa rapor olanları gösterir. | KK-20, KK-21 |
| Teknik | Teslim edilen kodda hiçbir dış kütüphane kullanılmaz, CSV ayrıştırıcısı da Radar'ın kendi kodudur. Testler Node'un yerleşik test aracıyla yazılır. | K17, K29, KK-36 |
| Teknik | Chrome, Safari ve Edge'in güncel sürümlerinde sonuç aynı çıkar. | K18, KK-37 |
| Teknik | 5.000 satırlık dosyada pano 2 saniyenin altında açılır. Ölçüm ekibin standart dizüstünde, dosya seçildiği andan pano görünene kadar yapılır. | K19, K29, KK-38 |

## 5. Kapsam dışı
- Platform ve sürüm bilgisi, bu bilgiye göre analiz (K8, KK-12)
- Kanal ağırlığı: bütün kanallar eşit sayılır. Selin'in itirazı nedeniyle sürüm 2'de ayar olarak yeniden konuşulacak. (K2, KK-14)
- Destek panosundaki "günde 14" sayısını tutturmak (K5)
- "İptal ücreti en üstte çıkmalı" beklentisi (Deniz'in ek notu)
- Birden çok dosyayı birleştirmek (K10)
- Yurt dışı telefon numaralarını maskelemek: sürüm 2 (K27)
- İsim maskeleme (K15)
- Sunucu ve dış servis (TN Kararlar, K3)
- "Diğer"in raporda yer alması (KK-18)
- 9 Ekim'den sonra çıkan uç durumlar: sürüm 2 (Deniz, 9 Ekim)

## 6. Gizlilik
- Dosya tarayıcıdan dışarı gönderilmez. Dış servis ya da kütüphane çağrılmaz, başka alan adına sıfır istek yapılır. Radar çevrimdışı da aynı sonucu verir. (K3, K17, KK-22, KK-23, KK-36)
- Ad ya da telefon sütunu içeren ham dosya reddedilir ve bu değerler ekranda görünmez. (K4, K11, KK-04)
- Telefon numaraları panoda ve raporda maskelenir:
  - 0 ya da +90 ile başlayan 10-12 haneli numaralar, boşluklu ya da bitişik. Tireli, parantezli ve başında 0 olmayan Türkiye numaraları da buna dahil. Son iki hane dışındaki rakamlar `*` olur: `**** *** ** 34`.
  - E-posta `a***@alan.com` biçiminde maskelenir.
  - Telefon olmayan sayılar maskelenmez.
  - (K3, K15, K27, KK-24, KK-25, KK-26, KK-34)
- **Bilinen sınır:** İsimler güvenilir biçimde tespit edilemediği için maskelenmez. Yönetime giden alıntılarda isim görünebilir. (K15)

## 7. Teslim (demo)
- **Tarih:** 16 Ekim Cuma. (K7)
- **Gösterilecekler:** Pano ve indirilebilir rapor. (K7)
- **Ekibin kararı:** 9 Ekim'den sonra çıkan uç durumlar sürüm 2'ye yazılıyor, demoya mevcut kapsamla gidiliyor. (Deniz, 9 Ekim)
- **Örnek dosyada beklenen ilk üç tema:** bildirim, iptal ücreti, ödeme. Bu sıra K21'den önce hesaplandı. (KK-40)
- **Demoyu kimin sunacağı, kimin izleyeceği ve sonraki yönetim toplantısının tarihi:** Bilinmiyor. Deniz ve Mert'e sorulmalı. (SD'de yalnızca "yönetim toplantısı pazartesi" yazıyor.)

## 8. Riskler
- **Sözlük yok:** `data/temalar.json` henüz repoda yok. 4-7. sıralar arasındaki fark 5 puandan az olduğu için bu sıralar sözlüğe bağlı. (KK-40, E1)
- **Kabul kriterleri güncel değil:** Belge K21-K29'dan önce yazıldı. Ondalık ayracı nokta (`8.0`) kullanılıyor, K25 ise virgül diyor. Olumlu yorumlar "diğer"de sayılıyor, K21 ise "övgü" teması diyor. KK-01'deki "okunan" değeri de K23'ten önceki varsayıma dayanıyor. (KK, K21, K23, K25)
- **Elle hesap:** KK-40'ın beklenen değerleri betikle değil elle hesaplandı. (KK son not)
- **Paydaş beklentisi:** Formüle göre iptal ücreti 2. sırada çıkıyor. Selin bunun en üstte olmasını bekliyor. (KK-40, SD)
- **Mutsuzluk puandan okunuyor:** Bazı kayıtlarda puan ile metin uyuşmuyor. (K1, AN 3.3)
- **Örnek dosya temsil etmeyebilir:** Dosya destek kayıtlarının bir kesiti, gerçek hacmi yansıtmayabilir. (K5, AN 3.11)
- **İsimler açıkta:** Yönetim raporundaki alıntılarda maskelenmemiş isim kalabilir. (K15)

## 9. Açık kararlar
1. **Sözlüğün içeriği ve onayı:** Tema adları, ifadeler, İngilizce karşılıklar ve temaların ne kadar ayrıntılı olacağı. (K21, E1) Kime: Deniz.
2. **K21 ile KK-39 çelişiyor:** GB-0131 ve GB-0149 ("İptal politikasını uygulamada bulamadım") için K21 "iptal ücreti" diyor, KK-39 "değil" diyor. Kime: Deniz.
3. **"Övgü" temasının görünümü:** Panoda nerede ve nasıl görüneceği, "diğer" sayısına girip girmediği belli değil. (K21, KK-08, KK-40) Kime: Deniz.
4. **Atlanan satırın tarihi:** Atlanan bir satırın tarihi "en yeni tarih" hesabına katılır mı? (E16, K24'te cevap yok) Kime: Deniz.
5. **Atlama nedenlerinin metni:** "Boş metin" ve "tekrar" dışındaki atlama nedenlerinin panoda hangi ifadeyle yazılacağı belli değil. (E15, K11, K23) Kime: Deniz.

İstersen bunu yönetime gönderilecek, paylaşılabilir bir sayfa olarak da hazırlayabilirim.
