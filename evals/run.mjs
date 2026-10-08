#!/usr/bin/env node
// Radar skill eval'leri. Her fixture'ı Claude Code ve Codex'te başsız koşturur, çıktıyı saklar, puanlar.
//
//   node evals/run.mjs                      iki araç, bütün skill'ler
//   node evals/run.mjs --arac claude        tek araç
//   node evals/run.mjs --skill prd-writer   tek skill (virgülle birden çok)
//   node evals/run.mjs --puanla <klasör>    koşturmadan, kayıtlı çıktıları yeniden puanla
//   node evals/run.mjs --baseline-yap <klasör>  o koşuyu kabul edilmiş sonuç (baseline) yap
//
// Puanlama: expected.json'daki her "marker" çıktıda bulunmalı, hiçbir "negatif" bulunmamalı.
// "puanlayici": "kapsama" olan fixture'da çıktıdaki sözlük kapsama betiğiyle CSV'ye uygulanıp ölçülür;
// sözlük K48 biçiminde değilse ya da betik başarısızsa FAIL, beklenen dertler ayrı temalarda olmalı.
// Hüküm: PASS ya da FAIL; araç sıfır dışı kodla çıktıysa FAIL. Gate (gate.json): her skill'in her fixture'ı
// iki araçta PASS; koşulmamış araç × fixture çifti kalmış sayılır (--arac/--skill alt kümesi gate'i geçemez).
// Koşucu iki aracın komutunu ortam değişkeninden alır: RADAR_CLAUDE, RADAR_CODEX (varsayılan: claude, codex).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { join, dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const EVALS = join(KOK, 'evals');
const arg = (ad) => { const i = process.argv.indexOf(ad); return i > 0 ? process.argv[i + 1] : undefined; };
const TUM_ARACLAR = ['claude', 'codex'];
const araclar = arg('--arac')?.split(',') ?? TUM_ARACLAR;
const skillSecimi = arg('--skill')?.split(',');
const paralel = Number(arg('--paralel') ?? 3);

const HARF = { 'ı': 'i', 'İ': 'i', 'I': 'i', 'ş': 's', 'Ş': 's', 'ğ': 'g', 'Ğ': 'g', 'ü': 'u', 'Ü': 'u', 'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c' };
const normalize = (m) => [...m].map((h) => HARF[h] ?? h).join('').toLowerCase();

// ---- puanlama --------------------------------------------------------------
const kurallarMi = (k) => Array.isArray(k) && k.every((kural) => Array.isArray(kural) && kural.every((x) => typeof x === 'string'));
const k48Mi = (s) => Array.isArray(s?.temalar) && s.temalar.every((t) => typeof t?.ad === 'string' && kurallarMi(t.kurallar))
  && (s.ovgu == null || kurallarMi(s.ovgu.kurallar));

// Her gruba ayrı bir tema düşecek bir atama arar (geri izlemeli); yoksa null.
function ayriAta(adaylar, kullanilan = new Set(), i = 0) {
  if (i === adaylar.length) return [];
  for (const t of adaylar[i]) {
    if (kullanilan.has(t)) continue;
    kullanilan.add(t);
    const kalan = ayriAta(adaylar, kullanilan, i + 1);
    if (kalan) return [t, ...kalan];
    kullanilan.delete(t);
  }
  return null;
}

