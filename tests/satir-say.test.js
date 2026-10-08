import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { satirSay } from '../src/satir-say.js';

test('başlık hariç satırları sayar', () => {
  assert.equal(satirSay('a,b\n1,2\n3,4\n'), 2);
});

test('yalnız başlık ya da boş metin 0 verir', () => {
  assert.equal(satirSay('a,b\n'), 0);
  assert.equal(satirSay(''), 0);
});

test('CRLF, BOM, sondaki satır sonu yokluğu ve boş satırlar', () => {
  assert.equal(satirSay('﻿a,b\r\n1,2\r\n\r\n3,4'), 2);
});

test('tırnak içindeki satır sonu ayrı satır sayılmaz', () => {
  assert.equal(satirSay('a,b\n"x\ny",2\n3,4\n'), 2);
});

test('örnek dosyada 150 satır vardır', () => {
  const metin = readFileSync(new URL('../data/ornek-geri-bildirim.csv', import.meta.url), 'utf8');
  assert.equal(satirSay(metin), 150);
});
