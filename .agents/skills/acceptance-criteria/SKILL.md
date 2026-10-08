---
name: acceptance-criteria
description: Alınmış kararlardan ve notlardan ölçülebilir kabul kriterleri yazar - her kriter kimlikli (KK-01), türü (başarı, hata, sınır), kaynağı (karar ya da dosya), ön koşul, eylem ve beklenen sonuçla; karar gerektiren durumları ayrı "Kararı eksik" listesine koyar. "Kabul kriteri", "bitti tanımı", "test senaryosu", "acceptance criteria", "Given/When/Then" isteklerinde kullan. Kararlar henüz yoksa önce request-analysis; kod testi yazmak için kullanma.
metadata:
  sahibi: Deniz (PM)
  surum: "1.0"
---

# Kabul kriterleri

Geliştiricinin ve test edenin "bitti mi?" sorusunu tartışmasız cevaplamasını sağlar. Kriter yazılamıyorsa sebebi eksik bir karardır; o karar listelenir, kriter uydurulmaz.

## Ne zaman kullanma
- Henüz karar alınmamışsa: önce `request-analysis`.
- Birim testi ya da kod yazılacaksa: kriteri teste çeviren geliştiricidir; bu skill belge üretir.

## Girdi
Karar belgesi (Radar'da `docs/kararlar.md`) ve notlar. Varsa önceki kriter belgesi: numaraları korunur, yeniler sona eklenir.

## Adımlar
1. Kararları ve notları okuyun. Her kararın hangi ekranı ya da davranışı etkilediğini çıkarın.
2. Her davranış için başarı yolunu, sonra hata ve sınır durumlarını yazın. Sınır durumları için `references/sinir-durumlari.md`'deki listeyi tarayın.
3. Her kriteri bir karara ya da nottaki bir cümleye bağlayın. Bağlanamıyorsa kriter yazmayın, "Kararı eksik" listesine koyun.
4. Beklenen sonucu ölçülebilir yazın: sayı, örnek girdi, görünür metin. "Hızlı", "kolay", "doğru" yasak.
5. Veri varsa gerçek satırları kanıt olarak kullanın (GB numarasıyla).
6. Teslimden önce `references/kotu-ornekler.md`'deki tuzaklara bakın.

## Çıktı sözleşmesi
- Kriterler ekranlara ya da davranış gruplarına göre başlıklandırılır.
- Her kriter: `### KK-NN · Başlık`, sonra **Tür**, **Kaynak**, **Ön koşul**, **Eylem**, **Beklenen**.
- Sonda **Kararı eksik** tablosu: gereken karar, etkilenen durum, kime sorulmalı.
- Güncellemede sonda **Değişiklik listesi**: hangi kriter, hangi karar yüzünden, ne değişti.
- Kaynakta olmayan sayı uydurulmaz. Hesap gerekiyorsa ara adımlar gösterilir ya da "betikle hesaplanır" denir.
