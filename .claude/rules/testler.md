---
paths:
  - "tests/**"
---

# Testlerde

- `tests/beklenen/hesapla.mjs` bağımsız hesaplayıcıdır: `src/`'den hiçbir şey import etmez (K51).
- Fixture satırları `tests/yardimci.js` ile örnek CSV'den GB numarasıyla birebir kopyalanır; sentetik satır gerekirse testte açıkça işaretlenir.
- Bir testi geçirmek için beklenen değeri değiştirmeden önce hangi kararın değiştiğini yazın. Karar değişmediyse kodu düzeltin.
