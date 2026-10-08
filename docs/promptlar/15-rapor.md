docs/plan.md §3'teki rapor adımını uygula. Yalnız bu adımı yap.

Kapsam:
- src/rapor.js: Sonuc'tan markdown metni ve dosya adı (K16, K28, K35, K40, K46, K50). İlk 5 tema; her temada puan, temel puan, kayıt sayısı, ortalama puan ve en yeni 3 maskeli alıntı, yanında tarih, kanal ve id. Alıntı `>` blok alıntı, maske yıldızları `\*` kaçışlı (K50). 3'ten az kaydı olan temaya alıntı uydurma; 5'ten az tema varsa olanları yaz.
- uygulama.js: "Raporu indir" düğmesi analiz bitince etkin olur; Blob ile indirir (ağ isteği yok).
- tests/rapor.test.js: tam örnek dosyanın raporu için başlık, kapsam satırı, ilk 5 temanın sırası ve maske kaçışını doğrulayan testler.

Bitince `npm test` son satırlarını ve örnek dosyanın raporunun ilk 25 satırını göster. Yazdığın ve değiştirdiğin dosyaları listele. Commit atma.
