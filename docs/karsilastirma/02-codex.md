# Radar kabul kriterleri

Kaynaklar: [kararlar](docs/kararlar.md), [toplantı notu](docs/notlar/toplanti-notu.md), [Slack dökümü](docs/notlar/slack-dokumu.md), [örnek CSV](data/ornek-geri-bildirim.csv).

**Test çerçevesi:** Örnek CSV 150 kayıt içerir; GB-0140’ın metni boştur. Aşağıdaki küçük veri kümeleri CSV’deki gerçek satırlardan seçilir. Test amacıyla değiştirilen alanlar açıkça belirtilmiştir. `data/temalar.json` bulunmadığından kesin tema ataması gerektiren testler, PM onaylı sözlük sağlandıktan sonra çalıştırılabilir.

## Dosya yükleme

### KK-01 — Sabit sütunlu CSV’nin okunması
**Tür:** başarı  
**Kaynak:** K4; toplantı notu, Deniz: “CSV’yi atayım, temaları ve hangisinin öncelikli olduğunu göreyim.”

**Ön koşul:** Başlığı `id,tarih,kanal,metin,puan,segment` olan CSV yalnızca GB-0001 ve GB-0002 satırlarını içerir.  
**Eylem:** Dosyayı yükle.  
**Beklenen:** İki kayıt işlenir. GB-0001’in puanı `1`, GB-0002’nin puanı `5` olarak alınır; alanlar başka sütunlara kaymaz.

### KK-02 — Metindeki virgül ve çift tırnağın korunması
**Tür:** sınır  
**Kaynak:** K4’ün CSV girdi kararı; K7’nin gerçek alıntı kararı.

**Ön koşul:** CSV yalnızca GB-0105’i içerir.  
**Eylem:** Dosyayı yükle ve işlenen metni kontrol et.  
**Beklenen:** Tek kayıt oluşur. `metin` alanı tam olarak `Uygulama "harika" ama iptal ücreti, bildirimler, ödeme... hepsi sorun` olur; puan `2`, segment `duzenli` olarak okunur.

### KK-03 — Anket puanının yeniden dönüştürülmemesi
**Tür:** sınır  
**Kaynak:** K4: “Puan her kanalda 1-5; anket 0-10’dan dönüştürülüyor.”

**Ön koşul:** CSV GB-0004 ve GB-0014’ü içerir; ikisinin kanalı da `anket`tir.  
**Eylem:** Dosyayı yükle.  
**Beklenen:** Puanlama girdileri sırasıyla `2` ve `5` olur. Radar bu değerleri tekrar 0–10 ölçeğinden dönüştürmez.

## Tema eşleştirme

### KK-04 — Temaların onaylı sözlükten gelmesi
**Tür:** başarı  
**Kaynak:** K6.

**Ön koşul:** PM onaylı `data/temalar.json` kullanılabilir durumdadır. GB-0084 yüklenmiştir.  
**Eylem:** Tema eşleştirmesini çalıştır.  
**Beklenen:** Üretilen tema kimliklerinin tamamı sözlükte bulunur veya `diğer`dir. Kayıt metninden sözlük dışı yeni tema oluşturulmaz.

### KK-05 — Bir kaydın birden fazla temada sayılması
**Tür:** sınır  
**Kaynak:** K6: “Birden çok temaya giren kayıt her temada sayılır.”

**Ön koşul:** GB-0105’in onaylı sözlükle eşleştiği tema kümesi test öncesinde belirlenmiştir; kümede en az iki tema vardır. Satır, iptal ücreti, bildirimler ve ödemeyi birlikte içerir.  
**Eylem:** Yalnızca GB-0105’i işle.  
**Beklenen:** Eşleştiği her temanın kayıt sayısı `1` olur; kayıt yalnızca bir temaya indirgenmez. Her temanın ortalama puanına `2` katkısı yapılır.

### KK-06 — Eşleşmeyen kaydın “diğer” altında görünmesi
**Tür:** sınır  
**Kaynak:** K6.

**Ön koşul:** Onaylı sözlükle hiçbir eşleşmesi olmadığı doğrulanmış, metni boş olmayan tek kayıt hazırlanmıştır. GB-0116 bu kontrol için adaydır; eşleşmediği varsayılmaz.  
**Eylem:** Kaydı işle ve panoyu aç.  
**Beklenen:** Kayıt `diğer` altında görünür; `diğer` kayıt sayısı `1` olur.