function kapsamaPuanla(cikti, beklenen, girdiYolu) {
  const blok = cikti.match(/```json\s*([\s\S]*?)```/)?.[1];
  const sonuclar = [];
  const jsonAciklama = 'Çıktıda ayrıştırılabilir, K48 biçiminde JSON sözlük';
  let sozluk;
  try { sozluk = JSON.parse(blok); } catch { return [{ id: 'json', tur: 'marker', aciklama: jsonAciklama, tuttu: false }]; }
  if (!k48Mi(sozluk)) return [{ id: 'json', tur: 'marker', aciklama: jsonAciklama, tuttu: false, not: 'K48 biçimi değil' }];
  sonuclar.push({ id: 'json', tur: 'marker', aciklama: jsonAciklama, tuttu: true });
  const gecici = join(tmpdir(), `radar-sozluk-${process.pid}-${Math.random().toString(36).slice(2)}.json`);
  let k;
  try {
    writeFileSync(gecici, JSON.stringify(sozluk));
    const r = spawnSync('node', [join(KOK, '.agents/skills/feedback-clustering/scripts/kapsama.mjs'), gecici, girdiYolu, '--json'], { encoding: 'utf8' });
    if (r.status === 0) try { k = JSON.parse(r.stdout); } catch { /* aşağıda FAIL */ }
    if (!Array.isArray(k?.temalar)) {
      sonuclar.push({ id: 'kapsama', tur: 'marker', aciklama: 'Kapsama betiği çalıştı', tuttu: false, not: (r.stderr || r.error?.message || '').trim().split('\n')[0] });
      return sonuclar;
    }
  } finally {
    rmSync(gecici, { force: true });
  }
  const adaylar = beklenen.gruplar.map((g) => k.temalar.flatMap((t, i) => (g.kayitlar.every((id) => t.kayitlar.includes(id)) ? [i] : [])));
  beklenen.gruplar.forEach((g, n) => {
    const tema = k.temalar[adaylar[n][0]];
    sonuclar.push({ id: g.id, tur: 'marker', aciklama: `${g.kayitlar.join(', ')} aynı temada`, tuttu: Boolean(tema), not: tema?.ad });
  });
  if (adaylar.every((a) => a.length)) {
    const atama = ayriAta(adaylar);
    sonuclar.push({ id: 'ayri-temalar', tur: 'marker', aciklama: 'Her dert ayrı bir temada', tuttu: Boolean(atama),
      not: atama ? undefined : [...new Set(adaylar.flat().map((i) => k.temalar[i].ad))].join(', ') });
  }
  const temaya_giren_ovgu = beklenen.ovgu.filter((id) => k.temalar.some((t) => t.kayitlar.includes(id)));
  sonuclar.push({ id: 'ovgu', tur: 'marker', aciklama: 'Övgü kayıtları övgüde', tuttu: beklenen.ovgu.every((id) => k.ovgu.includes(id)) });
  sonuclar.push({ id: 'ovgu-sikayette', tur: 'negatif', aciklama: 'Övgü kaydı bir şikâyet temasına girmiş', tuttu: temaya_giren_ovgu.length > 0, not: temaya_giren_ovgu.join(', ') });
  if (beklenen.diger_bos) sonuclar.push({ id: 'diger', tur: 'negatif', aciklama: 'Hiçbir yere girmeyen kayıt kalmış', tuttu: k.diger.length > 0, not: k.diger.join(', ') });
  return sonuclar;
}

export function puanla(cikti, beklenen, girdiYolu) {
  if (beklenen.puanlayici === 'kapsama') return kapsamaPuanla(cikti, beklenen, girdiYolu);
  const metin = normalize(cikti);
  const sonuc = [];
  for (const m of beklenen.marker ?? []) sonuc.push({ id: m.id, tur: 'marker', aciklama: m.aciklama, tuttu: new RegExp(m.desen, 'i').test(metin) });
  for (const n of beklenen.negatif ?? []) {
    const bulgu = metin.match(new RegExp(n.desen, 'i'));
    sonuc.push({ id: n.id, tur: 'negatif', aciklama: n.aciklama, tuttu: Boolean(bulgu), not: bulgu?.[0] });
  }
  return sonuc;
}

export const hukum = (sonuclar) => sonuclar.every((s) => (s.tur === 'marker' ? s.tuttu : !s.tuttu)) ? 'PASS' : 'FAIL';

// Bir koşunun çıktısını puanlar; çıkış kodu biliniyorsa (undefined değilse) 0 olması da bir işarettir.
export function kosuPuanla(r, f) {
  const sonuclar = puanla(r.cikti, f.beklenen, f.girdi);
  if (r.kod !== undefined) {
    sonuclar.push({ id: 'cikis-kodu', tur: 'marker', aciklama: 'Araç süreci 0 koduyla çıktı', tuttu: r.kod === 0, not: r.kod === 0 ? undefined : `kod ${r.kod}` });
  }
  return sonuclar;
}

