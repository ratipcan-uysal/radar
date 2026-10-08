#!/usr/bin/env node
// PostToolUse: src/ ya da tests/ altında bir dosya değişince npm test koşar. Kalırsa çıkış 2 ve özet stderr'e:
// iki araç da bunu modele geri bildirim olarak verir. Geçerse sessiz kalır.
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const girdi = JSON.parse(readFileSync(0, 'utf8') || '{}');
const ti = girdi.tool_input || {};
const metin = [ti.file_path || '', typeof ti.command === 'string' ? ti.command : ''].join('\n');
if (!/(^|\/|\s)(src|tests)\//.test(metin)) process.exit(0);

const kos = spawnSync('npm', ['test', '--silent'], { cwd: girdi.cwd || process.cwd(), encoding: 'utf8' });
if (kos.status === 0) process.exit(0);
const cikti = (kos.stdout + kos.stderr).split('\n');
const ozet = cikti.filter((s) => /^✖|^ℹ (tests|pass|fail)/.test(s)).slice(0, 12).join('\n');
process.stderr.write(`Değişiklikten sonra testler kaldı:\n${ozet}\nDüzeltin; beklenen değeri değiştirmeyin.\n`);
process.exit(2);
