import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';

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

test('koruma (K52): alt dizinde çalışan oturum proje köküne göre denetlenir (git kökü)', () => {
  const kok = process.cwd();
  const { CLAUDE_PROJECT_DIR, ...ortam } = process.env;
  const kosAlt = (girdi) => spawnSync('node', [`${kok}/araclar/hooks/koruma.mjs`], { input: JSON.stringify(girdi), encoding: 'utf8', env: ortam });
  assert.equal(kosAlt({ cwd: `${kok}/src`, tool_name: 'Edit', tool_input: { file_path: `${kok}/data/temalar.json` } }).status, 2);
  assert.equal(kosAlt({ cwd: `${kok}/data`, tool_name: 'Write', tool_input: { file_path: 'temalar.json' } }).status, 2);
  assert.equal(kosAlt({ cwd: `${kok}/src`, tool_name: 'Edit', tool_input: { file_path: 'puan.js' } }).status, 0);
});

test('koruma (K51): CLAUDE_PROJECT_DIR verilmişse kök odur, oturumun cwd\'si değil', () => {
  const kok = process.cwd();
  const r = spawnSync('node', [`${kok}/araclar/hooks/koruma.mjs`], {
    input: JSON.stringify({ cwd: tmpdir(), tool_name: 'Edit', tool_input: { file_path: `${kok}/tests/beklenen/ornek-sonuc.json` } }),
    encoding: 'utf8', cwd: tmpdir(), env: { ...process.env, CLAUDE_PROJECT_DIR: kok } });
  assert.equal(r.status, 2);
});

test('koruma (K51, K52): yol büyük/küçük harf duyarsız karşılaştırılır', () => {
  for (const file_path of ['data/Temalar.json', 'tests/beklenen/Ornek-sonuc.json', `${process.cwd()}/DATA/temalar.JSON`]) {
    assert.equal(kos({ cwd: process.cwd(), tool_name: 'Write', tool_input: { file_path } }).status, 2, file_path);
  }
});

test('koruma (K52): apply_patch içindeki "*** Move to:" hedefi denetlenir', () => {
  const patch = '*** Begin Patch\n*** Update File: src/puan.js\n*** Move to: data/temalar.json\n@@\n-a\n+b\n*** End Patch';
  assert.equal(kos({ cwd: process.cwd(), tool_name: 'apply_patch', tool_input: { command: patch } }).status, 2);
});

test('koruma: kabukla korunan dosyaya yazmak engellenir, okumak serbest', () => {
  const yaz = kos({ tool_name: 'Bash', tool_input: { command: "python3 -c \"Path('data/temalar.json').write_text(x)\"" } });
  assert.equal(yaz.status, 2);
  const oku = kos({ tool_name: 'Bash', tool_input: { command: 'cat data/temalar.json' } });
  assert.equal(oku.status, 0);
});
