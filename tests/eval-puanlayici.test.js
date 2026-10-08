import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { puanla, hukum } from '../evals/run.mjs';

const beklenen = (yol) => JSON.parse(readFileSync(`evals/${yol}/expected.json`, 'utf8'));

test('eval puanlayıcı: işaretlerin hepsi var, uydurma yok → PASS', () => {
  const cikti = '## Çelişkiler\nGizem haftalık, Okan günlük istiyor. Gizem PDF, Okan Excel diyor.\n## Sorulacak sorular';
  assert.equal(hukum(puanla(cikti, beklenen('request-analysis/fixtures/02-celiski'))), 'PASS');
});

test('eval puanlayıcı: negatif işaret (uydurma tarih) → FAIL', () => {
  const cikti = 'Rakip iddiası veri yok, duydum. Değişiklik puan servisi ekibine gider. Lansman 15 Kasım.';
  const s = puanla(cikti, beklenen('request-analysis/fixtures/03-tuzak'));
  assert.equal(hukum(s), 'FAIL');
  assert.ok(s.find((x) => x.id === 'tarih-uydurma').tuttu);
});

test('eval puanlayıcı: kapsama ile iyi sözlük PASS, kaba sözlük FAIL', () => {
  const f = 'evals/feedback-clustering/fixtures/01-kucuk-csv';
  const iyi = { surum: 'x', temalar: [
    { ad: 'Kapıya bırakma', kurallar: [['kapi'], ['birak'], ['outside']] },
    { ad: 'Geç teslimat', kurallar: [['gec'], ['late'], ['teslimat saati']] },
    { ad: 'Takip', kurallar: [['takip'], ['tracking']] } ],
    ovgu: { kurallar: [['tesekkur'], ['sorunsuz'], ['ozenli'], ['great']] } };
  const kaba = { surum: 'x', temalar: [{ ad: 'Teslimat', kurallar: [['teslimat'], ['paket']] }], ovgu: { kurallar: [] } };
  const p = (s) => hukum(puanla('```json\n' + JSON.stringify(s) + '\n```', beklenen(f.replace('evals/', '')), `${f}/input.csv`));
  assert.equal(p(iyi), 'PASS');
  assert.equal(p(kaba), 'FAIL');
});
