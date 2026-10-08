import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { analizEt } from '../src/analiz.js';
import { sozlukHazirla } from '../src/sozluk.js';
import { bicim } from '../src/bicim.js';

const konus = (...istekler) => spawnSync('node', ['araclar/mcp/radar-mcp.mjs'], { input: istekler.map((i) => JSON.stringify(i)).join('\n') + '\n', encoding: 'utf8' })
  .stdout.trim().split('\n').map((s) => JSON.parse(s));

test('MCP: initialize ve tools/list iki aracı tanıtır', () => {
  const [ilk, liste] = konus({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} }, { jsonrpc: '2.0', id: 2, method: 'tools/list' });
  assert.equal(ilk.result.serverInfo.name, 'radar');
  assert.deepEqual(liste.result.tools.map((t) => t.name), ['radar_ozet', 'radar_alinti']);
});

test('MCP (K40): radar_ozet örnek dosyada uygulamayla (src/analiz.js) aynı sırayı ve puanları verir', () => {
  const [c] = konus({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'radar_ozet', arguments: { csv_yolu: 'data/ornek-geri-bildirim.csv', bugun: '2026-10-08' } } });
  const s = JSON.parse(c.result.content[0].text);
  const sozluk = sozlukHazirla(JSON.parse(readFileSync('data/temalar.json', 'utf8')));
  const uygulama = analizEt(readFileSync('data/ornek-geri-bildirim.csv', 'utf8'), sozluk, '2026-10-08');
  const ozetle = (t) => ({ sira: t.sira, ad: t.ad, puan: t.puan, kayit: t.kayit });
  assert.ok(uygulama.temalar.length > 0);
  assert.deepEqual(s.temalar.map(ozetle), uygulama.temalar.map((t) => ozetle({ ...t, puan: bicim(t.puan.pay, t.puan.payda) })));
});

test('MCP: bilinmeyen araç adı JSON-RPC hatası döner, analiz çalışmaz', () => {
  const [c] = konus({ jsonrpc: '2.0', id: 6, method: 'tools/call', params: { name: 'radar_ozet2', arguments: { csv_yolu: 'data/ornek-geri-bildirim.csv' } } });
  assert.equal(c.result, undefined);
  assert.equal(c.error.code, -32602);
  assert.match(c.error.message, /radar_ozet2/);
});

test('MCP: proje dışındaki dosya okunmaz', () => {
  const [c] = konus({ jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'radar_ozet', arguments: { csv_yolu: '../../../etc/hosts' } } });
  assert.equal(c.result.isError, true);
});

test('MCP: alıntılar maskeli döner', () => {
  const [c] = konus({ jsonrpc: '2.0', id: 5, method: 'tools/call', params: { name: 'radar_alinti', arguments: { csv_yolu: 'data/ornek-geri-bildirim.csv', tema: 'Ödeme hatası', bugun: '2026-10-08' } } });
  assert.doesNotMatch(c.result.content[0].text, /555 987/);
});
