import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { analizEtAlintili } from '../src/analiz.js';
import { panoCiz } from '../src/pano.js';
import { sozlukHazirla } from '../src/sozluk.js';
import { eleman, sahteBelge } from './sahte-dom.js';
import { fixture, ornekCsv } from './yardimci.js';

const sozluk = sozlukHazirla(readFileSync(new URL('../data/temalar.json', import.meta.url), 'utf8'));
const ciz = (csv) => {
  const kap = eleman();
  panoCiz(kap, analizEtAlintili(csv, sozluk, '2026-10-08'), sahteBelge);
  return kap;
};

test('GB-0084 ve GB-0120 panoda maskeli çıkar; tam örnek dosyada ham numara DOM\'a ulaşmaz', () => {
  // İkisi de kendi temasının en yeni 3 kaydı arasında olmadığından tam dosyada alıntı olarak görünmez.
  const metin = ciz(fixture('GB-0084', 'GB-0120')).textContent;
  assert.match(metin, /GB-0084: İptal ücreti kesildi, beni arayın \*\*\*\* \*\*\* \*\* 34/);
  assert.match(metin, /GB-0120: Ödeme sorunu var, numaram \+\*\* \*\*\* \*\*\* \*\* 43/);
  assert.doesNotMatch(metin, /0532|555|987 65|kişi/);
  assert.doesNotMatch(ciz(ornekCsv).textContent, /0532|987 65|555 12/);
});

test('örnek dosya: üstte okunan/atlanan/nedenler ve kapsam, altta övgü ile diğer; temalar puana göre', () => {
  const metin = ciz(ornekCsv).textContent;
  assert.match(metin, /^Okunan: 150 kayıt, atlanan: 2 kayıtboş metin: 1tekrar: 1Kapsam: \d{4}-\d\d-\d\d - \d{4}-\d\d-\d\d, 148 kayıt, kanal dağılımı: destek \d+, mağaza \d+, anket \d+/);
  assert.match(metin, /Övgü: 27 kayıtDiğer: 0 kayıt$/);
  const puanlar = [...metin.matchAll(/\d+\. [^P]*?Puan (\d+),(\d), temel puan (\d+),(\d), (\d+) kayıt, ortalama puan (\d),(\d)/g)];
  assert.equal(puanlar.length, 7);
  const sirali = puanlar.map(m => Number(`${m[1]}.${m[2]}`));
  assert.deepEqual(sirali, [...sirali].sort((a, b) => b - a));
  assert.match(metin, /1\. Geç ya da hiç gelmeyen bildirimPuan 229,5, temel puan \d+,\d, 29 kayıt, ortalama puan 1,6Alıntılar \(3\)/);
});

test('her temada en fazla 3 alıntı; etiketlerde "kayıt" geçer, "kişi" geçmez', () => {
  const kap = ciz(ornekCsv);
  const makaleler = kap.cocuklar.filter(e => e.etiket === 'article');
  assert.equal(makaleler.length, 7);
  for (const makale of makaleler) {
    const acilir = makale.cocuklar.find(e => e.etiket === 'details');
    assert.ok(acilir.cocuklar.find(e => e.etiket === 'ul').cocuklar.length <= 3);
  }
  assert.doesNotMatch(kap.textContent, /kişi/i);
});

test('ardışık çizim öncekini siler; ret ve boş sonuçta tema yok', () => {
  const kap = eleman();
  const ciz2 = csv => panoCiz(kap, analizEtAlintili(csv, sozluk, '2026-10-08'), sahteBelge);
  ciz2(fixture('GB-0011', 'GB-0150'));
  ciz2(fixture('GB-0139'));
  assert.match(kap.textContent, /^Okunan: 1 kayıt, atlanan: 0 kayıtKapsam: /);
  assert.equal(kap.cocuklar.filter(e => e.etiket === 'article').length, 1);
  ciz2('ad,telefon\nx,y');
  assert.equal(kap.textContent, '');
  ciz2(fixture('GB-0140'));
  assert.equal(kap.textContent, 'Okunan: 1 kayıt, atlanan: 1 kayıtboş metin: 1');
});
