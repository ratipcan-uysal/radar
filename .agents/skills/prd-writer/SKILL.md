---
name: prd-writer
description: Kararlardan, kabul kriterlerinden ve notlardan yönetime ve geliştiriciye aynı anda gidecek PRD yazar ya da günceller - her gereksinim kaynağıyla (karar ya da kriter numarası), uydurma sayı ve hedef olmadan, açık kararlar ayrı bölümde; eleştiri geldiyse her itirazın sonucunu tabloda gösterir. "PRD", "ürün gereksinim belgesi", "spec yaz", "PRD'yi güncelle" isteklerinde kullan. Kararlar alınmadan ya da tek bir kriter için kullanma.
metadata:
  sahibi: Deniz (PM)
  surum: "1.0"
---

# PRD yazımı

Tek belge, iki okur: yönetim "neden ve ne zaman", geliştirici "tam olarak ne" sorusunun cevabını aynı yerde bulur.

## Ne zaman kullanma
- Kararlar alınmadıysa: önce `request-analysis`.
- Yalnız kriter isteniyorsa: `acceptance-criteria`.

## Girdi
Kararlar, kabul kriterleri, notlar. Güncellemede eski PRD ve gelen eleştiriler.

## Adımlar
1. Kaynakları okuyun. Kararlar ile kriterler çelişiyorsa karar esas alınır; çelişkiyi Riskler'e yazın.
2. `references/prd-sablonu.md`'deki bölümleri sırasıyla doldurun.
3. Her gereksinimin yanına kaynağını yazın: K-numarası, KK-numarası ya da dosya.
4. Bilgisi olmayan bölümü uydurmayın: "Bilinmiyor: kime sorulacak" yazın.
5. Açık kalanları sona "Açık kararlar" olarak koyun. Çözüm önermeyin.
6. Eleştiri girdisi varsa sona "Eleştiriye cevap" tablosu ekleyin: itiraz, karar (kapandı / kısmen / kapanmadı), PRD'deki yeri.

## Çıktı sözleşmesi
- Bölümler: Sorun · Kim için · Başarı nasıl ölçülür · Kapsam · Kapsam dışı · Gizlilik · Teslim · Riskler · Açık kararlar · (varsa) Eleştiriye cevap.
- Kapsam bir tablodur: alan, gereksinim, kaynak.
- Uydurma sayı, tarih, kullanıcı sayısı, hedef yok. Kaynağı olan sayının yanında kaynağı yazar.
- Belgenin dışına not yazmayın; belgeyle ilgili uyarılar Riskler'e girer.
