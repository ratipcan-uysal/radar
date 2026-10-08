# Çevrimdışı menü: PRD (sürüm 1)

**Kaynaklar:** `evals/prd-writer/fixtures/01-hedefsiz/input.md` (K1-K3 = kararlar; "Notlar" = Hande, Kaan notları)

## 1. Sorun
- Metro gibi bağlantının çekmediği yerlerde kullanıcılar menüye bakamıyor ve şikâyet ediyor (Notlar, Hande/PM).
- Şikâyet sayısı, sıklığı ve hangi platformları etkilediği: Bilinmiyor, Hande'ye sorulacak.

## 2. Kim için
- **Kullanan:** Bağlantısı olmayan ya da zayıf olan yerde, daha önce açtığı bir restoranın menüsüne bakmak isteyen kullanıcı (K1, Notlar).
- **Okuyan:** Bilinmiyor, Hande'ye sorulacak (yönetim ve geliştirme tarafındaki okurlar girdide belirtilmemiş).
- **Veriyi hazırlayan:** Menü verisi uygulama tarafından telefonda tutulur (Notlar, Kaan/Android). Menü içeriğini kimin yönettiği: Bilinmiyor, Hande'ye sorulacak.

## 3. Başarı nasıl ölçülür
- **Teslimin bitti sayılması:** Kabul kriterleri henüz yazılmadı. Kararlardan çıkan kontrol edilebilir davranışlar: internet yokken son açılan 5 restoranın menüsü görünür (K1); fiyatların yanında "son güncelleme" tarihi görünür (K2); rezervasyon düğmesi devre dışıdır (K3). Resmî kriter listesi için önce `acceptance-criteria` çalıştırılmalı.
- **Ürün hedefi:** Bilinmiyor, Hande'ye sorulacak. Girdi: "Başarı ölçütü ve teslim tarihi konuşulmadı." Bu PRD'de hedef sayı verilmemiştir.

## 4. Kapsam
| Alan | Gereksinim | Kaynak |
|---|---|---|
| Menü erişimi | Kullanıcı internet yokken son açtığı 5 restoranın menüsünü görebilir. | K1 |
| Menü içeriği | Çevrimdışı menüde fiyatların yanında "son güncelleme" tarihi yazar. | K2 |
| Rezervasyon | Çevrimdışıyken rezervasyon yapılamaz; düğme devre dışıdır. | K3 |
| Veri saklama | Menü verisi telefonda en fazla 7 gün tutulur. | Notlar (Kaan, Android); karar numarası yok |

## 5. Kapsam dışı
- Girdide kapsam dışı olarak yazılmış madde yok. Bilinmiyor, Hande'ye sorulacak. Çevrimdışı rezervasyon kuyruğu, 5'ten fazla restoran gibi konular da girdide geçmediği için kapsamda değildir; bunları kapsam dışı ilan etmek karar gerektirir.

## 6. Gizlilik
- Bilinmiyor, Hande'ye sorulacak. Girdide gizlilik kararı yok. Telefonda saklanan menü verisi için bir kısıtlama belirtilmemiş.

## 7. Teslim
- Teslim tarihi: Bilinmiyor, Hande'ye sorulacak. Girdi: "teslim tarihi konuşulmadı."
- Platform kapsamı: Yalnız Android'den söz ediliyor (Kaan). iOS ve web durumu: Bilinmiyor, Hande'ye sorulacak.

## 8. Riskler
- **Hedef ve tarih yok:** Başarı ölçütü ve teslim tarihi konuşulmadığı için işin bittiği ya da değerinin ölçülemeyeceği görülemez.
- **Karar numarasız gereksinim:** 7 günlük saklama süresi yalnız bir not olarak geçiyor, karara bağlanmamış. Geliştirici bunu kısıt, PM ise tercih sayabilir.
- **K1 ile 7 gün kuralının etkileşimi:** Kullanıcı 7 günden eski bir menüyü görmek isterse ne olacağı belirsiz. Menü silinirse K1'deki "son açtığı 5 restoran" garantisi bozulabilir. Bu bir çelişki olabilir; kaynaklarda çözümü yok.
- **Eski veri uyarısı:** K2 tarihi gösteriyor, ancak eski fiyatın kullanıcıyı yanıltma riskine karşı bir uyarı eşiği tanımlı değil.
- **Platform belirsizliği:** Notlarda yalnız Android var; diğer platformlarda aynı davranış beklenip beklenmediği belli değil.

## 9. Açık kararlar
1. **Başarı ölçütü:** Çevrimdışı menünün başarısı hangi göstergeyle anlaşılacak? Kime: Hande (PM).
2. **Teslim tarihi:** Ne zaman teslim edilecek? Kime: Hande (PM).
3. **7 gün kuralı:** Süre karar olarak mı onaylanıyor? Süre dolunca menüye ne olur, K1 ile nasıl uyuşur? Kime: Hande (PM), Kaan (Android).
4. **Platform kapsamı:** Yalnız Android mı, iOS ve web de mi? Kime: Hande (PM).
5. **Kapsam dışı ve gizlilik:** Bu iki bölümün içeriği nedir? Kime: Hande (PM).
6. **Menü verisini yöneten kişi:** Kime: Hande (PM).
