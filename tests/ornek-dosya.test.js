import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { analizEt } from '../src/analiz.js';
import { sozlukHazirla } from '../src/sozluk.js';

test('K51: tam örnek dosya bağımsız hesaplanan sayılar, kesirler ve sıralamayla eşleşir', () => {
  const beklenen = JSON.parse(readFileSync(new URL('./beklenen/ornek-sonuc.json', import.meta.url), 'utf8'));
  const csv = readFileSync(new URL('../data/ornek-geri-bildirim.csv', import.meta.url), 'utf8');
  const sozluk = sozlukHazirla(readFileSync(new URL('../data/temalar.json', import.meta.url), 'utf8'));
  assert.deepEqual(analizEt(csv, sozluk, beklenen.bugun), beklenen.sonuc);
});