### KK-07 — İngilizce yorumların aynı temalara katılması
**Tür:** başarı  
**Kaynak:** K8.

**Ön koşul:** PM onaylı sözlük ve şu gerçek satırlar yüklenmiştir:

- GB-0080: `Table ready notification arrived way too late.`
- GB-0051: `Masanız hazır bildirimi 20 dakika geç geldi, kapıda bekledik.`
- GB-0137: `I was charged a cancellation fee nobody told me about.`
- GB-0084: `İptal ücreti kesildi, beni arayın 0532 555 12 34`

**Eylem:** Tema eşleştirmesini çalıştır.  
**Beklenen:** GB-0080 ile GB-0051 bildirim gecikmesini karşılayan aynı temada; GB-0137 ile GB-0084 iptal ücretini karşılayan aynı temada sayılır. Bu iki temanın her birine ilgili çift `2` kayıt katkısı yapar.

## Puanlama

Bu bölümde **N**, temanın kayıt sayısı; **R**, temanın son 14 gündeki kayıt payıdır. R’nin hesaplanacağı tarih penceresi henüz kararlaştırılmadığından sayısal testlerde R açık girdi olarak verilir.

### KK-08 — Öncelik formülünün uygulanması
**Tür:** başarı  
**Kaynak:** K1.

**Ön koşul:** Puanlama testinde aynı temaya atanmış GB-0057 ve GB-0088 kullanılır. Puanları `1` ve `2`dir; R=`1` verilir.  
**Eylem:** Tema önceliğini hesapla.  
**Beklenen:** N=`2`, ortalama=`1,5`, mutsuzluk=`4,5`, yenilik=`2`; öncelik puanı `2 × 4,5 × 2 = 18` olur.

### KK-09 — Son 14 gün payının etkisi
**Tür:** sınır  
**Kaynak:** K1.

**Ön koşul:** KK-08’deki iki kaydın tema ataması ve puanları sabittir.  
**Eylem:** R’yi ayrı çalıştırmalarda `0`, `0,5` ve `1` olarak ver.  
**Beklenen:** Öncelik puanları sırasıyla `9`, `13,5` ve `18` olur.

### KK-10 — Puan ölçeğinin iki ucunda mutsuzluk
**Tür:** sınır  
**Kaynak:** K1, K4.

**Ön koşul:** GB-0001 ve GB-0002, her biri tek kayıtlı ayrı tema için puanlama girdisidir. R=`0` verilir.  
**Eylem:** İki temanın puanını hesapla.  
**Beklenen:** GB-0001 için `1 × (6−1) × 1 = 5`; GB-0002 için `1 × (6−5) × 1 = 1` elde edilir.

### KK-11 — Kanalların eşit katkı yapması
**Tür:** sınır  
**Kaynak:** K2.

**Ön koşul:** GB-0084’ün üç ayrı test kopyasında yalnızca `kanal` alanı değiştirilmiştir: `destek`, `magaza`, `anket`. Tema ataması ve R aynıdır.  
**Eylem:** Her kopyayı ayrı çalıştırmada puanla.  
**Beklenen:** Üç çalıştırmada kayıt sayısı, ortalama puan ve öncelik puanı aynı olur.

### KK-12 — “Yeni” segmentinin formüle girmemesi
**Tür:** sınır  
**Kaynak:** K1.

**Ön koşul:** GB-0057’nin üç ayrı test kopyasında yalnızca `segment` alanı `yeni`, `duzenli`, `kurumsal` olarak değiştirilmiştir. Tema ataması ve R aynıdır.  
**Eylem:** Her kopyayı ayrı çalıştırmada puanla.  
**Beklenen:** Üç çalıştırmanın öncelik puanı aynı olur; `yeni` segmenti ek çarpan üretmez.

## Pano

### KK-13 — Önceliklerin hesaplanan puana göre gösterilmesi
**Tür:** başarı  
**Kaynak:** K1; toplantı notundaki öncelikleri görme isteği; kararlar dosyasındaki Deniz ek notu.

**Ön koşul:** Pano testinde üç temanın hesaplanmış puanları `18`, `13,5`, `9`dur. İptal ücreti temasının puanı `9`dur.  
**Eylem:** Panoyu aç.  
**Beklenen:** Öncelik sırası `18 → 13,5 → 9` olur. İptal ücreti teması üçüncü görünür; Selin’in beklentisi nedeniyle birinciye taşınmaz.

