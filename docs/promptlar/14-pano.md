docs/plan.md §3'teki pano adımını uygula. Yalnız bu adımı yap; rapor indirme sonraki adım.

Kapsam:
- src/maske.js: telefon (K15, K27) ve e-posta (K42) maskesi. Telefon olmayan sayılar (50 TL, 5.2 sürümü, 3D Secure) maskelenmez.
- src/alinti.js: tema başına en yeni 3 kayıt (tarih azalan, eşitlikte id artan; K14), metin maskeli.
- src/pano.js: Sonuc'u DOM'a çizer. Üstte okunan, atlanan ve nedenler (K11, K23, K44); temalar puana göre sıralı, her birinde puan, temel puan (K40), kayıt sayısı, ortalama puan ve açılıp kapanan 3 alıntı; en altta övgü ve diğer (K13, K39). Yalnız textContent. "kişi" değil "kayıt" (K34). Tarih aralığı, kayıt sayısı ve kanal dağılımı satırı (K35).
- uygulama.js'i pano.js'e bağla.
- Maske ve alıntı için birim testleri; örnek dosyada telefon geçen GB-0084 ve GB-0120'nin panoda maskeli çıktığını gösteren bir test.

Bitince `npm test` son satırlarını göster; yazdığın ve değiştirdiğin dosyaları listele. Commit atma.
