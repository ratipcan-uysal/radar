import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { sozlukHazirla } from '../src/sozluk.js';

const metin = readFileSync(new URL('./fixtures/test-sozluk.json', import.meta.url), 'utf8');
const kopya = () => JSON.parse(metin);
const onayliYol = new URL('../data/temalar.json', import.meta.url);

test('geçerli sözlük hazırlanır; kelimeler normalize edilir, baştaki boşluk korunur', () => {
  const sozluk = sozlukHazirla(metin);
  assert.equal(sozluk.surum, 'test-1');
  assert.deepEqual(sozluk.temalar.map(tema => tema.ad), ['T', 'B', 'İ', 'Ö']);
  assert.deepEqual(sozluk.temalar[0].kurallar[1], ['iptal', ' tl']);
  const buyuk = kopya();
  buyuk.temalar[0].kurallar[0] = ['İPTAL', 'ÜCRET'];
  assert.deepEqual(sozlukHazirla(buyuk).temalar[0].kurallar[0], ['iptal', 'ucret']);
  assert.deepEqual(sozlukHazirla(kopya()), sozluk);
});

test('bozuk JSON açık hata verir', () => {
  for (const bozuk of ['{', '', 'null', '[]', '"x"']) {
    assert.throws(() => sozlukHazirla(bozuk), /Tema sözlüğü geçersiz/);
  }
});

test('şemaya uymayan sözlükler reddedilir', () => {
  const degisiklikler = [
    s => delete s.surum,
    s => (s.temalar = []),
    s => (s.temalar = 'T'),
    s => delete s.ovgu,
    s => delete s.ovgu.kurallar,
    s => (s.ovgu.kurallar = []),
    s => (s.temalar[0].ad = ''),
    s => (s.temalar[1].ad = 'T'),
    s => (s.temalar[0].kurallar = []),
    s => (s.temalar[0].kurallar = ['iptal']),
    s => (s.temalar[0].kurallar = [[]]),
    s => (s.temalar[0].kurallar = [['iptal', '']]),
    s => (s.temalar[0].kurallar = [['iptal', 5]]),
  ];
  for (const degistir of degisiklikler) {
    const sozluk = kopya();
    degistir(sozluk);
    assert.throws(() => sozlukHazirla(sozluk), /Tema sözlüğü geçersiz/, degistir.toString());
  }
});

test('onaylı sözlük (K52) şemaya uyar', { skip: !existsSync(onayliYol) && 'data/temalar.json yok' }, () => {
  const sozluk = sozlukHazirla(readFileSync(onayliYol, 'utf8'));
  assert.equal(sozluk.temalar.length, 7);
});
