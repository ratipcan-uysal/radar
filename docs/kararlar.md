# Kararlar: 7 Ekim toplantısı

`docs/acik-noktalar.md` içindeki sekiz soru, Deniz, Selin, Ece ve Mert ile tek tek konuşuldu.

| # | Soru | Karar | Kim verdi |
|---|---|---|---|
| K1 | Öncelik nasıl hesaplanır? | Puan = **kaç kayıt** × **mutsuzluk** × **yenilik**. Mutsuzluk = 6 − temanın ortalama puanı. Yenilik = son 14 günün kayıt payı + 1. "Yeni" segmenti formüle girmez. | Deniz |
| K2 | Kanal ağırlığı | Bütün kanallar eşit sayılır. Selin'in itirazı not edildi, ikinci sürümde ayar olarak tekrar konuşulacak. | Deniz (Selin itiraz etti) |
| K3 | Kişisel veri | Dosya tarayıcıdan hiçbir yere gönderilmez, dış servis ya da kütüphane çağrılmaz. Metindeki telefon numaraları panoda ve raporda maskelenir (biçimi K15'te). | Mert, Deniz |
| K4 | Ham dosya | Ece ad ve telefon sütunlarını silip tek CSV verir. Sütunlar sabit: `id,tarih,kanal,metin,puan,segment`. Puan her kanalda 1-5; anket 0-10'dan dönüştürülüyor. | Ece |
| K5 | Hacim | Örnek dosya destek kayıtlarının bir kesiti. Selin'in "günde 14" sayısı destek sisteminin kendi panosundan, Radar'ın bunu tutturması beklenmiyor. | Ece, Selin |
| K6 | Temalar | Temalar sabit bir sözlükten gelir (`data/temalar.json`), sözlüğü PM onaylar. Birden çok temaya giren kayıt her temada sayılır. Hiçbir temaya girmeyen kayıt "diğer" altında görünür. | Deniz |
| K7 | Demo | 16 Ekim Cuma. Demoda pano ve indirilebilen rapor gösterilecek. Rapor ilk 5 temayı ve tema başına en yeni 3 alıntıyı içerir. | Deniz, Mert |
| K8 | İngilizce ve platform | İngilizce yorumlar Türkçelerle aynı temalarda sayılır. Platform ve sürüm bilgisi bu sürümde kapsam dışı. | Selin, Ece |

Ek not (Deniz): "Selin'in beklentisi, yani iptal ücretinin en üstte çıkması, kabul kriteri değildir. Sıralama hangi sonucu veriyorsa onu kabul edeceğiz."

# Ek kararlar: 8 Ekim

Kabul kriterleri yazılırken çıkan "Kararı eksik" listesi (E1-E13) Deniz ve Mert ile kapatıldı.

| # | Soru | Karar | Kim verdi |
|---|---|---|---|
| K9 | "Son 14 gün" ve yenilik payı | Son 14 gün, dosyadaki en yeni tarihten geriye 14 gündür; o gün dahil. Pay = temanın kayıtlarından son 14 güne düşenlerin oranı. | Deniz |
| K10 | Tekrar eden kayıt | `id` dışındaki bütün alanları aynı olan kayıtlar bir kez sayılır. Aynı `id` iki kez gelirse ikincisi atlanır. Tek dosya yüklenir, dosya birleştirme yok. | Deniz, Ece |
| K11 | Bozuk satır | Dosya reddedilmez. Bozuk satır (eksik alan, 1-5 dışında puan, geçersiz tarih, bilinmeyen kanal) atlanır. Panoda kaç satırın, hangi nedenle atlandığı yazar. Başlık satırı beklenenden farklıysa dosyanın tamamı reddedilir. | Deniz |
| K12 | Panodaki sayılar | Her tema için ad, puan (bir ondalık), kayıt sayısı ve ortalama puan. Üstte okunan ve atlanan satır sayısı. | Deniz |
| K13 | "Diğer" ve boş metin | "Diğer" puanlanmaz ve sıralamaya girmez, panonun en altında yalnız sayısıyla görünür. Boş metinli satır atlanır, nedeni "boş metin" olarak yazılır. | Deniz |
| K14 | Eşitlik | Puanı eşit temalarda kayıt sayısı fazla olan önce gelir. O da eşitse tema adı alfabetik sıralanır. Tarihi eşit alıntılarda `id`'si küçük olan önce gelir. | Deniz |
| K15 | Maske | 0 ya da +90 ile başlayan, boşluklu ya da bitişik 10-12 haneli telefon numaralarında son iki hane dışındaki her rakam `*` olur, boşluk ve `+` yerinde kalır: `0532 555 12 34` → `**** *** ** 34`. E-posta adresi `a***@alan.com` biçiminde maskelenir. İsim maskelenmez, çünkü güvenilir biçimde tespit edilemez. | Mert, Deniz |
| K16 | Rapor biçimi | Dosya adı `radar-raporu-YYYY-AA-GG.md`. Her tema için başlık, puan, kayıt sayısı, ortalama puan ve 3 alıntı. Her alıntının yanında tarih, kanal ve `id` yazar, metin maskelidir. | Deniz |
| K17 | Kütüphane | Hiçbir dış kütüphane kullanılmaz, paketlenmiş olanlar da dahil. | Mert |
| K18 | Tarayıcı | Chrome, Safari ve Edge'in güncel sürümleri. | Mert |
| K19 | Performans | 5.000 satırlık dosyada pano 2 saniyenin altında açılır. | Deniz |
| K20 | İptal teması | "İptal ücreti" teması yalnız ücret, kesinti, ceza ya da para geçen iptal kayıtlarını kapsar. "Bildirim gecikti, rezervasyonum iptal oldu" bildirim temasına girer. | Deniz |
