import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tarihGecerli } from '../src/tarih.js';
import { ornekSatir } from './yardimci.js';

test('K24: GB-0057 ve GB-0139 gerçek tarihleri geçerlidir', () => {
  for (const id of ['GB-0057', 'GB-0139']) assert.equal(tarihGecerli(ornekSatir(id).split(',')[1]), true);
});

test('K24: yalnız YYYY-AA-GG kabul edilir', () => {
  for (const tarih of ['2026-2-03', '2026-02-3', '03.02.2026', '2026/02/03',
    '2026-10-04T00:00:00Z', ' 2026-10-04', '2026-10-04 ', '', null, 20261004]) {
    assert.equal(tarihGecerli(tarih), false, String(tarih));
  }
});

test('K11: imkânsız takvim tarihleri reddedilir', () => {
  for (const tarih of ['2026-02-30', '2026-02-29', '2026-04-31', '2026-00-01',
    '2026-13-01', '2026-01-00', '2026-01-32', '0000-01-01']) {
    assert.equal(tarihGecerli(tarih), false, tarih);
  }
});

test('K24: artık yılın yüzyıl ve 400 yıl istisnaları doğrulanır', () => {
  for (const tarih of ['2024-02-29', '2000-02-29', '2026-04-30', '2026-12-31']) {
    assert.equal(tarihGecerli(tarih), true, tarih);
  }
  assert.equal(tarihGecerli('1900-02-29'), false);
});
