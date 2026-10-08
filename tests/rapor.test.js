import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { analizEtAlintili } from '../src/analiz.js';
import { sozlukHazirla } from '../src/sozluk.js';
import { raporMetni, dosyaAdi } from '../src/rapor.js';
import { baslik, degistirilmisSatir, fixture, ornekCsv } from './yardimci.js';

const sozluk = sozlukHazirla(readFileSync(new URL('../data/temalar.json', import.meta.url), 'utf8'));
const analiz = csv => analizEtAlintili(csv, sozluk, '2026-10-08');
const sonuc = analiz(ornekCsv);
const rapor = raporMetni(sonuc);

test('tam örnek raporu: başlık, hemen altında kapsam ve en yeni geçerli tarihle dosya adı', () => {
  assert.equal(dosyaAdi(sonuc), 'radar-raporu-2026-10-05.md');
  assert.deepEqual(rapor.split('\n').slice(0, 2), [
    '# Radar raporu: 2026-10-05',
    'Kapsam: 2026-08-24 - 2026-10-05, 148 kayıt, kanal dağılımı: destek 51, mağaza 51, anket 46',
  ]);
});

test('tam örnek raporu: yalnız ilk 5 tema aynı sırada; puan, temel puan, kayıt ve ortalama', () => {
  assert.deepEqual([...rapor.matchAll(/^## (.+)$/gm)].map(eslesme => eslesme[1]), [
    'Geç ya da hiç gelmeyen bildirim', 'İptal ücreti ve politikası', 'Ödeme hatası',
    'Giriş ve hesap sorunu', 'Masa ve oturma yeri seçimi',
  ]);
  assert.deepEqual(rapor.split('\n').filter(satir => satir.startsWith('Puan ')), [
    'Puan 229,5, temel puan 128,0, 29 kayıt, ortalama puan 1,6',
    'Puan 192,0, temel puan 140,0, 35 kayıt, ortalama puan 2,0',
    'Puan 113,3, temel puan 85,0, 21 kayıt, ortalama puan 2,0',
    'Puan 45,6, temel puan 38,0, 10 kayıt, ortalama puan 2,2',
    'Puan 43,4, temel puan 38,0, 14 kayıt, ortalama puan 3,3',
  ]);
});

test('tam örnek raporu: her temanın en yeni 3 maskeli alıntısı tarih, kanal ve id ile blok alıntıdır', () => {
  const alintilar = rapor.split('\n').filter(satir => satir.startsWith('> '));
  assert.equal(alintilar.length, 15);
  assert.deepEqual(alintilar, sonuc.temalar.slice(0, 5).flatMap(tema => tema.alintilar.map(alinti =>
    `> ${alinti.metin.replaceAll('*', '\\*')} — ${alinti.tarih} / ${alinti.kanal} / ${alinti.id}`)));
  assert.doesNotMatch(rapor, /0532|987 65|555 12|kişi/);
});

test('K50: gerçek telefon maskelerinin yıldızları kaçışlı; Sonuc değişmez', () => {
  // Tam dosyada bu telefonlar en yeni üç alıntı arasında değildir; gerçek satırlarla ayrıca doğrula.
  const maskeliSonuc = analiz(fixture('GB-0084', 'GB-0120'));
  const once = structuredClone(maskeliSonuc);
  const metin = raporMetni(maskeliSonuc);
  assert.ok(metin.includes('beni arayın \\*\\*\\*\\* \\*\\*\\* \\*\\* 34'));
  assert.ok(metin.includes('numaram +\\*\\* \\*\\*\\* \\*\\*\\* \\*\\* 43'));
  assert.doesNotMatch(metin, /(?<!\\)\*/);
  assert.deepEqual(maskeliSonuc, once);
});

test('K50: sentetik e-posta maskesinin yıldızları da kaçışlıdır', () => {
  const csv = [baslik, degistirilmisSatir({ metin: 'Ödeme sorunu var, adresim ali@ornek.com.' })].join('\n');
  const metin = raporMetni(analiz(csv));
  assert.ok(metin.includes('a\\*\\*\\*@\\*\\*\\*.'));
  assert.doesNotMatch(metin, /ali@ornek\.com|(?<!\\)\*/);
});

test('az kayıt ve tema: yalnız var olan tema ve alıntılar yazılır', () => {
  const metin = raporMetni(analiz(fixture('GB-0139')));
  assert.equal([...metin.matchAll(/^## /gm)].length, 1);
  assert.equal([...metin.matchAll(/^> /gm)].length, 1);
  assert.match(metin, /2026-09-02 \/ destek \/ GB-0139/);
  for (const csv of ['ad,telefon\nx,y', fixture('GB-0140')]) {
    assert.throws(() => raporMetni(analiz(csv)), /kullanılabilir kayıt/);
    assert.throws(() => dosyaAdi(analiz(csv)), /kullanılabilir kayıt/);
  }
});
