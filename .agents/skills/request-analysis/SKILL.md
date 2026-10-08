---
name: request-analysis
description: Toplantı notu, Slack dökümü, ticket ya da veri örneği gibi ham girdiden geliştirmeye başlamadan önce netleşmesi gerekenleri çıkarır - çelişkiler, açık noktalar, veri riskleri ve kime sorulacak sorular, her madde kaynağıyla. "Açık noktalar", "neyi netleştirmeliyiz", "çelişki var mı", "talep analizi", "requirements gaps" isteklerinde kullan. Çözüm, kabul kriteri ya da PRD yazmak için kullanma.
metadata:
  sahibi: Deniz (PM)
  surum: "1.0"
---

# Talep analizi

Ham girdiyi okuyup **karar verilmeden geliştirmeye geçilirse ne ters gider** sorusunu cevaplar. Çıktı bir soru listesidir, çözüm değildir.

## Ne zaman kullanma
- Kararlar zaten alınmışsa ve kabul kriteri isteniyorsa: `acceptance-criteria`.
- Belge yazılacaksa: `prd-writer`.
- Girdi tek cümlelik bir istekse: önce kullanıcıdan kaynak isteyin.

## Girdi
Kullanıcının gösterdiği dosyalar. Gösterilmediyse `docs/notlar/` ve `data/` altına bakın, hangi dosyaları okuduğunuzu ilk satırda yazın. Veri dosyası büyükse kaç satırına baktığınızı söyleyin.

## Adımlar
1. Bütün kaynakları okuyun. Kim ne dedi, hangi dosyada, not edin.
2. Aynı konuda iki kişinin ya da iki kaynağın ayrıştığı yerleri bulun. Farklı kanaldan konuşan iki kişinin farklı gözlemi çelişki değildir; bunu ayrıca belirtin.
3. Karara bağlanmamış ama geliştirmeyi etkileyen konuları bulun: tanımsız terim ("öncelik", "yeni"), eksik kural, belirsiz kapsam.
4. Veride dikkat edilecekleri bulun: kişisel veri, tekrar, biçim, ölçek, temsil gücü. Gördüğünüz satırı GB numarası ya da satır numarasıyla gösterin.
5. Soruları önem sırasıyla, kime sorulacağıyla yazın. En fazla 8.
6. Teslimden önce `references/kontrol-listesi.md`'yi uygulayın.

## Çıktı sözleşmesi
Markdown, dört bölüm, bu sırayla:
1. **Çelişkiler**
2. **Açık noktalar**
3. **Veri riskleri**
4. **Sorulacak sorular** (kime, hangi soru)

Her maddenin sonunda kaynak: `dosya adı: kişi`. Tahmin ettiğiniz her şeyi **varsayım** diye işaretleyin. Kaynakta olmayan karar, sayı ya da tarih yazmayın. Çözüm önermeyin.

Örnek bir çıktının biçimi `references/cikti-ornegi.md`'de.