// Gate beklenen bütün araç × fixture çiftleri üzerinden hesaplanır; koşulmamış çift kalmış sayılır.
export function kapiHesapla(satirlar, beklenen, gecmeOrani) {
  const anahtar = (s) => `${s.arac}/${s.skill}/${s.fixture}`;
  const bulunan = new Map(satirlar.map((s) => [anahtar(s), s]));
  const eksik = beklenen.map(anahtar).filter((a) => !bulunan.has(a));
  const gecen = beklenen.filter((b) => bulunan.get(anahtar(b))?.hukum === 'PASS').length;
  const kapi = beklenen.length && gecen / beklenen.length >= gecmeOrani ? 'GEÇTİ' : 'KALDI';
  return { kapi, gecen, toplam: beklenen.length, eksik };
}

// ---- koşturma --------------------------------------------------------------
function istem(arac, skill, girdi) {
  const yol = relative(KOK, girdi);
  const ek = skill === 'release-notes' ? ' Girdi dosyasındaki git log\'u kullan; git komutu çalıştırma.' : '';
  const cagri = arac === 'claude' ? `/${skill}` : `$${skill}`;
  return `${cagri} Girdi: ${yol}.${ek} Bu girdi dışında repodaki belgeleri kaynak olarak kullanma. Yalnızca cevap olarak ver, dosyaya yazma.`;
}

function komut(arac, istemMetni) {
  if (arac === 'claude') {
    return [process.env.RADAR_CLAUDE ?? 'claude', ['-p', istemMetni, '--allowedTools', 'Read,Glob,Grep,Bash(node:*)', '--model', 'sonnet', '--effort', 'medium']];
  }
  return [process.env.RADAR_CODEX ?? 'codex', ['exec', '-s', 'read-only', '-m', 'gpt-6.1-sol', '-c', 'model_reasoning_effort=medium', istemMetni]];
}

export function kos(arac, istemMetni) {
  return new Promise((coz) => {
    const [k, a] = komut(arac, istemMetni);
    const p = spawn(k, a, { cwd: KOK, stdio: ['ignore', 'pipe', 'pipe'] });
    let cikti = '', hata = '';
    p.stdout.on('data', (d) => (cikti += d));
    p.stderr.on('data', (d) => (hata += d));
    p.on('error', (e) => coz({ cikti, kod: null, hata: hata + e.message })); // ör. araç bulunamadı (ENOENT)
    p.on('close', (kod) => coz({ cikti: arac === 'codex' ? codexSon(cikti) : cikti, kod, hata }));
  });
}

// codex exec stdout'unda son mesaj en sondadır; "tokens used" satırından sonrasını al
function codexSon(m) {
  const i = m.lastIndexOf('tokens used');
  return i < 0 ? m : m.slice(m.indexOf('\n', m.indexOf('\n', i) + 1) + 1);
}

function fixturelar(secim = skillSecimi) {
  const liste = [];
  for (const skill of readdirSync(EVALS).filter((d) => existsSync(join(EVALS, d, 'fixtures')))) {
    if (secim && !secim.includes(skill)) continue;
    for (const f of readdirSync(join(EVALS, skill, 'fixtures')).sort()) {
      const kl = join(EVALS, skill, 'fixtures', f);
      const girdi = readdirSync(kl).find((d) => d.startsWith('input.'));
      liste.push({ skill, fixture: f, girdi: join(kl, girdi), beklenen: JSON.parse(readFileSync(join(kl, 'expected.json'), 'utf8')) });
    }
  }
  return liste;
}

async function havuz(isler, n) {
  const sonuc = []; let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < isler.length) { const j = i++; sonuc[j] = await isler[j](); } }));
  return sonuc;
}

