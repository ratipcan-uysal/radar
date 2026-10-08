import { test } from 'node:test';
import assert from 'node:assert/strict';
import { alintilariSec } from '../src/alinti.js';

const kayit = (id, tarih, metin = 'metin') => ({ id, tarih, kanal: 'destek', metin, puan: 2, segment: 'yeni' });

test('K14: tarih azalan, eşitlikte id artan; en fazla 3 alıntı', () => {
  const alintilar = alintilariSec([
    kayit('GB-0003', '2026-09-01'), kayit('GB-0009', '2026-10-01'), kayit('GB-0002', '2026-10-01'),
    kayit('GB-0001', '2026-08-01'), kayit('GB-0005', '2026-10-01'),
  ]);
  assert.deepEqual(alintilar.map(a => a.id), ['GB-0002', 'GB-0005', 'GB-0009']);
});

test('az kayıtta hepsi gelir; girdi dizisi değişmez; yalnız id, tarih, kanal, metin döner', () => {
  const girdi = [kayit('GB-0002', '2026-09-01'), kayit('GB-0001', '2026-10-01')];
  const alintilar = alintilariSec(girdi);
  assert.deepEqual(girdi.map(k => k.id), ['GB-0002', 'GB-0001']);
  assert.deepEqual(Object.keys(alintilar[0]), ['id', 'tarih', 'kanal', 'metin']);
  assert.equal(alintilar.length, 2);
});

test('alıntı metni maskelidir', () => {
  const [alinti] = alintilariSec([kayit('GB-0001', '2026-10-01', 'Arayın 0532 555 12 34 ya da a@b.com')]);
  assert.equal(alinti.metin, 'Arayın **** *** ** 34 ya da a***@***');
});
