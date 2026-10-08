import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalize } from '../src/normalize.js';

test('K18/KK-10: İ, I, ı ve i aynı biçime iner', () => {
  for (const metin of ['İptal', 'Iptal', 'ıptal', 'iptal', 'İPTAL', 'IPTAL']) {
    assert.equal(normalize(metin), 'iptal');
  }
});

test('Türkçe harfler aksansız küçük harfe çevrilir', () => {
  assert.equal(normalize('ŞĞÜÖÇİI şğüöçıi'), 'sguoci' + 'i sguoci' + 'i');
  assert.equal(normalize('Ödeme yapamıyorum'), 'odeme yapamiyorum');
});

test('boşluk korunur, art arda boşluk teke iner; ASCII metin değişmez', () => {
  assert.equal(normalize(' 75 TL'), ' 75 tl');
  assert.equal(normalize('a  b\n c'), 'a b c');
  assert.equal(normalize('Cancellation fee'), 'cancellation fee');
});

test('ayrışık (NFC dışı) yazım aynı sonucu verir', () => {
  assert.equal(normalize('İptal'), 'iptal');
  assert.equal(normalize('ş'), 's');
});

test('plan §0: toLocaleLowerCase kullanılmaz', () => {
  assert.doesNotMatch(readFileSync(new URL('../src/normalize.js', import.meta.url), 'utf8'), /toLocale/);
});
