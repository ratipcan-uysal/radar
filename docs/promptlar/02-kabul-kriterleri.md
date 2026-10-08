Bağlam: Radar'ın kapsamı netleşti. docs/kararlar.md ekibin kararlarını, docs/notlar/ ilk toplantıyı, data/ornek-geri-bildirim.csv örnek veriyi içeriyor.

Görev: Geliştirici ve test eden kişinin "bitti mi?" sorusunu tartışmasız cevaplayabileceği kabul kriterlerini yaz.

Kısıtlar:
- Her kriter bir karara (K1-K8) ya da nottaki bir cümleye bağlansın. Bağlanamıyorsa yazma, "Kararı eksik" listesine koy.
- Her kriter ölçülebilir olsun: "hızlı", "kolay", "doğru" gibi kelimeler yerine sayı, örnek girdi ya da görünür sonuç yaz.
- Başarı yolunun yanında hata ve sınır durumlarını da yaz: boş metin, tekrar eden kayıt, Türkçe karaktersiz yazım, İngilizce yorum, metinde telefon, bozuk CSV.
- Örnek CSV'den gerçek satırları kanıt olarak kullan (GB numarasıyla).

Çıktı biçimi (markdown):
- Her kriter: `KK-01` gibi kimlik, başlık, tür (başarı / hata / sınır), kaynak (K# ya da dosya), **Ön koşul**, **Eylem**, **Beklenen**
- Kriterleri ekranlara göre grupla: dosya yükleme, tema eşleştirme, puanlama, pano, rapor, gizlilik
- Sonda "Kararı eksik" listesi: kriter yazmak için hangi karar gerekiyor, kime sorulmalı
