# Doğrulayıcıyı doğrulamak

`22-claude-verifier.md`'deki iki hüküm yanlış:

| verifier'ın hükmü | Gerçek | Nasıl anlaşıldı |
|---|---|---|
| "Adım 18 bitti" yanlış; MCP işi 21. adım | Adım numaraları git tag'leridir: `adim-18-mcp` var. 21, karşılaştırma dosyasının numarası. | `git tag` |
| `ornek-sonuc.json` adım 9'da yoktu, 13. adımda oluştu | Dosyayı ekleyen commit `544a213`, yani `adim-09-puan`. | `git log -- tests/beklenen/ornek-sonuc.json`, `git tag --contains 544a213` |

Doğru yakaladığı: `tests/mcp.test.js`'teki "uygulamayla aynı sıra" testi yalnız üç sabit sayıyla karşılaştırıyordu. Düzeltildi (`24-claude-duzeltme.md`).

Ders: doğrulayıcının çıktısı da bir iddiadır. Kanıt sütununa bakın; komut çalıştırmış mı, yoksa dosya adından mı çıkarmış?