function ozetYaz(klasor, satirlar, beklenen) {
  writeFileSync(join(klasor, 'ozet.json'), JSON.stringify(satirlar, null, 2) + '\n');
  const md = ['| Araç | Skill | Fixture | Hüküm | Kaçan |', '|---|---|---|---|---|'];
  for (const s of satirlar) {
    const kacan = s.sonuclar.filter((x) => (x.tur === 'marker' ? !x.tuttu : x.tuttu)).map((x) => `${x.id}${x.not ? ` (${x.not})` : ''}`).join(', ');
    md.push(`| ${s.arac} | ${s.skill} | ${s.fixture} | ${s.hukum} | ${kacan || '-'} |`);
  }
  const gate = JSON.parse(readFileSync(join(EVALS, 'gate.json'), 'utf8'));
  const { kapi, gecen, toplam, eksik } = kapiHesapla(satirlar, beklenen, gate.gecme_orani);
  md.push('', `Gate (${gate.aciklama}): **${kapi}** · ${gecen}/${toplam} PASS`);
  if (eksik.length) md.push('', `Koşulmamış, kalmış sayılan (${eksik.length}): ${eksik.join(', ')}`);
  const bl = join(EVALS, 'baseline.json');
  if (existsSync(bl)) {
    const onceki = JSON.parse(readFileSync(bl, 'utf8'));
    const fark = satirlar.filter((s) => onceki.find((o) => o.arac === s.arac && o.skill === s.skill && o.fixture === s.fixture && o.hukum !== s.hukum));
    md.push('', 'Baseline ile fark: ' + (fark.length ? fark.map((s) => `${s.arac}/${s.skill}/${s.fixture} → ${s.hukum}`).join('; ') : 'yok'));
  }
  writeFileSync(join(klasor, 'ozet.md'), md.join('\n') + '\n');
  console.log(md.join('\n'));
  return kapi;
}

// ---- ana akış --------------------------------------------------------------
const dogrudan = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (dogrudan) {
  const puanlanacak = arg('--puanla');
  const baselineYap = arg('--baseline-yap');
  if (baselineYap) {
    writeFileSync(join(EVALS, 'baseline.json'), readFileSync(join(baselineYap, 'ozet.json')));
    console.log(`baseline: ${baselineYap}`);
    process.exit(0);
  }

  const fx = fixturelar();
  let klasor, satirlar;
  if (puanlanacak) {
    klasor = puanlanacak;
    satirlar = [];
    // Koşudaki çıkış kodu önceki özetten taşınır; yeniden puanlama bir FAIL'i PASS'e çevirmesin.
    const oncekiOzet = join(klasor, 'ozet.json');
    const onceki = existsSync(oncekiOzet) ? JSON.parse(readFileSync(oncekiOzet, 'utf8')) : [];
    for (const arac of araclar) for (const f of fx) {
      const yol = join(klasor, arac, f.skill, `${f.fixture}.md`);
      if (!existsSync(yol)) continue;
      const kod = onceki.find((o) => o.arac === arac && o.skill === f.skill && o.fixture === f.fixture)?.cikis_kodu;
      const sonuclar = kosuPuanla({ cikti: readFileSync(yol, 'utf8'), kod }, f);
      satirlar.push({ arac, skill: f.skill, fixture: f.fixture, hukum: hukum(sonuclar), sonuclar, cikis_kodu: kod });
    }
  } else {
    klasor = join(EVALS, 'results', new Date().toISOString().slice(0, 16).replace(':', ''));
    const isler = [];
    for (const arac of araclar) for (const f of fx) isler.push(async () => {
      const r = await kos(arac, istem(arac, f.skill, f.girdi));
      const yol = join(klasor, arac, f.skill, `${f.fixture}.md`);
      mkdirSync(dirname(yol), { recursive: true });
      writeFileSync(yol, r.cikti);
      const sonuclar = kosuPuanla(r, f);
      console.error(`${arac} ${f.skill}/${f.fixture}: ${hukum(sonuclar)}`);
      return { arac, skill: f.skill, fixture: f.fixture, hukum: hukum(sonuclar), sonuclar, cikis_kodu: r.kod };
    });
    satirlar = await havuz(isler, paralel);
  }
  const beklenen = TUM_ARACLAR.flatMap((arac) => fixturelar(null).map((f) => ({ arac, skill: f.skill, fixture: f.fixture })));
  const kapi = ozetYaz(klasor, satirlar, beklenen);
  process.exit(kapi === 'GEÇTİ' ? 0 : 1);
}
