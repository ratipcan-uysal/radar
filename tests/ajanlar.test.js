import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';

test('ajanlar: .claude/agents ve .codex/agents tek kaynakla (ajanlar/) aynı', () => {
  // güncel değilse betik 1 ile çıkar ve execFileSync hata fırlatır
  execFileSync('node', ['araclar/ajanlari-uret.mjs', '--kontrol'], { stdio: 'pipe' });
});

test('ajanlar: her Codex ajanında zorunlu üç alan var', () => {
  for (const f of readdirSync('.codex/agents')) {
    const t = readFileSync(`.codex/agents/${f}`, 'utf8');
    for (const alan of ['name = ', 'description = ', 'developer_instructions = """']) assert.ok(t.includes(alan), `${f}: ${alan}`);
  }
});

test('ajanlar: yazma yetkisi yalnız release-manager\'da', () => {
  for (const f of readdirSync('.codex/agents')) {
    const t = readFileSync(`.codex/agents/${f}`, 'utf8');
    const yazar = t.includes('sandbox_mode = "workspace-write"');
    assert.equal(yazar, f === 'release-manager.toml', f);
  }
});
