#!/usr/bin/env node
// PreToolUse bekçisi: korunan dosyalara yazmayı durdurur. Claude Code ve Codex aynı betiği kullanır.
// Girdi (stdin, JSON): Claude Edit/Write → tool_input.file_path; Codex apply_patch → tool_input.command (patch metni).
// Çıkış 2 + stderr: işlem engellenir, gerekçe modele gider. Çıkış 0: geç.
import { readFileSync } from 'node:fs';
import { relative, isAbsolute, resolve } from 'node:path';

const KORUNAN = [
  [/^data\/temalar\.json$/, 'onaylı tema sözlüğü (K52); değişiklik ürün kararıdır'],
  [/^tests\/beklenen\/ornek-sonuc\.json$/, 'onaylı beklenen değerler (K51); gerileme gizlenmez'],
  [/^evals\/.*\/fixtures\//, 'eval fixture\'ı; ölçüt değişirse insan değiştirir'],
  [/^data\/onaylar\.json$/, 'onay kaydı; yalnız onaylayan kişi günceller'],
];

const girdi = JSON.parse(readFileSync(0, 'utf8') || '{}');
const kok = girdi.cwd || process.cwd();
const ti = girdi.tool_input || {};
const yollar = [];
if (ti.file_path) yollar.push(ti.file_path);
if (typeof ti.command === 'string' && girdi.tool_name === 'apply_patch') {
  for (const m of ti.command.matchAll(/^\*\*\* (?:Add|Update|Delete) File: (.+)$/gm)) yollar.push(m[1].trim());
}

// Kabuk komutu (Bash): korunan bir yolu anıyor ve yazma izi taşıyorsa engelle.
// Sezgiseldir: her yazma biçimini yakalayamaz. Asıl güvence tests/koruma.test.js'teki özet kontrolüdür.
const KABUK = ['Bash', 'exec_command', 'shell'];
if (KABUK.includes(girdi.tool_name) && typeof ti.command === 'string') {
  const komut = ti.command;
  const yazar = /(>|\btee\b|sed\s+-i|\bmv\b|\bcp\b|\brm\b|write_text|writeFile|open\([^)]*['"][wa]|\.write\()/.test(komut);
  const kural = KORUNAN.find(([desen]) => {
    const kaynak = desen.source.replace(/^\^/, '').replace(/\$$/, '');
    return new RegExp(kaynak).test(komut);
  });
  if (yazar && kural) {
    process.stderr.write(`Radar koruması: bu komut korunan bir dosyaya yazıyor (${kural[1]}). Kabukla dolanmayın; değişikliği önerin, insan uygulasın.\n`);
    process.exit(2);
  }
}

for (const y of yollar) {
  const goreli = (isAbsolute(y) ? relative(kok, y) : relative(kok, resolve(kok, y))).split('\\').join('/');
  const kural = KORUNAN.find(([desen]) => desen.test(goreli));
  if (kural) {
    process.stderr.write(`Radar koruması: ${goreli} değiştirilemez (${kural[1]}). Gerekiyorsa değişikliği önerin, insan uygulasın.\n`);
    process.exit(2);
  }
}
process.exit(0);