### KK-14 — Örnek kesitin kendi kayıtlarıyla hesaplanması
**Tür:** sınır  
**Kaynak:** K5.

**Ön koşul:** GB-0084’ün eşleştiği temalar onaylı sözlükle belirlenmiştir. Dosya yalnızca bu satırı içerir.  
**Eylem:** Dosyayı işleyip panoyu aç.  
**Beklenen:** GB-0084’ün eşleştiği her temaya kayıt sayısı katkısı `1` olur. Destek sistemindeki “günde 14” sayısı bu hesaba eklenmez.

### KK-15 — Platform ve sürümün ayrı çıktı üretmemesi
**Tür:** sınır  
**Kaynak:** K8.

**Ön koşul:** GB-0056 (`5.2 sürümünden sonra bildirimler gecikiyor…`) ve GB-0144 (`android'de bildirim hiç gelmedi…`) yüklenmiştir.  
**Eylem:** Panoyu ve raporu incele.  
**Beklenen:** Platform veya sürüm için ayrı filtre, kırılım ya da analiz bölümü bulunmaz. Bu ifadeler kaynak alıntılarının içinde kalabilir.

## Rapor

### KK-16 — Markdown raporunun indirilebilmesi
**Tür:** başarı  
**Kaynak:** K7; toplantı notu, Deniz: “Rapor yönetime gidecek, markdown olsun ki Confluence’a yapıştırayım.”

**Ön koşul:** GB-0051, GB-0056 ve GB-0057 işlenmiş; tema eşleştirmesi ve puanlama tamamlanmıştır.  
**Eylem:** Rapor indirme eylemini çalıştır.  
**Beklenen:** İndirilen dosya Markdown metni içerir. Tema bölümleri ve kaynak alıntıları dosyanın içeriğinde bulunur.

### KK-17 — İlk beş temanın rapora alınması
**Tür:** başarı  
**Kaynak:** K7, K1.

**Ön koşul:** Altı temanın hesaplanan öncelik puanları sırasıyla `60`, `50`, `40`, `30`, `20`, `10`dur; eşit puan yoktur.  
**Eylem:** Raporu indir.  
**Beklenen:** Raporun tema bölümleri `60`, `50`, `40`, `30`, `20` puanlı beş temadan oluşur. `10` puanlı tema için bölüm bulunmaz.

### KK-18 — Tema başına en yeni üç alıntı
**Tür:** başarı  
**Kaynak:** K7.

**Ön koşul:** Rapor kapsamındaki tek temanın kayıtları GB-0080 (`2026-09-25`), GB-0051 (`2026-10-01`), GB-0056 (`2026-10-02`), GB-0057 (`2026-10-04`) olarak belirlenmiştir.  
**Eylem:** Raporu indir.  
**Beklenen:** Temanın üç alıntısı GB-0051, GB-0056 ve GB-0057’nin metinleridir. GB-0080 alıntısı bulunmaz. Tarihler birbirinden farklı olduğundan eşit tarih kuralına ihtiyaç yoktur.

## Gizlilik

### KK-19 — Dosyanın tarayıcı dışına gönderilmemesi
**Tür:** başarı  
**Kaynak:** K3; toplantı notunun “Sunucu yok, tarayıcıda çalışacak” kararı.

**Ön koşul:** Uygulama açılmıştır; ağ kaydı temizlenmiştir. GB-0084 ve GB-0120’yi içeren CSV hazırlanmıştır.  
**Eylem:** Dosyayı yükle, panoyu oluştur ve raporu indir; ağ kaydını incele.  
**Beklenen:** Bu işlemler dosyayı veya içeriğini taşıyan `0` ağ isteği üretir. İşleme ve rapor üretimi dış servis veya dış kütüphane çağrısı yapmaz.

### KK-20 — Panodaki telefonun maskelenmesi
**Tür:** başarı  
**Kaynak:** K3.

**Ön koşul:** GB-0084 yüklenmiştir; alıntısı panoda görüntülenmektedir.  
**Eylem:** Görünür alıntıyı kontrol et.  
**Beklenen:** Metin `İptal ücreti kesildi, beni arayın 0532 *** ** 34` olarak görünür. `0532 555 12 34` görünmez.

### KK-21 — İndirilen rapordaki telefonun maskelenmesi
**Tür:** başarı  
**Kaynak:** K3, K7.

