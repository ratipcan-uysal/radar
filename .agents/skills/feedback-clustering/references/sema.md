# Sözlük şeması ve kural ipuçları

```json
{
  "surum": "2026-10-13",
  "temalar": [
    { "ad": "İptal ücreti ve politikası", "kurallar": [["iptal", "ucret"], ["iptal", "politika"], ["cancellation fee"]] }
  ],
  "ovgu": { "kurallar": [["sorunsuz"], ["oneririm"], ["great"]] }
}
```

## Eşleşme nasıl yapılır
- Metin normalize edilir: `ı İ I → i`, `ş → s`, `ğ → g`, `ü → u`, `ö → o`, `ç → c`, sonra küçük harf.
- Kural içindeki her kelime metinde **alt dizi** olarak aranır. `iptal` hem "iptal" hem "iptali" hem "iptal ettim"i yakalar.
- Alt dizi aramasının bedeli: `sure` "sürekli"yi de yakalar. Kısa kökleri başka bir kelimeyle birlikte kullanın (`["iptal", "sure"]`).
- Baştaki boşluk korunur: `" tl"` kelime başındaki "tl"yi arar, "atla"yı yakalamaz.

## İyi tema adı
| Kötü | Neden | İyi |
|---|---|---|
| "Bildirim modülü" | Ekip dili | "Geç ya da hiç gelmeyen bildirim" |
| "Ödeme ve iptal sorunları" | İki dert tek tema | İki ayrı tema |
| "Kart reddi", "3D Secure", "Taksit" | Fazla ince (K32) | "Ödeme hatası" |
