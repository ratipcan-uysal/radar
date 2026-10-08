---
name: feedback-clustering
description: Müşteri geri bildirimi CSV'sinden kullanıcının derdi düzeyinde bir tema sözlüğü önerir (anahtar kelime kuralları, K48 JSON şeması) ve önerinin kayıtları nasıl dağıttığını bir betikle ölçüp kontrol tablosuyla verir - tema başına kayıt, birden çok temaya girenler, hiçbir yere girmeyenler, şüpheli eşleşmeler. "Temalara ayır", "sözlük öner", "kümele", "cluster feedback", "tema sözlüğünü güncelle" isteklerinde kullan. Puan hesaplamak ya da sıralamak için kullanma; o uygulamanın işi.
metadata:
  sahibi: Deniz (PM)
  surum: "1.0"
---

# Geri bildirim kümeleme

İki iş, iki ayrı araç: **anlam** modelin işi (hangi şikâyet aynı dert?), **sayım** betiğin işi (bu kurallar hangi kaydı yakalıyor?). Sayıyı modelin kafasından yazmayın; betik ölçer.

## Ne zaman kullanma
- Öncelik puanı ya da sıralama: uygulamanın hesabıdır (Radar'da `src/puan.js`).
- Tek bir yorumun ne dediği: doğrudan sorun, skill gerekmez.

## Adımlar
1. CSV'yi baştan sona okuyun. Tekrar eden dertleri gruplayın. Tema adı kullanıcının derdini söylesin ("Ödeme hatası"), çözümü ya da ekibi değil.
2. Her tema için kurallar yazın. Kural bir kelime listesidir: listedeki **bütün** kelimeler geçmeli; temanın kurallarından **biri** tutması yeter. Kelimeleri Türkçe karaktersiz ve küçük harfle, kök olarak yazın (`iptal`, `ucret`, `bildirim`). İngilizce karşılıkları ekleyin.
3. Olumlu yorumları ayrı `ovgu` kurallarına koyun. Alaycı kullanılabilecek kelimeleri ("harika") koymayın; nedenini kontrol tablosuna yazın.
4. Öneriyi geçici bir dosyaya yazıp ölçün:
   `node ${CLAUDE_SKILL_DIR}/scripts/kapsama.mjs <oneri.json> <veri.csv>`
   (Codex'te betik yolu: `.agents/skills/feedback-clustering/scripts/kapsama.mjs`.)
5. Ölçüme bakıp kuralları düzeltin: hiçbir yere girmeyen dolu kayıt kalmasın ya da neden kaldığını yazın; yanlış temaya giren kayıt için kural daraltın. 4-5. adımı en fazla üç tur tekrarlayın.
6. Şema ve kural ipuçları `references/sema.md`'de.

## Çıktı sözleşmesi
1. **JSON** (K48): `{ "surum", "temalar": [{ "ad", "kurallar": [[...]] }], "ovgu": { "kurallar": [[...]] } }`.
2. **Kontrol tablosu:** betiğin son çıktısı, olduğu gibi.
3. **Şüpheli eşleşmeler:** GB numarası, şu anki tema, risk.
4. **Bilerek dışarıda bırakılan kelimeler** ve nedeni.

Sözlüğü onaylamak ürün kararıdır: öneri olarak sunun, `data/temalar.json`'a kendiniz yazmayın.
