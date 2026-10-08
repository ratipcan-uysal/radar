## Sepet sayfası

### KK-01 · İndirim kodu alanı

**Tür:** başarı  
**Kaynak:** `input.md`, K1  
**Ön koşul:** Kullanıcı sepet sayfasındadır.  
**Eylem:** Sepet sayfasını görüntüler.  
**Beklenen:** Sepet sayfasında indirim kodu girilebilen bir alan görünür.

### KK-02 · Geçerli kodun indirim tutarı

**Tür:** başarı  
**Kaynak:** `input.md`, K2  
**Ön koşul:** Kullanıcı sepet sayfasındadır; geçerli bir kod ve bu kodun sağlayacağı indirim tutarı bilinmektedir.  
**Eylem:** Geçerli kodu girer.  
**Beklenen:** Kodun sağladığı indirim tutarı sepette ayrı bir satırda gösterilir.

## Kararı eksik

Kaynak, aşağıdaki hata ve sınır durumları için beklenen davranışı belirlemiyor; bu durumlara kriter yazılmadı.

| Gereken karar | Etkilenen durum | Kime sorulmalı |
|---|---|---|
| Süresi geçmiş kod girildiğinde ne gösterilir ve sepet tutarı nasıl etkilenir? | Süresi geçmiş kod kullanımı; Elif’in notunda açıkça kararsız bırakılmış. | Elif (PM) |
| Bir sepette birden çok kod kullanılabilir mi; ikinci kod girildiğinde ne olur? | Birden çok kod kullanımı; Elif’in notunda açıkça kararsız bırakılmış. | Elif (PM) |
| Kodun geçerliliği ve indirim tutarı hangi kurallarla belirlenir? | KK-02 için geçerli kod ve beklenen tutarın somutlaştırılması. | Elif (PM) |
| Kod yalnız girilerek mi uygulanır, yoksa ayrıca bir işlem gerekir mi? | İndirimin hangi eylemden sonra görünmesi gerektiği. | Elif (PM) |
| Boş, yalnız boşluk içeren veya tanınmayan kod girildiğinde ne olur? | Girdi hataları ve boş değer sınırları. | Elif (PM) |
