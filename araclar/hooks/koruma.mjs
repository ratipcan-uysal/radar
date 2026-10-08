#!/usr/bin/env node
// PreToolUse bekçisi: korunan dosyalara yazmayı durdurur. Claude Code ve Codex aynı betiği kullanır.
// Girdi (stdin, JSON): Claude Edit/Write → tool_input.file_path; Codex apply_patch → tool_input.command (patch metni).
// Çıkış 2 + stderr: işlem engellenir, gerekçe modele gider. Çıkış 0: geç.
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { relative, resolve } from 'node:path';

// Büyük/küçük harf duyarsız: macOS'un dosya sistemi "data/Temalar.json"u aynı dosyaya yazar.
const KORUNAN = [
  [/^data\/temalar\.json$/i, 'onaylı tema sözlüğü (K52); değişiklik ürün kararıdır'],
  [/^tests\/beklenen\/ornek-sonuc\.json$/i, 'onaylı beklenen değerler (K51); gerileme gizlenmez'],
  [/^evals\/.*\/fixtures\//i, 'eval fixture\'ı; ölçüt değişirse insan değiştirir'],
  [/^data\/onaylar\.json$/i, 'onay kaydı; yalnız onaylayan kişi günceller'],
];

const girdi = JSON.parse(readFileSync(0, 'utf8') || '{}');
// Göreli yollar oturumun dizinine göre çözülür; korunan desenler ise proje köküne göredir.
// Kök: CLAUDE_PROJECT_DIR, yoksa git kökü, o da yoksa oturumun dizini.
const cwd = girdi.cwd || process.cwd();
const gitKoku = () => {
  const r = spawnSync('git', ['rev-parse', '--show-toplevel'], { cwd, encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : '';
};
const kok = process.env.CLAUDE_PROJECT_DIR || gitKoku() || cwd;
const ti = girdi.tool_input || {};
const yollar = [];
if (ti.file_path) yollar.push(ti.file_path);
if (typeof ti.command === 'string' && girdi.tool_name === 'apply_patch') {
  for (const m of ti.command.matchAll(/^\*\*\* (?:(?:Add|Update|Delete) File|Move to): (.+)$/gm)) yollar.push(m[1].trim());
}

// Kabuk komutu (Bash): korunan bir yolu anıyor ve yazma izi taşıyorsa engelle.
// Sezgiseldir: her yazma biçimini yakalayamaz. Asıl güvence tests/koruma.test.js'teki özet kontrolüdür.
const KABUK = ['Bash', 'exec_command', 'shell'];
if (KABUK.includes(girdi.tool_name) && typeof ti.command === 'string') {
  const komut = ti.command;
  const yazar = /(>|\btee\b|sed\s+-i|\bmv\b|\bcp\b|\brm\b|write_text|writeFile|open\([^)]*['"][wa]|\.write\()/.test(komut);
  const kural = KORUNAN.find(([desen]) => {
    const kaynak = desen.source.replace(/^\^/, '').replace(/\$$/, '');
    return new RegExp(kaynak, 'i').test(komut);
  });
  if (yazar && kural) {
    process.stderr.write(`Radar koruması: bu komut korunan bir dosyaya yazıyor (${kural[1]}). Kabukla dolanmayın; değişikliği önerin, insan uygulasın.\n`);
    process.exit(2);
  }
}

for (const y of yollar) {
  const goreli = relative(kok.toLowerCase(), resolve(cwd, y).toLowerCase()).split('\\').join('/');
  const kural = KORUNAN.find(([desen]) => desen.test(goreli));
  if (kural) {
    process.stderr.write(`Radar koruması: ${goreli} değiştirilemez (${kural[1]}). Gerekiyorsa değişikliği önerin, insan uygulasın.\n`);
    process.exit(2);
  }
}
process.exit(0);
