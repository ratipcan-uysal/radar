# Taranacak sınır durumları

Her girdi alanı ve her ekran için şunlara bakın. Hepsi her projeye uymaz; uymayanı atlayın ama bilerek atlayın.

## Veri
- Boş değer, yalnız boşluk
- Birebir tekrar; aynı kimlik farklı içerik
- Biçim dışı tarih, gelecek tarih, eşik günü (dahil mi?)
- Sayı aralığı dışı, ondalık, metin içinde sayı
- Türkçe karakterli ve karaktersiz yazım, büyük/küçük İ-I
- Başka dil
- Kişisel veri (telefon, e-posta, isim) ve maskelenmemesi gereken benzerleri (fiyat, sürüm numarası)
- Çok büyük dosya, tek satırlık dosya, yalnız başlık

## Davranış
- Eşitlik: aynı puan, aynı tarih; sıralama kuralı
- Hiç sonuç yok; beklenenden az sonuç (5 yerine 3 tema)
- Art arda iki işlem: ikinci dosya ilkini temizler mi?
- Hata sonrası ekran: yarım sonuç kalıyor mu?

## Ortam
- Desteklenen tarayıcılar, dar ekran, çevrimdışı
- Ölçüm koşulu (hangi makine, hangi andan hangi ana)
