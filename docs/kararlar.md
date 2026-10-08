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

# Ek kararlar: 9 Ekim

Kriterlerin ikinci turunda çıkan E14-E22 için kısa toplantı. Deniz: "Bundan sonra çıkan uç durumları sürüm 2'ye yazıyoruz; demoya bunlarla gidiyoruz."

| # | Soru | Karar | Kim verdi |
|---|---|---|---|
| K21 | Tema sözlüğü (E1) | Sözlüğü `feedback-clustering` skill'i önerir, Deniz onaylar. Onaylanan sözlük `data/temalar.json` olur ve testler buna göre yazılır. "Ücretsiz iptal süresi" ve iptal politikası soruları "iptal ücreti" temasına girer, çünkü kullanıcının derdi aynıdır. Olumlu yorumlar ayrı "övgü" temasında toplanır ve sıralamaya girmez. | Deniz |
| K22 | Pencere (E14) | 14 gün: en yeni tarih ve önceki 13 gün. | Deniz |
| K23 | Okunan ve atlanan (E15) | "Okunan", başlık hariç dosyadaki satır sayısıdır. Tekrar eden kayıtlarda ilk satır tutulur, sonrakiler "tekrar" nedeniyle atlananlara yazılır. | Deniz |
| K24 | Diğer satır sorunları (E16) | Geçerli kanallar `destek`, `magaza`, `anket`; geçerli segmentler `yeni`, `duzenli`, `kurumsal`. Tarih yalnız `YYYY-AA-GG` biçiminde. UTF-8 BOM kabul edilir. Dışında kalan her şey bozuk satırdır ve atlanır. Bütün satırlar atlanırsa pano yerine "Kullanılabilir satır yok" yazar. | Deniz, Ece |
| K25 | Sayı gösterimi (E17) | Türkçe biçim: virgül ayraç, bir ondalık, yarım yukarı yuvarlanır (`229,5`). Ortalama puan da bir ondalık. | Deniz |
| K26 | Alfabe (E18) | Türk alfabesi sırası (`localeCompare` tr). | Deniz |
| K27 | Diğer telefon biçimleri (E19) | Tire, parantez ve boşlukla yazılmış Türkiye numaraları (`0532-555-12-34`, `(0532) 555 12 34`, `532 555 12 34`) da maskelenir. Yurt dışı numaralar sürüm 2'de. | Mert |
| K28 | Rapor adı (E20) | Dosya adındaki tarih, dosyadaki en yeni tarihtir. Rapor `# Radar raporu: <tarih>` ile başlar, her tema `##` başlığıdır. | Deniz |
| K29 | Ölçüm (E21-E22) | Performans ekibin standart dizüstünde, dosya seçildiği andan pano görünene kadar ölçülür. K17 yalnız teslim edilen koda uygulanır; testler Node'un yerleşik test aracıyla yazılır. | Deniz, Mert |

# Ek kararlar: 10 Ekim (PRD'ye ikinci göz)

PRD iki ayrı modele eleştirtildi (`docs/karsilastirma/05-*-elestiri.md`). İkisinin de bulduğu üç sorun ve diğer itirazlar Deniz, Mert ve Ece ile karara bağlandı.

| # | Soru | Karar | Kim verdi |
|---|---|---|---|
| K30 | K20 ile K21 çelişiyor | K21 geçerlidir. "İptal ücreti" teması ücret, kesinti, ceza ya da para geçen iptal kayıtlarını ve iptal süresi ya da politikası sorularını kapsar. Bildirim yüzünden olan iptal bildirim temasına girer. Kabul kriterlerindeki beklenen sayılar onaylı sözlükle yeniden hesaplanır. | Deniz |
| K31 | İleri tarihli satır | Bugünün tarihinden sonraki tarihler bozuk satır sayılır ve "ileri tarih" nedeniyle atlanır. Pencere, geçerli satırların en yeni tarihinden hesaplanır. | Deniz, Ece |
| K32 | Tema ayrıntısı | Temalar kullanıcının derdi düzeyindedir (ör. "ödeme hatası" tek temadır). Alt kırılım sürüm 2'de. Sözlük bu düzeyde onaylanır. | Deniz |
| K33 | İsim ve yönetim raporu | "Raporu indir" düğmesinin yanında uyarı yazar: "Alıntılarda isim ya da başka kişisel bilgi olabilir. Göndermeden önce okuyun." | Mert, Deniz |
| K34 | Kayıt mı kişi mi | Radar kayıt sayar. Pano ve raporda "kişi" değil "kayıt" yazar. Aynı `id` farklı içerikle iki kez gelirse ikisi de atlanır, neden "çelişkili id" olarak yazılır. | Deniz, Ece |
| K35 | Örneklem ve kanal dağılımı | Raporun ilk satırı kapsamı söyler: tarih aralığı, kayıt sayısı ve kanal dağılımı. Yönetim sunumunda "örnek dosyaya göre" ifadesi kullanılır. | Deniz |
| K36 | Puan ile metin uyuşmazlığı | Sürüm 1'de puan esas alınır. Uyuşmazlık sürüm 2'de ele alınacak. | Deniz |

# Son tur: 11 Ekim (kapsam donduruldu)

PRD sürüm 2'nin "Açık kararlar" listesi tek toplantıda kapatıldı. Deniz: "Kararlar donduruldu. Bundan sonra çıkan her şey sürüm 2 listesine."

