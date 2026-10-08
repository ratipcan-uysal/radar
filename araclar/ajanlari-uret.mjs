#!/usr/bin/env node
// ajanlar/*.md tek kaynaktan iki aracın ajan dosyalarını üretir:
//   .claude/agents/<ad>.md   (Claude Code: YAML frontmatter + talimat)
//   .codex/agents/<ad>.toml  (Codex: name, description, developer_instructions + ayarlar)
// Kullanım: node araclar/ajanlari-uret.mjs          dosyaları yazar
//           node araclar/ajanlari-uret.mjs --kontrol yazmaz; üretilenler güncel değilse 1 ile çıkar
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const kontrol = process.argv.includes('--kontrol');

// Kaynaktaki frontmatter yalnız iki düzeyli: üst anahtarlar ve claude:/codex: altında girintili anahtarlar.
export function oku(metin) {
  const m = metin.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error('frontmatter yok');
  const ust = {}; let grup = null;
  for (const satir of m[1].split('\n')) {
    const g = satir.match(/^  (\w+): (.*)$/);
    const u = satir.match(/^(\w+):(?: (.*))?$/);
    if (g && grup) ust[grup][g[1]] = g[2];
    else if (u && u[2] === undefined) { grup = u[1]; ust[grup] = {}; }
    else if (u) { ust[u[1]] = u[2]; grup = null; }
  }
  return { ...ust, talimat: m[2].trim() };
}

const tomlMetin = (d) => JSON.stringify(d);

export function claudeDosyasi(a) {
  const satirlar = ['---', `name: ${a.name}`, `description: ${JSON.stringify(a.description)}`];
  for (const [k, v] of Object.entries(a.claude ?? {})) satirlar.push(`${k}: ${v}`);
  return [...satirlar, '---', '', a.talimat, ''].join('\n');
}

export function codexDosyasi(a) {
  const satirlar = [`name = ${tomlMetin(a.name)}`, `description = ${tomlMetin(a.description)}`];
  for (const [k, v] of Object.entries(a.codex ?? {})) satirlar.push(`${k} = ${tomlMetin(v)}`);
  satirlar.push(`developer_instructions = """\n${a.talimat.replaceAll('"""', '\\"\\"\\"')}\n"""`);
  return satirlar.join('\n') + '\n';
}

const ajanlar = readdirSync(join(KOK, 'ajanlar')).filter((f) => f.endsWith('.md')).sort();
let eski = 0;
for (const dosya of ajanlar) {
  const a = oku(readFileSync(join(KOK, 'ajanlar', dosya), 'utf8'));
  const hedefler = [
    [join(KOK, '.claude', 'agents', `${a.name}.md`), claudeDosyasi(a)],
    [join(KOK, '.codex', 'agents', `${a.name}.toml`), codexDosyasi(a)],
  ];
  for (const [yol, icerik] of hedefler) {
    const simdiki = existsSync(yol) ? readFileSync(yol, 'utf8') : null;
    if (simdiki === icerik) continue;
    if (kontrol) { eski++; console.error(`güncel değil: ${yol}`); }
    else writeFileSync(yol, icerik);
  }
}
if (kontrol && eski) process.exit(1);
console.log(`${ajanlar.length} ajan ${kontrol ? 'kontrol edildi' : 'üretildi'}`);
