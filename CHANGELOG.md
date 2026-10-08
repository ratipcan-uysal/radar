# Değişiklik günlüğü

## 0.1.0 · 2026-10-08

İlk sürüm. Kapsam: `adim-01-notlar` .. `6a2c8a1`.

### Yeni
- Geri bildirim CSV'sini tarayıcıda açıp okuyabilirsiniz; okunamayan satırlar atlanır ve kaç kaydın okunduğu, kaçının atlandığı görünür. Dosya tarayıcıdan çıkmaz. (7e450c0, 0dea24c)
- Geri bildirimler sözlükle temalara ayrılıyor (yedi tema ve övgü); kaç kaydın bir temaya girdiği kapsam satırında görünür. (b2a05df)
- Her temaya öncelik puanı veriliyor ve temalar puana göre sıralanıyor. Örnek dosyada ilk üç puan 229,5 / 192,0 / 113,3. (544a213)
- Pano temaları puanlarıyla ve her temadan alıntılarla gösteriyor. (12e625f)
- Telefon numaraları ve e-postalar panoda maskeli görünüyor; "50 TL" gibi tutarlar korunuyor. Telefondan hemen sonra gelen bir sayı artık numaranın maskesini bozmuyor. (12e625f, becdcf7)
- Analizden sonra raporu markdown dosyası olarak indirebilirsiniz; rapordaki maske yıldızları markdown'da bozulmaz. Düğmenin yanında kişisel bilgi uyarısı var. (b80425e)
- Pano kartlar ve puan çubuğuyla gösteriliyor; açık ve koyu temada, dar ekranda ve klavyeyle kullanılabiliyor. (9dc744b)

### Düzeltildi
- Bu sürümün kendi içinde düzeltilen hata: maske düzeltmesi yukarıda "Yeni" altında (becdcf7). Önceki yayımlanmış sürüm olmadığı için ayrı düzeltme maddesi yok.

### Değişti
- Yok (ilk sürüm).

### İç değişiklikler
- Proje talimatları (AGENTS.md, CLAUDE.md), beş skill, beş ajan, koruma kancası, eval düzeneği, MCP sunucusu, haftalık özet otomasyonu, bağımsız beklenen değer betiği, kararlar ve kabul kriterleri belgeleri; 151 test geçiyor. Bu kalemler uygulamayı kullananı etkilemez; MCP sunucusu ve ajan analizi yalnız örnek ya da anonimleştirilmiş veriyle kullanılmalı (K53).
- Not: `becdcf7` karma kapsamlı (maske düzeltmesi + kanca, eval, MCP); yalnız maske kısmı kullanıcıya yansıtıldı.
