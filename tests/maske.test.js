import { test } from 'node:test';
import assert from 'node:assert/strict';
import { maskele } from '../src/maske.js';

test('K15, K27: telefon biçimlerinde son iki hane dışı * olur, ayraçlar yerinde kalır', () => {
  const beklenen = {
    '0532 555 12 34': '**** *** ** 34',
    '05325551234': '*********34',
    '0532-555-12-34': '****-***-**-34',
    '(0532) 555 12 34': '(****) *** ** 34',
    '532 555 12 34': '*** *** ** 34',
    '+90 555 987 65 43': '+** *** *** ** 43',
  };
  for (const [girdi, cikti] of Object.entries(beklenen)) {
    assert.equal(maskele(`numaram ${girdi} lütfen`), `numaram ${cikti} lütfen`, girdi);
  }
});

test('telefon olmayan sayılar değişmeden kalır', () => {
  for (const metin of ['50 TL ödedim', '5.2 sürümü', '3D Secure ekranı', '2026-10-08 tarihinde',
    '1234567890 sipariş', '123456789012 kod', '0532 555 12 numara değil']) {
    assert.equal(maskele(metin), metin);
  }
});

test('telefonun yanındaki sayı telefonla birleşmez; iki numara ayrı maskelenir', () => {
  assert.equal(maskele('50 0532 555 12 34'), '50 **** *** ** 34');
  assert.equal(maskele('0532 555 12 34 ve 0533 111 22 33'), '**** *** ** 34 ve **** *** ** 33');
});

test('K42: e-posta a***@*** olur, sondaki noktalama kalır', () => {
  assert.equal(maskele('Yazın: ali.veli@ornek.com.tr.'), 'Yazın: a***@***.');
  assert.equal(maskele('Ece@Ornek.com ve 5321234567@x.com'), 'E***@*** ve 5***@***');
});
