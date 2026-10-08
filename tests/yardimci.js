import { readFileSync } from 'node:fs';

export const ornekCsv = readFileSync(new URL('../data/ornek-geri-bildirim.csv', import.meta.url), 'utf8');
export const baslik = 'id,tarih,kanal,metin,puan,segment';
const satirlar = ornekCsv.trimEnd().split(/\r?\n/).slice(1);

// Gerçek satırlar GB numarasıyla, değiştirilmeden örnek dosyadan alınır.
export function ornekSatir(id) {
  const satir = satirlar.find(satir => satir.startsWith(`${id},`));
  if (!satir) throw new Error(`Örnek satır bulunamadı: ${id}`);
  return satir;
}

export function fixture(...ids) {
  return [baslik, ...ids.map(ornekSatir)].join('\n');
}

// Sentetik değişiklikler test adında belirtilir; varsayılan satır GB-0057'dir.
export function degistirilmisSatir(degisiklik = {}) {
  const alanlar = ornekSatir('GB-0057').split(',');
  for (const [ad, deger] of Object.entries(degisiklik)) {
    alanlar[baslik.split(',').indexOf(ad)] = deger;
  }
  return alanlar.map(alan => /[",\r\n]/.test(alan) ? `"${alan.replaceAll('"', '""')}"` : alan).join(',');
}
