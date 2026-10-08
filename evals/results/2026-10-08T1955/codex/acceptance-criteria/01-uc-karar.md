Kaynak: Yalnızca `evals/acceptance-criteria/fixtures/01-uc-karar/input.md` içindeki K1–K3 kararları.

## Bağlantının gönderilmesi ve geçerliliği

### KK-01 · Sıfırlama bağlantısının e-postayla gönderilmesi

**Tür:** Başarı  
**Kaynak:** K1  
**Ön koşul:** İstek, K2’deki gönderim sınırını aşmamıştır.  
**Eylem:** Kullanıcı şifre sıfırlama isteği gönderir.  
**Beklenen:** Şifre sıfırlama bağlantısı, istekte kullanılan e-posta adresine e-postayla gönderilir.

### KK-02 · Süresi dolmamış bağlantının kullanılması

**Tür:** Başarı  
**Kaynak:** K1  
**Ön koşul:** Bağlantının geçerlilik süresinin başlamasından itibaren 30 dakikadan az zaman geçmiştir.  
**Eylem:** Kullanıcı bağlantıyı açar.  
**Beklenen:** Bağlantı, süre bakımından geçerli kabul edilir.

### KK-03 · Süresi geçmiş bağlantının kullanılması

**Tür:** Hata  
**Kaynak:** K1  
**Ön koşul:** Bağlantının geçerlilik süresinin başlamasından itibaren 30 dakikadan fazla zaman geçmiştir.  
**Eylem:** Kullanıcı bağlantıyı açar.  
**Beklenen:** Bağlantı üzerinden şifre sıfırlama yapılamaz.

## Sıfırlama isteği sınırı

### KK-04 · Üçüncü isteğin gönderilmesi

**Tür:** Sınır  
**Kaynak:** K2  
**Ön koşul:** Aynı e-posta adresine uygulanan bir saatlik dönem içinde iki sıfırlama isteği gönderilmiştir.  
**Eylem:** Aynı e-posta adresi için üçüncü istek yapılır.  
**Beklenen:** Üçüncü sıfırlama isteği gönderilir; K2’deki sınır nedeniyle engellenmez.

### KK-05 · Üç isteği aşan gönderimin engellenmesi

**Tür:** Hata  
**Kaynak:** K2  
**Ön koşul:** Aynı e-posta adresine uygulanan bir saatlik dönem içinde üç sıfırlama isteği gönderilmiştir.  
**Eylem:** Aynı dönem içinde aynı e-posta adresi için bir istek daha yapılır.  
**Beklenen:** Yeni sıfırlama isteği gönderilmez. Ekranda tam olarak “Çok fazla deneme, bir saat sonra tekrar deneyin.” yazar.

## Yeni şifrenin kabulü

### KK-06 · En az uzunluktaki şifrenin kabul edilmesi

**Tür:** Sınır  
**Kaynak:** K3  
**Ön koşul:** Kullanıcı geçerli bir bağlantıyla şifre sıfırlamaktadır.  
**Eylem:** Son üç şifresinden farklı, tam 10 karakterlik yeni şifre gönderir.  
**Beklenen:** Şifre, K3’teki uzunluk ve geçmiş şifre koşullarını sağlar; yeni şifre olarak kabul edilir.

### KK-07 · En az uzunluğu aşan şifrenin kabul edilmesi

**Tür:** Başarı  
**Kaynak:** K3  
**Ön koşul:** Kullanıcı geçerli bir bağlantıyla şifre sıfırlamaktadır.  
**Eylem:** Son üç şifresinden farklı, 10 karakterden uzun yeni şifre gönderir.  
**Beklenen:** Şifre, K3’teki uzunluk ve geçmiş şifre koşullarını sağlar; yeni şifre olarak kabul edilir.

### KK-08 · En az uzunluğun altındaki şifrenin reddedilmesi

**Tür:** Sınır  
**Kaynak:** K3  
**Ön koşul:** Kullanıcı geçerli bir bağlantıyla şifre sıfırlamaktadır.  
**Eylem:** Son üç şifresinden farklı, 9 karakterlik yeni şifre gönderir.  
**Beklenen:** Yeni şifre kabul edilmez; mevcut şifre değiştirilmez.

### KK-09 · Son üç şifrenin tekrar kullanımının reddedilmesi

**Tür:** Hata  
**Kaynak:** K3  
**Ön koşul:** Kullanıcının son üç şifresi bilinmektedir ve kullanıcı geçerli bir bağlantıyla şifre sıfırlamaktadır.  
**Eylem:** En az 10 karakterlik bir şifreyle, son üç şifrenin her biri için ayrı ayrı sıfırlama denenir.  
**Beklenen:** Üç denemenin her birinde yeni şifre reddedilir; mevcut şifre değiştirilmez.

## Kararı eksik

Karar sahipleri girdide belirtilmemiştir.

| Gereken karar | Etkilenen durum | Kime sorulmalı |
|---|---|---|
| 30 dakikalık süre hangi olayla başlar ve tam 30. dakikada bağlantı geçerli midir? | K1 süre ölçümü ve eşik anı | K1 karar sahibi |
| Süresi geçmiş bağlantıda hangi metin ve yeniden deneme yolu gösterilir? | KK-03 sonrası kullanıcı akışı | K1 karar sahibi |
| Bir saatlik sınır kayan pencere mi, sabit dönem mi kullanır; tam bir saat sınırında ne olur? | KK-04, KK-05 ve yeniden istek gönderme | K2 karar sahibi |
| Başarısız gönderimler ve engellenen denemeler kotaya sayılır mı? | İstek sayacı ve bekleme süresi | K2 karar sahibi |
| Aynı e-posta adresi belirlenirken büyük/küçük harf ve boşluklar nasıl ele alınır? | K2 sınırının adresler arasında uygulanması | K2 karar sahibi |
| “Karakter” nasıl sayılır; boşluklar ve çok birimli Unicode karakterleri nasıl değerlendirilir? | K3 uzunluk sınırı | K3 karar sahibi |
| Son üç şifre mevcut şifreyi içerir mi; üçten az geçmiş şifre varsa hangi şifreler denetlenir? | KK-09 geçmiş şifre kapsamı | K3 karar sahibi |
| Reddedilen yeni şifre için hangi hata metni gösterilir? | KK-08 ve KK-09 sonrası ekran | K3 karar sahibi |
| Boş, biçimi geçersiz veya kayıtlı olmayan e-posta adresinde ne olur? | Sıfırlama isteğinin başlatılması | K1/K2 karar sahipleri |
| Yeni bağlantı önceki bağlantıyı geçersiz kılar mı; kullanılan bağlantı tekrar kullanılabilir mi? | Art arda istekler ve bağlantının tekrar kullanılması | K1 karar sahibi |
