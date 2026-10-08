# Radar — Tek sayfalık PRD

*Kaynak notu: `kararlar.md`, K1–K20 yanında K21–K29 ek kararlarını da içeriyor. Aşağıdaki metin bu ek kararları dikkate alır; kabul kriterleriyle kalan uyumsuzluklar en sondadır.*

**Sorun**

Destek, mağaza yorumları ve NPS geri bildirimleri ayrı yerlerde; ekip her çeyrek kullanıcı ihtiyaçlarını elle araştırıyor. Radar, sonraki çeyreğin ilk üç işini kanıtla seçmek için geri bildirimleri temalara ve öncelik sırasına dönüştürür. *(Toplantı notu, Deniz; KK-16)*

**Kim için**

Doğrudan kullanıcı Deniz (PM); raporun alıcısı yönetim, veri hazırlayan Ece’dir. *(Toplantı notu; K4)* Diğer kullanıcılar ve kullanıcı sayısı **Bilinmiyor: Deniz’e sorulacak.**

**Başarı nasıl ölçülür**

- Bitiş koşulu kabul kriterlerinin tamamının geçmesidir; sıralama formülden çıkar, belirli bir temanın birinci olması beklenmez. *(KK-01–KK-40, KK-17)*
- Güncel Chrome, Safari ve Edge’de aynı sonuç; ekibin standart dizüstünde 5.000 satır için dosya seçiminden panonun görünmesine kadar **2 saniyenin altında** süre. *(K18, K19, K29; KK-37, KK-38)*
- Ürün kullanımının veya karar kalitesinin ölçüleceği iş metriği **Bilinmiyor: Deniz’e sorulacak.**

**Kapsam (gereksinimler)**

- Ece’nin hazırladığı tek CSV yüklenir: `id,tarih,kanal,metin,puan,segment`; puanlar 1–5’tir. Tırnak, virgül ve emoji korunur. Farklı başlık dosyayı reddettirir; bozuk ve boş metinli satırlar gerekçeleriyle atlanır. *(K4, K10, K11, K13; KK-02)*
- Kanallar `destek,magaza,anket`; segmentler `yeni,duzenli,kurumsal`; tarih `YYYY-AA-GG`; UTF-8 BOM kabul edilir. Kullanılabilir satır kalmazsa mesaj gösterilir. Tekrarlarda ilk kayıt tutulur; sonraki kopyalar “tekrar” olarak atlanır. *(K23, K24)*
- Temalar Deniz’in onayladığı `data/temalar.json` sözlüğünden gelir. Çok temalı kayıt her temada sayılır; İngilizce ve Türkçe eşleri birlikte eşleşir, harf ve Türkçe karakter farklılıkları eşleşmeyi bozmaz. Eşleşmeyenler “diğer”, olumlu yorumlar “övgü” olur; ikisi de sıralanmaz. *(K6, K8, K21; KK-09–KK-11)*
- Öncelik = **kayıt sayısı × (6 − ortalama puan) × (1 + son 14 gündeki tema kayıtlarının payı)**. Pencere dosyanın en yeni tarihi ve önceki 13 gündür. Kanallar eşittir; segment puanı etkilemez. *(K1, K2, K9, K22)*
- Pano azalan öncelikle tema adı, puan, kayıt sayısı ve ortalamayı; üstte okunan/atlanan sayılarını gösterir. “Diğer” en altta yalnız sayısıyla görünür. Eşitlikte kayıt sayısı, ardından Türk alfabesi belirler. Puan ve ortalama virgüllü, bir ondalıklı, yarım yukarı yuvarlanır. *(K12–K14, K23, K25, K26)*

**Kapsam dışı**

Platform/sürüm analizi *(K8)*; dosya birleştirme *(K10)*; kanal ağırlığı ayarı *(K2)*; yurt dışı telefon maskelemesi *(K27)*; “günde 14” hacmini tutturma *(K5)* ve iptal ücretini zorunlu olarak birinci çıkarma *(KK-17)*.

**Gizlilik**

Dosya tarayıcıdan gönderilmez; dış servis ve teslim edilen kodda paketlenmiş olanlar dahil dış kütüphane kullanılmaz. Açılıştan sonra çevrimdışı çalışır. Telefonların son iki hanesi dışındaki rakamlar ve e-postalar panoda/raporda maskelenir; Türkiye numaralarının tireli, parantezli ve başında sıfır olmayan biçimleri kapsanır. İsimler maskelenmez. *(K3, K15, K17, K27, K29; KK-22–KK-23)*

**Teslim (demo)**

**16 Ekim Cuma:** pano ve indirilebilir Markdown raporu. Rapor ilk 5 sıralı temayı; puan, kayıt sayısı, ortalama ve tema başına en yeni 3 maskeli alıntıyı tarih/kanal/`id` ile içerir. Eksik tema veya alıntı doldurulmaz; eşit tarihte küçük `id` önce gelir. Dosya adı `radar-raporu-YYYY-AA-GG.md`, tarih dosyanın en yeni tarihidir. *(K7, K14, K16, K28; KK-20–KK-21)*

**Riskler**

Örnek dosya gerçek destek hacminin kesitidir *(K5)*; sözlük ayrıntısı sıralamayı etkiler *(KK-40)*; isimler metinde görünür kalır *(K15)*. Kabul kriterleri ek kararlarla tam uyumlu değildir.

**Açık kararlar**

- Onaylı sözlüğün nihai adları, ifadeleri ve ayrıntı düzeyi **Bilinmiyor: Deniz’e sorulacak.** `data/temalar.json` mevcut değil. *(K6, K21; KK-06, KK-40)*
- K21’in iptal politikası ve övgü kararlarıyla çelişen KK-39/KK-40’ın bağlayıcı beklentileri **Bilinmiyor: Deniz’e sorulacak.**
- K22–K29’un kapattığı konuları hâlâ açık gösteren kabul kriterlerinin güncel kabul metni **Bilinmiyor: Deniz ve Mert’e sorulacak.**