**Ön koşul:** GB-0084, rapordaki bir temanın en yeni üç alıntısı arasındadır.  
**Eylem:** Raporu indir ve dosya içeriğini incele.  
**Beklenen:** İlgili alıntı `İptal ücreti kesildi, beni arayın 0532 *** ** 34` olarak bulunur. Dosyanın hiçbir yerinde `0532 555 12 34` bulunmaz.

## Kararı eksik

Aşağıdaki durumlara beklenen sonuç atanmamıştır. Özellikle **boş metin, tekrar kayıt, Türkçe karaktersiz yazım ve bozuk CSV** için mevcut kaynaklar hata/sınır kriteri yazmaya yetmiyor.

| Konu / kanıt | Kriter yazmak için gereken karar | Kime sorulmalı |
|---|---|---|
| **Tema sözlüğü eksik — K6** | `data/temalar.json` sağlanmalı ve PM onayı verilmelidir. GB-0105’in çoklu eşleşmeleri, İngilizce satırların karşılıkları ve eşleşmeyen satırlar bu sürüme göre sabitlenmelidir. | Deniz; uygulama biçimi için Mert |
| **Boş metin — GB-0140** | Satır reddedilecek mi, atlanacak mı, `diğer`e mi alınacak? Sayımlara ve puanlamaya katılacak mı? Kullanıcı hangi sonucu görecek? Tam örnek dosyanın kabul edilen kayıt sayısı bu karara bağlıdır. | Deniz, Ece |
| **Tekrar eden kayıt — GB-0011 / GB-0150** | Bu iki satırın metni aynıdır; kimlikleri ve tarihleri farklıdır. Tekrarın ölçütü `id`, metin veya tüm alanlar mı? Aynı `id` tekrar geldiğinde ve aynı dosya yeniden yüklendiğinde ne yapılacak? | Deniz, Ece |
| **Türkçe karaktersiz yazım — GB-0059 / GB-0031; GB-0076 / GB-0010** | `gec`–`geç`, `Odeme`–`Ödeme`, `cekildi`–`çekildi` gibi yazımlar eşdeğer mi? Büyük/küçük harf ve `I/İ/ı/i` dönüşümleri nasıl uygulanacak? K8 yalnızca İngilizceyi karara bağlar. | Deniz, Mert |
| **Bozuk CSV — GB-0105’ten türetilen kapanmamış tırnak; K4 başlığından türetilen eksik `puan` sütunu** | Dosyanın tamamı mı reddedilecek, geçerli satırlar mı alınacak? Hata mesajı hangi satırı/alanı gösterecek? Önceden yüklenmiş veri korunacak mı? | Deniz, Ece; hata davranışı için Mert |
| **Geçersiz alan değerleri — K4** | `puan=0`, `puan=6`, boş puan, geçersiz tarih, eksik `id`, bilinmeyen kanal ve fazladan sütun için reddetme/düzeltme kuralları nedir? | Ece, Deniz |
| **Son 14 gün — K1** | Referans gün bugün mü, dosyanın en yeni tarihi mi? Başlangıç/bitiş günleri dahil mi, saat dilimi nedir? Örneğin referans 8 Ekim ise GB-0095’in 24 Eylül tarihi pencereye girer mi? | Deniz, Ece |
| **Eşit öncelik ve gösterim — K1, K7** | Eşit puanlarda sıralama nasıl yapılacak? Beşinci sıra eşitliğinde hangi tema seçilecek? Sıralamada ham puan mı, yuvarlanmış puan mı kullanılacak; kaç basamak gösterilecek? | Deniz, Ece |
| **Az tema / az alıntı / eşit tarih — K7** | Beşten az tema ve üçten az kayıt varsa rapor ne içerecek? GB-0051 ve GB-0065 gibi aynı tarihli kayıtlar üçüncü alıntı sınırında nasıl seçilecek? | Deniz |
| **`diğer`in sıralama ve rapordaki yeri — K6, K7** | `diğer` normal tema gibi puanlanıp ilk beşe girebilir mi? | Deniz |
| **Uluslararası telefon — GB-0120** | `+90 555 987 65 43` için tam maske çıktısı nedir? Ülke kodu, bitişik yazım, tire/parantez ve metindeki birden fazla telefon nasıl ele alınacak? | Mert, Deniz |
| **Hacim ve süre — K5** | Desteklenen dosya boyutu/kayıt sayısı ve hedef cihazda yükleme–pano–rapor süre sınırları nedir? 150 satırlık örnek, üst sınır veya performans hedefi değildir. | Deniz, Mert |