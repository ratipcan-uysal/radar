# Şifre sıfırlama: kabul kriterleri

Kaynak yalnızca `evals/acceptance-criteria/fixtures/01-uc-karar/input.md` (K1-K3). Kararlarda olmayan sayı ya da metin kriterlere yazılmadı. İlgili durumlar "Kararı eksik" tablosundadır.

## Sıfırlama bağlantısı

### KK-01 · Bağlantı e-postayla gönderilir
**Tür**: Başarı
**Kaynak**: K1
**Ön koşul**: Kullanıcı ekranda e-posta adresini girmiş; son bir saatte o adrese 3'ten az istek gönderilmiş.
**Eylem**: Kullanıcı sıfırlama isteği gönderir.
**Beklenen**: Girilen e-postaya, şifre sıfırlama bağlantısı içeren bir e-posta gönderilir.

### KK-02 · Bağlantı 30 dakika içinde geçerlidir
**Tür**: Başarı
**Kaynak**: K1
**Ön koşul**: Bağlantı t anında gönderilmiş ve daha önce kullanılmamış.
**Eylem**: Kullanıcı bağlantıyı t + 29 dakika 59 saniyede açıp geçerli bir yeni şifre gönderir.
**Beklenen**: Şifre değişir.

### KK-03 · Bağlantı 30 dakikadan sonra geçersizdir
**Tür**: Hata
**Kaynak**: K1
**Ön koşul**: Bağlantı t anında gönderilmiş.
**Eylem**: Kullanıcı bağlantıyı t + 30 dakika 1 saniyede açar.
**Beklenen**: Şifre değişmez; bağlantı kabul edilmez. Gösterilecek metin kararlarda yoktur ("Kararı eksik", D-3).

### KK-04 · Tam 30. dakika (eşik günü)
**Tür**: Sınır
**Kaynak**: K1 ("30 dakika geçerlidir")
**Ön koşul**: Bağlantı t anında gönderilmiş.
**Eylem**: Bağlantı tam t + 30 dakikada kullanılır.
**Beklenen**: Karar dahil/hariç demiyor; kriter yazılamaz, D-1'e bakın.

## İstek sınırı

### KK-05 · Saatte 3 isteğe kadar gönderilir
**Tür**: Başarı / Sınır
**Kaynak**: K2
**Ön koşul**: Aynı e-posta için son bir saatte 0, 1 ve 2 istek yapılmış (üç ayrı durum).
**Eylem**: Aynı e-postayla yeni istek yapılır.
**Beklenen**: Her üç durumda da e-posta gönderilir; 3. istek dahil kabul edilir.

### KK-06 · 4. istek reddedilir
**Tür**: Hata
**Kaynak**: K2
**Ön koşul**: Aynı e-posta için bir saat içinde 3 istek gönderilmiş.
**Eylem**: Aynı e-postayla 4. istek yapılır.
**Beklenen**: E-posta gönderilmez; ekranda tam olarak "Çok fazla deneme, bir saat sonra tekrar deneyin." yazar.

### KK-07 · Sınır yalnızca aynı e-posta için geçerlidir
**Tür**: Sınır
**Kaynak**: K2 ("Aynı e-postaya")
**Ön koşul**: A e-postasına bir saatte 3 istek gönderilmiş.
**Eylem**: B e-postası için istek yapılır.
**Beklenen**: B'ye e-posta gönderilir; A'nın sayacı B'yi etkilemez.

## Yeni şifre

### KK-08 · 10 karakterlik şifre kabul edilir
**Tür**: Başarı / Sınır
**Kaynak**: K3
**Ön koşul**: Geçerli bağlantı açık; kullanıcının son 3 şifresi bilinir.
**Eylem**: Son 3 şifrenin hiçbiri olmayan, tam 10 karakterlik şifre girilir.
**Beklenen**: Şifre değişir.

### KK-09 · 9 karakterlik şifre reddedilir
**Tür**: Hata / Sınır
**Kaynak**: K3
**Ön koşul**: Geçerli bağlantı açık.
**Eylem**: 9 karakterlik şifre girilir.
**Beklenen**: Şifre değişmez. Gösterilecek metin kararlarda yoktur (D-3).

### KK-10 · Son 3 şifreden biri reddedilir
**Tür**: Hata
**Kaynak**: K3
**Ön koşul**: Kullanıcının son 3 şifresi S1, S2, S3.
**Eylem**: Üç ayrı denemede S1, S2, S3 (her biri ≥ 10 karakter) girilir.
**Beklenen**: Her üçünde de şifre değişmez.

### KK-11 · 4. eski şifre yeniden kullanılabilir
**Tür**: Sınır
**Kaynak**: K3 ("son 3 şifreden biri olamaz")
**Ön koşul**: Kullanıcının en az 4 şifre geçmişi var; S4, son 3'ün dışında.
**Eylem**: S4 (≥ 10 karakter) girilir.
**Beklenen**: Şifre değişir.

## Kararı eksik

| # | Gereken karar | Etkilenen durum | Kime sorulmalı |
|---|---|---|---|
| D-1 | Geçerlilik süresi tam 30. dakikada dahil mi? | KK-04 | Ürün sahibi |
| D-2 | Bir saatlik pencere kayan pencere mi, sabit saat dilimi mi? "Bir saat sonra" sayacın ne zaman sıfırlandığını da belirsiz bırakıyor. | KK-05, KK-06 | Ürün sahibi / güvenlik |
| D-3 | Süresi dolmuş bağlantıda, kısa şifrede ve eski şifre tekrarında gösterilecek hata metinleri | KK-03, KK-09, KK-10 | Ürün sahibi / UX |
| D-4 | Kayıtlı olmayan e-postaya istek yapılırsa ne olur? Sayaç tutulur mu, hesap varlığı ifşa edilir mi? | K1, K2 tüm akış | Güvenlik |
| D-5 | Bağlantı tek kullanımlık mı? Yeni istek eskisini geçersiz kılar mı? | KK-02 | Ürün sahibi / güvenlik |
| D-6 | Şifre uzunluğu karakter olarak nasıl sayılır (Türkçe harfler, emoji)? Üst sınır var mı? Yalnız boşluk kabul edilir mi? | KK-08, KK-09 | Ürün sahibi |
| D-7 | Reddedilen 4. istek sayaca yazılır mı (sayaç uzar mı)? | KK-06 | Ürün sahibi |
| D-8 | Şifre geçmişi karşılaştırması büyük/küçük harfe duyarlı mı? Geçmişte 3'ten az şifre varsa? | KK-10, KK-11 | Ürün sahibi |

Ortam başlıkları (tarayıcı, dar ekran, çevrimdışı) kaynakta karar olmadığı için bilerek atlandı.
