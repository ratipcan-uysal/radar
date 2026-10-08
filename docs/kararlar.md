# Kararlar: 7 Ekim toplantısı

`docs/acik-noktalar.md` içindeki sekiz soru, Deniz, Selin, Ece ve Mert ile tek tek konuşuldu.

| # | Soru | Karar | Kim verdi |
|---|---|---|---|
| K1 | Öncelik nasıl hesaplanır? | Puan = **kaç kayıt** × **mutsuzluk** × **yenilik**. Mutsuzluk = 6 − temanın ortalama puanı. Yenilik = son 14 günün kayıt payı + 1. "Yeni" segmenti formüle girmez. | Deniz |
| K2 | Kanal ağırlığı | Bütün kanallar eşit sayılır. Selin'in itirazı not edildi, ikinci sürümde ayar olarak tekrar konuşulacak. | Deniz (Selin itiraz etti) |
| K3 | Kişisel veri | Dosya tarayıcıdan hiçbir yere gönderilmez, dış servis ya da kütüphane çağrılmaz. Metindeki telefon numaraları panoda ve raporda maskelenir (`0532 *** ** 34`). | Mert, Deniz |
| K4 | Ham dosya | Ece ad ve telefon sütunlarını silip tek CSV verir. Sütunlar sabit: `id,tarih,kanal,metin,puan,segment`. Puan her kanalda 1-5; anket 0-10'dan dönüştürülüyor. | Ece |
| K5 | Hacim | Örnek dosya destek kayıtlarının bir kesiti. Selin'in "günde 14" sayısı destek sisteminin kendi panosundan, Radar'ın bunu tutturması beklenmiyor. | Ece, Selin |
| K6 | Temalar | Temalar sabit bir sözlükten gelir (`data/temalar.json`), sözlüğü PM onaylar. Birden çok temaya giren kayıt her temada sayılır. Hiçbir temaya girmeyen kayıt "diğer" altında görünür. | Deniz |
| K7 | Demo | 16 Ekim Cuma. Demoda pano ve indirilebilen rapor gösterilecek. Rapor ilk 5 temayı ve tema başına en yeni 3 alıntıyı içerir. | Deniz, Mert |
| K8 | İngilizce ve platform | İngilizce yorumlar Türkçelerle aynı temalarda sayılır. Platform ve sürüm bilgisi bu sürümde kapsam dışı. | Selin, Ece |

Ek not (Deniz): "Selin'in beklentisi, yani iptal ücretinin en üstte çıkması, kabul kriteri değildir. Sıralama hangi sonucu veriyorsa onu kabul edeceğiz."
