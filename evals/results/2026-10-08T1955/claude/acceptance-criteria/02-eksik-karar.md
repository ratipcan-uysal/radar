# Kabul kriterleri: sepette indirim kodu

Kaynak: yalnızca `evals/acceptance-criteria/fixtures/02-eksik-karar/input.md` (K1, K2 ve Elif'in notları). Girdide gerçek veri satırı olmadığı için GB numarası kullanılmadı. `references/sinir-durumlari.md` bu oturumda bulunamadı, o yüzden sınır durumlarını girdiden çıkardım.

## Sepet sayfası: indirim kodu alanı

### KK-01 · İndirim kodu alanı sepet sayfasında görünür
**Tür**: Başarı
**Kaynak**: K1
**Ön koşul**: Kullanıcı en az bir ürünü olan sepet sayfasını açmıştır.
**Eylem**: Sepet sayfası yüklenir.
**Beklenen**: Sayfada indirim kodu girilebilen bir metin alanı görünür.

## Sepet sayfası: geçerli kod

### KK-02 · Geçerli kod girilince indirim tutarı ayrı satırda gösterilir
**Tür**: Başarı
**Kaynak**: K2
**Ön koşul**: Sepette en az bir ürün vardır. Sistemde geçerli bir indirim kodu tanımlıdır (kod ve tutar test verisinde belirtilir).
**Eylem**: Kullanıcı geçerli kodu alana girip uygular.
**Beklenen**: Sepet özetinde, ürün satırlarından ayrı bir satır görünür. Bu satır indirim tutarını gösterir. Satırdaki tutar, o kod için tanımlı indirime eşittir. Tutarın hesaplama kuralı (yüzde ya da sabit) kararlarda yoktur, bkz. "Kararı eksik" tablosu, madde 3.

## Kararı eksik

Aşağıdaki durumlar için kriter yazılmadı, çünkü beklenen sonuç kaynakta yok.

| # | Gereken karar | Etkilenen durum | Kime sorulmalı |
|---|---|---|---|
| 1 | Süresi geçmiş kod girilirse ne olur? Hata mesajı gösterilecek mi, gösterilecekse metni ne olacak? Alan temizlenecek mi? Sepet tutarı değişecek mi? | Süresi geçmiş kodla uygulama denemesi | Elif (PM). Kaynak: notlardaki "Süresi geçmiş kod girilirse ne olacağını henüz konuşmadık." |
| 2 | Bir sepette birden çok kod kullanılabilir mi? Kullanılamıyorsa ikinci kod girilince ne olur: ilk kod mu kalır, yenisi mi geçerli olur, hata mı gösterilir? Kullanılabiliyorsa indirimler toplanır mı, ayrı satırlarda mı gösterilir? | İkinci bir kod girişi, K2'deki "ayrı satır" kuralının birden çok kod için nasıl işleyeceği | Elif (PM). Kaynak: notlardaki "birden çok kod kullanılıp kullanılamayacağına da karar vermedik." |
| 3 | İndirim tutarı nasıl hesaplanır (yüzde mi, sabit tutar mı)? Sepet toplamından büyük indirim olursa ne olur? | KK-02'deki tutarın ölçülmesi. Sepet toplamının altına inen indirim. | PM. K2 yalnızca tutarın gösterileceğini söylüyor, hesabı söylemiyor. |
| 4 | Var olmayan ya da boş kod girilirse ne olur? Hata metni nedir? | Geçersiz kod ve boş alan gönderimi | PM. Girdide bu durum hiç geçmiyor. Yalnız "geçerli" kod tanımlı. |
| 5 | Kod uygulandıktan sonra sepetten ürün çıkarılırsa ya da kod kaldırılırsa indirim satırı ne olur? | Kod uygulandıktan sonra sepetin değişmesi | PM. Girdide bu durum hiç geçmiyor. |

Bu beş maddenin kararı gelene kadar ilgili durumlar için test yazılmaz. Geliştirici bu davranışları kendi tahminiyle doldurmamalı.
