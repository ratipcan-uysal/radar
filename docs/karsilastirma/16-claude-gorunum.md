Görünümü yeniledim, işlev aynı kaldı. Tüm testler geçiyor. Sayfayı tarayıcıda açıp bakamadım: 375 px görünümü, koyu tema ve klavyeyle gezinme gözle denenmedi. Demodan önce bir kez Chrome ve Safari'de açıp bakmak gerek.

**`npm test` son satırları**
```
ℹ tests 122
ℹ suites 0
ℹ pass 122
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 239.150917
```

**Değişen dosyalar**
- `radar.css`: baştan yazıldı.
- `index.html`: dosya seçimi ve "Raporu indir" düğmesi en üstte tek bir kutuda.
- `src/pano.js`: yalnız sınıf adları ve sarmalayıcılar eklendi. Hesaplar ve metinler aynı, panonun düz metni karakter karakter eskisiyle aynı.

**Görünüm**
- **Üst kısım:** üstte dosya seçimi ve rapor düğmesi. Altında koyu yazılmış kapsam satırı, onun altında okunan/atlanan sayıları ve nedenleri küçük, soluk bir kutuda.
- **Tema kartları:** puana göre sıralı, tam genişlikte satırlar. Geniş ekranda da tek sütun, böylece çubuklar alt alta karşılaştırılabiliyor. Her kartta:
  - büyük puan ve yanında puan / en yüksek puan çubuğu;
  - altında temel puan, kayıt sayısı ve ortalama puan;
  - açılır kapanır "Alıntılar (n)". Her alıntıda tarih / kanal / kimlik küçük bir satırda, metin altında.
- **En alt:** Övgü ve Diğer, kesik çizgili bir kutuda.
- **Tema ve ekran:** açık ve koyu tema `prefers-color-scheme` ile değişiyor. Yazı sistem fontu; dış font, kütüphane ve CDN yok (K17). Dar ekranda her şey tek sütun.
- **Klavye:** dosya seçimi, düğme ve alıntı başlıkları Tab ile geziliyor; odaklanınca 3 px'lik bir çerçeve çıkıyor.
- **Kontrast:** oranları renk değerlerinden hesapladım. Hesap betiği izin istediği için çalışmadı. Metin her iki temada en az yaklaşık 7,8:1, çubuk ile zemini arası yaklaşık 6:1.

**Bilmeniz gerekenler**
1. **Okunan/atlanan kutusu DOM'da kapsamın önünde.** Testler bu sırayı bekliyor, kapsamı CSS ile görsel olarak üste aldım. Ekran okuyucu önce okunan/atlanan bilgisini, sonra kapsamı okur. İkisinde de tıklanabilir öğe olmadığı için klavye sırası etkilenmiyor.
2. **Çubuk genişliği tek yeni hesap.** Puanın en yüksek puana oranı olarak `pano.js` içinde hesaplanıyor ve yalnız görseldir; ekrandaki sayılar hep eskisi gibi `bicim`'den geliyor. Genişliği `dolgu.style = 'width: …%'` ile veriyorum. Bunun sebebi, testlerdeki sahte DOM'un `style.width` özelliğini desteklememesi; tarayıcıda bu yazım geçerli.
3. **Virgüller görselde gizli.** Puan, temel puan, kayıt sayısı ve ortalama arasındaki ", " ayraçları ekran okuyucu ve testler için yerinde duruyor. Böylece cümle aynı kaldı ama ekranda ayrı değerler olarak görünüyor.
4. **Küçük yapı değişiklikleri:**
   - Tema başlıkları `h3` yerine `h2` oldu; sayfada `h2` yoktu ve başlık seviyesi atlıyordu.
   - Rapor düğmesi panonun altından en üste taşındı, bu yüzden Tab ile önce düğmeye, sonra alıntılara geliniyor.

Commit atmadım.
