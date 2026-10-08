import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

// Hangi araçla, hangi yoldan değiştirilmiş olursa olsun: onaylı dosya onay kaydıyla aynı değilse test düşer.
const kayit = JSON.parse(readFileSync('data/onaylar.json', 'utf8'));
for (const [dosya, onay] of Object.entries(kayit.dosyalar)) {
  test(`koruma: ${dosya} onaylı hâliyle aynı (${onay.karar})`, () => {
    const ozet = createHash('sha256').update(readFileSync(dosya)).digest('hex');
    assert.equal(ozet, onay.sha256, `${dosya} onaysız değişmiş. Değişiklik gerekiyorsa ${onay.onaylayan} onaylar ve data/onaylar.json'u günceller.`);
  });
}
