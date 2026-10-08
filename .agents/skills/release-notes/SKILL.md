---
name: release-notes
description: Git geçmişinden ve tag'lerden kullanıcıya dönük sürüm notu yazar - teknik jargon olmadan, her madde bir commit'e ya da PR'a bağlı, "yeni", "düzeltildi", "değişti" gruplarıyla; iç değişiklikleri (test, refactor, belge) ayrı tutar. "Sürüm notu", "release notes", "changelog", "bu sürümde ne değişti" isteklerinde kullan. Commit mesajı yazmak ya da kod incelemek için kullanma.
metadata:
  sahibi: Deniz (PM)
  surum: "1.0"
---

# Sürüm notu

Okur kullanıcıdır, geliştirici değil. Her madde "bu sizin için ne değiştirdi?" sorusunu cevaplar.

## Ne zaman kullanma
- Commit mesajı ya da PR açıklaması: bu skill değil.
- Kod incelemesi: `/review` ya da `/code-review`.

## Girdi
İki tag ya da tarih aralığı. Verilmezse son tag ile `HEAD` arası.

## Adımlar
1. Değişiklikleri toplayın: `git log --oneline <eski>..<yeni>` ve gerekirse `git show --stat <commit>`.
2. Her commit'i sınıflayın: kullanıcı görür mü? Görmezse (test, refactor, belge, araç) **İç değişiklikler**'e.
3. Kullanıcıya görünenleri grupla: **Yeni**, **Düzeltildi**, **Değişti**. Aynı işi yapan commit'leri tek maddede birleştirin.
4. Her maddeyi kullanıcı dilinde yazın: ne yapabiliyor, ne artık olmuyor. Dosya, fonksiyon, modül adı yok.
5. Maddenin sonuna kısa commit kimliğini parantez içinde ekleyin.
6. `references/ornek.md`'deki biçime bakın.

## Çıktı sözleşmesi
- Başlık: `## <sürüm> · <tarih>`.
- Gruplar: Yeni · Düzeltildi · Değişti · İç değişiklikler (son grup tek satırlık özet olabilir).
- Commit'te olmayan bir şey yazılmaz. Kapsamı belirsiz commit "İç değişiklikler"e gider ve not düşülür.
