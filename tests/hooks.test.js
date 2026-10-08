import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const kos = (girdi) => spawnSync('node', ['araclar/hooks/koruma.mjs'], { input: JSON.stringify(girdi), encoding: 'utf8' });

test('koruma: Claude Edit ile onaylı sözlük engellenir (K52)', () => {
  const r = kos({ cwd: process.cwd(), tool_name: 'Edit', tool_input: { file_path: `${process.cwd()}/data/temalar.json` } });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /temalar\.json değiştirilemez/);
});

test('koruma: Codex apply_patch ile beklenen değerler engellenir (K51)', () => {
  const patch = '*** Begin Patch\n*** Update File: tests/beklenen/ornek-sonuc.json\n@@\n-a\n+b\n*** End Patch';
  const r = kos({ cwd: process.cwd(), tool_name: 'apply_patch', tool_input: { command: patch } });
  assert.equal(r.status, 2);
});

test('koruma: eval fixture\'ı engellenir', () => {
  const r = kos({ cwd: process.cwd(), tool_name: 'Write', tool_input: { file_path: 'evals/request-analysis/fixtures/01/input.md' } });
  assert.equal(r.status, 2);
});

test('koruma: sıradan kaynak dosya geçer', () => {
  const r = kos({ cwd: process.cwd(), tool_name: 'Edit', tool_input: { file_path: 'src/puan.js' } });
  assert.equal(r.status, 0);
});

test('koruma: kabukla korunan dosyaya yazmak engellenir, okumak serbest', () => {
  const yaz = kos({ tool_name: 'Bash', tool_input: { command: "python3 -c \"Path('data/temalar.json').write_text(x)\"" } });
  assert.equal(yaz.status, 2);
  const oku = kos({ tool_name: 'Bash', tool_input: { command: 'cat data/temalar.json' } });
  assert.equal(oku.status, 0);
});
