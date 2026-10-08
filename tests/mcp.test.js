import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const konus = (...istekler) => spawnSync('node', ['araclar/mcp/radar-mcp.mjs'], { input: istekler.map((i) => JSON.stringify(i)).join('\n') + '\n', encoding: 'utf8' })
  .stdout.trim().split('\n').map((s) => JSON.parse(s));

test('MCP: initialize ve tools/list iki aracı tanıtır', () => {
  const [ilk, liste] = konus({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} }, { jsonrpc: '2.0', id: 2, method: 'tools/list' });
  assert.equal(ilk.result.serverInfo.name, 'radar');
  assert.deepEqual(liste.result.tools.map((t) => t.name), ['radar_ozet', 'radar_alinti']);
});

test('MCP: radar_ozet örnek dosyada uygulamayla aynı sırayı verir', () => {
  const [c] = konus({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'radar_ozet', arguments: { csv_yolu: 'data/ornek-geri-bildirim.csv', bugun: '2026-10-08' } } });
  const s = JSON.parse(c.result.content[0].text);
  assert.deepEqual(s.temalar.slice(0, 3).map((t) => t.puan), ['229,5', '192,0', '113,3']);
});

test('MCP: proje dışındaki dosya okunmaz', () => {
  const [c] = konus({ jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'radar_ozet', arguments: { csv_yolu: '../../../etc/hosts' } } });
  assert.equal(c.result.isError, true);
});

test('MCP: alıntılar maskeli döner', () => {
  const [c] = konus({ jsonrpc: '2.0', id: 5, method: 'tools/call', params: { name: 'radar_alinti', arguments: { csv_yolu: 'data/ornek-geri-bildirim.csv', tema: 'Ödeme hatası', bugun: '2026-10-08' } } });
  assert.doesNotMatch(c.result.content[0].text, /555 987/);
});
