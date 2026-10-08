#!/usr/bin/env node
// Bir tema sözlüğünün (K48 şeması) bir CSV'deki kayıtları nasıl dağıttığını ölçer.
// Kullanım: node kapsama.mjs <sozluk.json> <veri.csv> [--json]
// Çıktı: tema başına kayıt sayısı ve kimlikler, birden çok temaya giren kayıtlar, hiçbir yere girmeyenler.
// Bağımlılık yok; Radar'ın uygulama kodunu kullanmaz, kendi küçük ayrıştırıcısı ve normalizasyonu var.
import { readFileSync } from 'node:fs';

const [sozlukYolu, csvYolu, bayrak] = process.argv.slice(2);
if (!sozlukYolu || !csvYolu) {
  console.error('Kullanım: node kapsama.mjs <sozluk.json> <veri.csv> [--json]');
  process.exit(2);
}

const HARF = { 'ı': 'i', 'İ': 'i', 'I': 'i', 'ş': 's', 'Ş': 's', 'ğ': 'g', 'Ğ': 'g', 'ü': 'u', 'Ü': 'u', 'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c' };
const normalize = (m) => [...m].map((h) => HARF[h] ?? h).join('').toLowerCase();

function satirBol(satir) {
  const alanlar = [];
  let alan = '', tirnak = false;
  for (let i = 0; i < satir.length; i++) {
    const h = satir[i];
    if (tirnak) {
      if (h === '"' && satir[i + 1] === '"') { alan += '"'; i++; }
      else if (h === '"') tirnak = false;
      else alan += h;
    } else if (h === '"') tirnak = true;
    else if (h === ',') { alanlar.push(alan); alan = ''; }
    else alan += h;
  }
  alanlar.push(alan);
  return alanlar;
}

const sozluk = JSON.parse(readFileSync(sozlukYolu, 'utf8'));
const satirlar = readFileSync(csvYolu, 'utf8').replace(/^﻿/, '').split(/\r?\n/).filter(Boolean);
const baslik = satirBol(satirlar[0]);
const idS = baslik.indexOf('id'), metinS = baslik.indexOf('metin');
if (idS < 0 || metinS < 0) { console.error('CSV başlığında id ve metin sütunu olmalı'); process.exit(2); }

const tutar = (metin, kurallar) => kurallar.some((kural) => kural.every((k) => metin.includes(normalize(k))));
const temalar = sozluk.temalar.map((t) => ({ ad: t.ad, kayitlar: [] }));
const ovgu = [], diger = [], cokTemali = [], bos = [];

for (const satir of satirlar.slice(1)) {
  const alan = satirBol(satir);
  const id = alan[idS], metin = normalize(alan[metinS] ?? '');
  if (!metin.trim()) { bos.push(id); continue; }
  const girdigi = sozluk.temalar.filter((t) => tutar(metin, t.kurallar)).map((t) => t.ad);
  girdigi.forEach((ad) => temalar.find((t) => t.ad === ad).kayitlar.push(id));
  const ovguMu = tutar(metin, sozluk.ovgu?.kurallar ?? []);
  if (ovguMu) ovgu.push(id);
  if (girdigi.length > 1) cokTemali.push(`${id} (${girdigi.join(', ')})`);
  if (!girdigi.length && !ovguMu) diger.push(id);
}

const sonuc = { temalar: temalar.map((t) => ({ ad: t.ad, sayi: t.kayitlar.length, kayitlar: t.kayitlar })), ovgu, diger, cokTemali, bos };
if (bayrak === '--json') { console.log(JSON.stringify(sonuc, null, 2)); process.exit(0); }

console.log('| Tema | Kayıt | Örnek |\n|---|---|---|');
for (const t of sonuc.temalar) console.log(`| ${t.ad} | ${t.sayi} | ${t.kayitlar.slice(0, 3).join(', ')} |`);
console.log(`| Övgü | ${ovgu.length} | ${ovgu.slice(0, 3).join(', ')} |`);
console.log(`\nBirden çok temaya giren: ${cokTemali.join('; ') || 'yok'}`);
console.log(`Hiçbir yere girmeyen (diğer): ${diger.join(', ') || 'yok'}`);
console.log(`Boş metin: ${bos.join(', ') || 'yok'}`);