| # | Açık karar | Karar | Kim verdi |
|---|---|---|---|
| K37 | Sözlük ve tema adı | Sözlük en geç 13 Ekim'de onaylanır. Tema adı "İptal ücreti ve politikası" olur. | Deniz |
| K38 | Kriterlerin güncellenmesi | Kriterler K21-K36'ya göre güncellenir. Örnek dosyanın beklenen sayıları elle değil, testteki betikle hesaplanır; kriter testin çıktısına bağlanır. | Deniz, Mert |
| K39 | Övgü teması | Övgü sözlükte kelimeyle belirlenir. Övgü kaydı bir şikâyet temasına da giriyorsa orada da sayılır. Övgü puanlanmaz, panoda "diğer"in üstünde sayısıyla görünür. İstek kayıtları (ör. masa seçimi) sıralamaya girer. | Deniz |
| K40 | Radar ne gösteriyor | Şu anki önceliği, yani yenilik dahil puanı. Rapor her tema için yeniliksiz temel puanı da yazar. | Deniz |
| K41 | Örnekleme | Dosya, seçilen tarih aralığındaki bütün kanalların bütün kayıtlarını içerir. "Kesit" yalnız tarih aralığı demektir. | Ece |
| K42 | Kişisel veri ve rapor | `id` raporda kalır. E-posta tamamen maskelenir (`a***@***`). Rapor yalnız ürün ekibinin alanına konur. Veri sorumlusu onayı sürüm 2'den önce alınır. | Mert, Deniz |
| K43 | Anket puanı | Radar dönüşüm yapmaz, gelen 1-5 puanı kullanır. Dönüşümü Ece dışa aktarırken yapar ve belgeler. | Ece |
| K44 | Atlama nedenleri | Panodaki ifadeler: "boş metin", "tekrar", "çelişkili id", "ileri tarih", "eksik alan", "geçersiz puan", "geçersiz tarih", "bilinmeyen kanal", "bilinmeyen segment". | Deniz |
| K45 | "Bugün" | Tarayıcının saat dilimindeki bugünün tarihi. Testlerde bugün dışarıdan verilir. Rapor tarihi geçerli satırlardan alınır. | Mert |
| K46 | Rapor başı | Önce `# Radar raporu: <tarih>` başlığı, hemen altında kapsam satırı (K35). | Deniz |

# Plan kararları: 12 Ekim

İki aracın planı (`docs/karsilastirma/08-*-plan.md`) karşılaştırıldı. Claude'un planı seçildi; açık soruları kapatıldı.

| # | Soru | Karar | Kim verdi |
|---|---|---|---|
| K47 | Sayfa nasıl açılır | Yerelde `python3 -m http.server` ile açılır; yayında GitHub Pages sunar. K3'teki "sunucu yok" kararı "veri dışarı gitmez, arka uç yok" demektir; statik dosya sunmak bu karara aykırı değildir. Çift tıkla `file://` açmak desteklenmez, README bunu söyler. | Mert, Deniz |
| K48 | Sözlük şeması | `{ "surum", "temalar": [{ "ad", "kurallar": [[kelime, ...], ...] }], "ovgu": { "kurallar" } }`. Bir kural içindeki kelimelerin hepsi geçmelidir; kurallardan biri tutarsa kayıt temaya girer. Skill bu biçimde üretir. | Deniz, Mert |
| K49 | K44 dışı satır sorunları | Satır satır ayrıştırılır; metin içinde satır sonu desteklenmez. Fazla alan ve kapanmamış tırnak "eksik alan" sayılır. Birden çok sorunu olan satıra tek neden yazılır. | Deniz, Ece |
| K50 | Markdown'da yıldız | Raporda alıntılar `>` blok alıntısıdır ve maske yıldızları `\*` diye kaçırılır; Confluence'ta yıldız olarak görünür. Panoda kaçış yoktur. | Deniz |
| K51 | Beklenen değerleri kim hesaplar | `tests/beklenen/hesapla.mjs` uygulamanın kodunu kullanmaz; kuralları ayrı ve sade bir kodla yeniden hesaplar, uygulamayla yalnız sözlüğü paylaşır. Çıktıyı Deniz onaylar. | Deniz, Mert |

# Sözlük onayı: 13 Ekim

| # | Soru | Karar | Kim verdi |
|---|---|---|---|
| K52 | Tema sözlüğü | `docs/karsilastirma/11-claude-sozluk.md`'deki öneri değiştirilmeden onaylandı ve `data/temalar.json` oldu: yedi tema ve övgü. "Sadakat puanı kaybı" ayrı tema olarak kalır (2 kayıt). Öneriyle gelen "şüpheli eşleşmeler" listesi sürüm 2'de gözden geçirilecek. | Deniz |

# İnceleme kararları: 14 Ekim

İki kod incelemesi (`docs/karsilastirma/23-*`) ve doğrulama (`22-*`) sonrası.

| # | Soru | Karar | Kim verdi |
|---|---|---|---|
| K53 | MCP sunucusu alıntıları modele veriyor; K3 ile çelişiyor | K3 tarayıcı uygulaması içindir. MCP sunucusu ve ajanla analiz yalnız örnek ya da anonimleştirilmiş veriyle yapılır; gerçek müşteri dışa aktarımı ajana verilmez. Codex'te `radar_alinti` her çağrıda onay ister, `radar_ozet` (metin döndürmez) onaysız çalışır. | Mert, Deniz |
