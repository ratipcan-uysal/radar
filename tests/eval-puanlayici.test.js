import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { puanla, hukum } from '../evals/run.mjs';
import * as kosucu from '../evals/run.mjs';

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

const kapsamaFixture = 'evals/feedback-clustering/fixtures/01-kucuk-csv';
const kapsamaPuani = (blok, csv = `${kapsamaFixture}/input.csv`) =>
  puanla('```json\n' + blok + '\n```', beklenen('feedback-clustering/fixtures/01-kucuk-csv'), csv);

test('eval puanlayıcı (K48): JSON sözlük şemaya uymuyorsa koşu çökmez, fixture FAIL olur', () => {
  for (const blok of ['{}', '{"temalar":"hepsi"}', '{"temalar":[{"ad":"x","kurallar":["kapi"]}]}']) {
    let s;
    assert.doesNotThrow(() => { s = kapsamaPuani(blok); }, blok);
    assert.equal(hukum(s), 'FAIL', blok);
  }
});

test('eval puanlayıcı (K48): kapsama betiği başarısız olursa koşu çökmez, fixture FAIL olur', () => {
  const sozluk = JSON.stringify({ surum: 'x', temalar: [{ ad: 'Takip', kurallar: [['takip']] }], ovgu: { kurallar: [] } });
  let s;
  assert.doesNotThrow(() => { s = kapsamaPuani(sozluk, `${kapsamaFixture}/olmayan.csv`); });
  assert.equal(hukum(s), 'FAIL');
});

test('eval puanlayıcı (K48): üç dert tek temada toplanırsa FAIL (gruplar ayrı temalarda olmalı)', () => {
  const tekTema = { surum: 'x', temalar: [
    { ad: 'Bütün şikâyetler', kurallar: [['kapi'], ['birak'], ['outside'], ['gec'], ['late'], ['teslimat saati'], ['takip'], ['tracking']] } ],
    ovgu: { kurallar: [['tesekkur'], ['sorunsuz'], ['ozenli'], ['great']] } };
  assert.equal(hukum(kapsamaPuani(JSON.stringify(tekTema))), 'FAIL');
});

test('eval koşucu: araç süreci sıfır dışı kodla çıktıysa işaretler tutsa da FAIL', () => {
  const cikti = '## Çelişkiler\nGizem haftalık, Okan günlük istiyor. Gizem PDF, Okan Excel diyor.\n## Sorulacak sorular';
  const f = { beklenen: beklenen('request-analysis/fixtures/02-celiski') };
  assert.equal(hukum(kosucu.kosuPuanla({ cikti, kod: 0 }, f)), 'PASS');
  assert.equal(hukum(kosucu.kosuPuanla({ cikti, kod: 1 }, f)), 'FAIL');
  assert.equal(hukum(kosucu.kosuPuanla({ cikti, kod: null }, f)), 'FAIL');
});

test('eval koşucu: araç bulunamazsa (ENOENT) koşu çökmez, sıfır dışı sonuç döner', async () => {
  const onceki = process.env.RADAR_CLAUDE;
  process.env.RADAR_CLAUDE = join(tmpdir(), 'radar-olmayan-arac');
  try {
    const r = await kosucu.kos('claude', 'deneme');
    assert.notEqual(r.kod, 0);
  } finally {
    if (onceki === undefined) delete process.env.RADAR_CLAUDE; else process.env.RADAR_CLAUDE = onceki;
  }
});

test('eval gate (gate.json): eksik araç × fixture koşumu kalmış sayılır', () => {
  const klasor = mkdtempSync(join(tmpdir(), 'radar-eval-'));
  try {
    const yol = join(klasor, 'claude', 'request-analysis', '02-celiski.md');
    mkdirSync(dirname(yol), { recursive: true });
    writeFileSync(yol, '## Çelişkiler\nGizem haftalık, Okan günlük istiyor. Gizem PDF, Okan Excel diyor.\n');
    const r = spawnSync('node', ['evals/run.mjs', '--puanla', klasor], { encoding: 'utf8' });
    assert.equal(r.status, 1, r.stdout);
    assert.match(r.stdout, /\*\*KALDI\*\*/);
    assert.match(r.stdout, /codex\/request-analysis\/02-celiski/);
  } finally {
    rmSync(klasor, { recursive: true, force: true });
  }
});
