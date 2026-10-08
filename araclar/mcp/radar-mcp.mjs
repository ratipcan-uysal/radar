#!/usr/bin/env node
// Radar MCP sunucusu: Radar'ın analizini ajana bir araç olarak açar. Bağımlılıksız, stdio üzerinden JSON-RPC 2.0.
// Araçlar:
//   radar_ozet   { csv_yolu, bugun? }  → tema sıralaması (puan, temel puan, kayıt), kapsam, atlananlar
//   radar_alinti { csv_yolu, tema }     → o temanın en yeni 3 maskeli alıntısı
// Sözlük her zaman data/temalar.json (onaylı, K52). Yalnız proje içindeki dosyaları okur.
import { readFileSync } from 'node:fs';
import { resolve, relative, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { analizEtAlintili } from '../../src/analiz.js';
import { sozlukHazirla } from '../../src/sozluk.js';
import { bicim } from '../../src/bicim.js';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const sozluk = () => sozlukHazirla(JSON.parse(readFileSync(join(KOK, 'data/temalar.json'), 'utf8')));
const bugunYerel = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

function oku(csvYolu) {
  const tam = resolve(KOK, csvYolu);
  if (relative(KOK, tam).startsWith('..')) throw new Error('Yalnız proje içindeki dosyalar okunur.');
  return readFileSync(tam, 'utf8');
}

const ARACLAR = [
  { name: 'radar_ozet', description: 'Bir geri bildirim CSV dosyasını Radar kurallarıyla analiz eder: temalar puana göre sıralı (puan, yeniliksiz temel puan, kayıt sayısı, ortalama), kapsam ve atlanan satırlar. Metin döndürmez.',
    inputSchema: { type: 'object', properties: { csv_yolu: { type: 'string', description: 'Proje köküne göre yol, ör. data/ornek-geri-bildirim.csv' }, bugun: { type: 'string', description: 'YYYY-AA-GG; verilmezse bugün' } }, required: ['csv_yolu'] } },
  { name: 'radar_alinti', description: 'Bir temanın en yeni üç alıntısını maskeli olarak döndürür (telefon ve e-posta gizli).',
    inputSchema: { type: 'object', properties: { csv_yolu: { type: 'string' }, tema: { type: 'string', description: 'Tema adı, radar_ozet çıktısındaki gibi' } }, required: ['csv_yolu', 'tema'] } },
];

function cagir(ad, girdi) {
  const s = analizEtAlintili(oku(girdi.csv_yolu), sozluk(), girdi.bugun ?? bugunYerel());
  if (s.durum !== 'tamam') return { durum: s.durum, neden: s.redNedeni };
  if (ad === 'radar_ozet') {
    return { kapsam: s.kapsam, okunan: s.okunan, atlanan: s.atlanan, nedenler: s.nedenler, sozluk: s.sozlukSurumu,
      temalar: s.temalar.map((t) => ({ sira: t.sira, ad: t.ad, puan: bicim(t.puan.pay, t.puan.payda), temel_puan: bicim(t.temelPuan.pay, t.temelPuan.payda), kayit: t.kayit, ortalama: bicim(t.ortalama.pay, t.ortalama.payda) })),
      ovgu: s.ovgu?.kayit ?? s.ovgu, diger: s.diger?.kayit ?? s.diger };
  }
  const tema = s.temalar.find((t) => t.ad === girdi.tema);
  if (!tema) return { hata: `Tema yok: ${girdi.tema}`, temalar: s.temalar.map((t) => t.ad) };
  return { tema: tema.ad, alintilar: tema.alintilar };
}

const yaz = (m) => process.stdout.write(JSON.stringify(m) + '\n');
createInterface({ input: process.stdin }).on('line', (satir) => {
  if (!satir.trim()) return;
  let istek; try { istek = JSON.parse(satir); } catch { return; }
  const { id, method, params } = istek;
  if (id === undefined) return; // bildirim (ör. notifications/initialized)
  try {
    if (method === 'initialize') yaz({ jsonrpc: '2.0', id, result: { protocolVersion: params?.protocolVersion ?? '2025-06-18', capabilities: { tools: {} }, serverInfo: { name: 'radar', version: '0.1.0' }, instructions: 'Radar geri bildirim analizi. Önce radar_ozet, sonra gerekirse radar_alinti.' } });
    else if (method === 'tools/list') yaz({ jsonrpc: '2.0', id, result: { tools: ARACLAR } });
    else if (method === 'tools/call' && !ARACLAR.some((a) => a.name === params?.name)) {
      yaz({ jsonrpc: '2.0', id, error: { code: -32602, message: `Bilinmeyen araç: ${params?.name}` } });
    } else if (method === 'tools/call') {
      const sonuc = cagir(params.name, params.arguments ?? {});
      yaz({ jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: JSON.stringify(sonuc, null, 2) }] } });
    } else if (method === 'ping') yaz({ jsonrpc: '2.0', id, result: {} });
    else yaz({ jsonrpc: '2.0', id, error: { code: -32601, message: `Bilinmeyen yöntem: ${method}` } });
  } catch (e) {
    yaz({ jsonrpc: '2.0', id, result: { isError: true, content: [{ type: 'text', text: e.message }] } });
  }
});
