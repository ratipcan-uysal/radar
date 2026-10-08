Radar'ı yazmaya başlamadan önce bir uygulama planı istiyorum. Henüz hiçbir dosya yazma.

Girdiler: docs/prd.md, docs/kararlar.md (K1-K46, bağlayıcı), docs/kabul-kriterleri.md, data/ornek-geri-bildirim.csv.

Kısıtlar (kararlardan):
- Tarayıcıda çalışan tek sayfa: düz HTML ve ES module JavaScript. Derleme adımı, dış kütüphane, sunucu, ağ isteği yok (K3, K17).
- Testler Node'un yerleşik test aracıyla (`node --test`), `npm test` tek komut (K29).
- Temalar data/temalar.json'dan okunur; sözlüğü sonra bir skill önerecek (K21).

Planda olsun:
1. Dosya yapısı: her dosyanın tek cümlelik görevi.
2. Modüller ve aralarındaki sınır: hangi kod tarayıcıya bağlı, hangisi saf (test edilebilir) fonksiyon.
3. Uygulama sırası, küçük ve her biri çalışır durumda biten adımlar halinde: iskelet → CSV okuma → tema eşleştirme → puan → pano → rapor. Her adımın "bitti" ölçütü ve hangi KK'ları kapattığı.
4. Test stratejisi: hangi KK unit testle, hangisi tarayıcıda elle ya da ajanla doğrulanır.
5. Riskler ve plan sırasında fark ettiğin, kararlarda cevabı olmayan sorular (en fazla 5).

Çıktı: markdown. Yalnızca cevap olarak ver, dosyaya yazma.
