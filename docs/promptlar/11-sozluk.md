data/ornek-geri-bildirim.csv'deki geri bildirimler için bir tema sözlüğü öner. Kararlar: K21, K30, K32, K37, K39 ve şema K48 (docs/kararlar.md).

Kurallar:
- Temalar kullanıcının derdi düzeyinde olsun (K32). "İptal ücreti ve politikası" adını kullan (K37).
- Kelimeleri Türkçe karaktersiz ve küçük harfli yaz (eşleştirme metni böyle normalize ediyor: ı→i, ş→s, ğ→g, ü→u, ö→o, ç→c). Kelime kökü yaz: "iptal" "iptali", "iptal ettim" hepsini yakalasın.
- İngilizce yorumlar da aynı temaya girmeli (K8): İngilizce kelimeleri de ekle.
- Övgü ayrı (K39).
- Bir kural içindeki kelimelerin hepsi geçmeli (VE); kurallardan biri tutması yeter (VEYA).

Çıktı iki parça:
1. JSON: K48 şemasında, `surum` alanına bugünün tarihi.
2. Kontrol tablosu: her tema için kaç kayıt yakaladığı, 3 örnek GB numarası, ve şüpheli eşleşmeler (yanlış tema riski olan kayıtlar, GB numarasıyla). Hiçbir temaya girmeyen kayıtları da listele.

CSV'yi baştan sona oku; tahmin yürütme. Yalnızca cevap olarak ver, dosyaya yazma.
