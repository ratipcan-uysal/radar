Tema eşleştirme adımı bitti ve `npm test` 93/93 geçti, atlanan veya başarısız test yok. Commit atmadım.

```
ℹ tests 93
ℹ pass 93
ℹ fail 0
ℹ skipped 0
```

Örnek dosyada beklenen tema dağılımı çıktı:
- **Tema sayıları:** `docs/karsilastirma/11-claude-sozluk.md`'deki kontrol tablosuyla aynı: 35, 29, 21, 10, 2, 12, 14. GB-0150 tekrar olarak atıldığı için Giriş teması 10 görünüyor (K10).
- **Övgü ve diğer:** övgü 27, diğer 0.
- **Çok temalı kayıt:** yalnız GB-0105 üç temada.
- **Kayıt kayıt kontrol:** 148 kaydın her birinin tema kümesi, o dosyadaki tam listelerle birebir uyuşuyor.

**Yeni dosyalar**
- `src/normalize.js`: Türkçe harfleri elle çevirir, `toLocale…` kullanmaz. Metin başındaki boşluğu korur; `" tl"` kuralı bu yüzden çalışıyor.
- `src/sozluk.js`: `sozlukHazirla(json | nesne)` K48 şemasını doğrular ve kelimeleri normalize eder. Bozuk veya şemaya uymayan sözlükte "Tema sözlüğü geçersiz: …" hatası verir.
- `src/tema.js`: `kayitTemalari` ve `temaEsle`. Çok temalı kayıt her temada sayılır (K6). Yalnız övgü olan kayıt "diğer"e düşmez; şikâyet temasına da giriyorsa ikisinde de sayılır (K39).
- `tests/fixtures/test-sozluk.json`: küçük test sözlüğü (T, B, İ, Ö ve övgü).
- `tests/normalize.test.js`, `tests/sozluk.test.js`, `tests/tema.test.js`: test sözlüğüyle birim testleri.
- `tests/sozluk-onayli.test.js`: `data/temalar.json` ile örnek dosya testleri. KK-07, KK-10, KK-39 ve KK-41'i de kapsıyor. `data/temalar.json` yoksa nedenini yazarak atlanır.

**Değiştirilen dosyalar**
- `src/uygulama.js`: açılışta `data/temalar.json` yüklenir. Sözlük eksik veya bozuksa dosya seçilince durum alanında anlaşılır hata çıkar. Panoda ad ve kayıt sayısı `textContent` ile yazılır; "Övgü" ve "Diğer" en altta. Kullanılabilir satır yoksa tema satırı gösterilmez.
- `tests/uygulama.test.js`: kapsamın dışındaydı ama yeni `fetch` ve import'lar mevcut pano testlerini bozacaktı. Test taklidine `fetch`, `sozlukHazirla` ve `temaEsle` eklendi, beklenen pano metinleri tema satırlarıyla güncellendi. Sözlük yükleme hatası için bir test eklendi.

Planın "Önerilen sözlük şeması" bölümünde K48 şeması aynen kullanıldı. K52'de yazan "şüpheli eşleşmeler" listesine dokunmadım, o sürüm 2'ye kalıyor.
