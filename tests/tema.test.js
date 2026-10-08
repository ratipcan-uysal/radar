import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sozlukHazirla } from '../src/sozluk.js';
import { kayitTemalari, temaEsle } from '../src/tema.js';
import { dogrula } from '../src/dogrula.js';
import { fixture } from './yardimci.js';

const sozluk = sozlukHazirla(readFileSync(new URL('./fixtures/test-sozluk.json', import.meta.url), 'utf8'));
const temalar = metin => kayitTemalari(metin, sozluk).temalar;
const kayit = (id, metin) => ({ id, metin });
const ornek = (...idler) => dogrula(fixture(...idler), '2026-10-08').kayitlar;

test('kural içindeki kelimelerin hepsi geçmeli (VE), kurallardan biri yeter (VEYA)', () => {
  assert.deepEqual(temalar('İptal ücreti kesildi'), ['T']);
  assert.deepEqual(temalar('Ücret yüksek'), []);
  assert.deepEqual(temalar('Bildirim gelmedi'), ['B']);
  assert.deepEqual(temalar('cancel fee charged'), ['T']);
});

test('K8: İngilizce ve Türkçe aynı temaya girer', () => {
  assert.deepEqual(temalar('I got no notification'), temalar('Bildirim gelmedi'));
  assert.deepEqual(temalar('payment failed'), ['İ']);
});

test('K18: büyük-küçük harf ve Türkçe harf farkı eşleşmeyi bozmaz', () => {
  for (const metin of ['İptal ücreti', 'Iptal ucreti', 'IPTAL ÜCRETİ', 'iptal ücreti']) {
    assert.deepEqual(temalar(metin), ['T']);
  }
  assert.deepEqual(temalar('ÖDEME SORUNU'), ['İ']);
  assert.deepEqual(temalar('Ödeme sorunu'), ['İ']);
});

test('" tl" kuralı boşluktan sonraki TL ile tutar, "atlas" içindeki "tl" ile tutmaz', () => {
  assert.deepEqual(temalar('İptal edince 75 TL gitti'), ['T']);
  assert.deepEqual(temalar('İptal ettim, atlas'), []);
});

test('K6: çok temalı kayıt her temada sayılır; sözlük sırası korunur', () => {
  assert.deepEqual(temalar('Ödeme yapamadım, iptal ücreti ve bildirim sorunu'), ['T', 'B', 'İ']);
  const sonuc = temaEsle([kayit('a', 'iptal ücreti, bildirim yok')], sozluk);
  assert.deepEqual(sonuc.temalar.map(t => t.kayitlar.length), [1, 1, 0, 0]);
  assert.equal(sonuc.diger.kayitlar.length, 0);
});

test('K6: hiçbirine girmeyen kayıt "diğer" olur', () => {
  const sonuc = temaEsle([kayit('a', 'Rastgele bir cümle'), kayit('b', 'bildirim')], sozluk);
  assert.deepEqual(sonuc.diger.kayitlar.map(k => k.id), ['a']);
  assert.deepEqual(sonuc.temalar[1].kayitlar.map(k => k.id), ['b']);
});

test('K39: yalnız övgü olan kayıt "diğer"e düşmez', () => {
  const sonuc = temaEsle([kayit('a', 'Sorunsuz çalışıyor')], sozluk);
  assert.deepEqual(sonuc.ovgu.kayitlar.map(k => k.id), ['a']);
  assert.equal(sonuc.diger.kayitlar.length, 0);
  assert.ok(sonuc.temalar.every(t => !t.kayitlar.length));
});

test('K39: övgü bir şikâyet temasına da giriyorsa ikisinde de sayılır', () => {
  const sonuc = temaEsle([kayit('a', 'Great app but the notification is late')], sozluk);
  assert.equal(sonuc.ovgu.kayitlar.length, 1);
  assert.equal(sonuc.temalar[1].kayitlar.length, 1);
  assert.equal(sonuc.diger.kayitlar.length, 0);
});

test('KK-07 (test sözlüğüyle): GB-0105 üç temaya girer, "diğer"e girmez', () => {
  const sonuc = temaEsle(ornek('GB-0105'), sozluk);
  assert.deepEqual(sonuc.temalar.filter(t => t.kayitlar.length).map(t => t.ad), ['T', 'B', 'İ']);
  assert.equal(sonuc.diger.kayitlar.length, 0);
});

test('KK-10 (test sözlüğüyle): GB-0013, GB-0100 ve GB-0034 aynı temaya girer', () => {
  const sonuc = temaEsle(ornek('GB-0013', 'GB-0100', 'GB-0034'), sozluk);
  assert.deepEqual(sonuc.temalar[0].kayitlar.map(k => k.id).sort(), ['GB-0013', 'GB-0034', 'GB-0100']);
});

test('temaEsle girdi sırasını korur ve aynı kayıt nesnelerini döndürür', () => {
  const girdi = [kayit('b', 'bildirim'), kayit('a', 'bildirim')];
  const donen = temaEsle(girdi, sozluk).temalar[1].kayitlar;
  assert.deepEqual(donen.map(k => k.id), ['b', 'a']);
  assert.equal(donen[0], girdi[0]);
});
