import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { analizEt } from '../src/analiz.js';
import { bicim } from '../src/bicim.js';
import { temaKarsilastir } from '../src/puan.js';
import { pencereHesapla } from '../src/tarih.js';
import { sozlukHazirla } from '../src/sozluk.js';
import { fixture, baslik, degistirilmisSatir } from './yardimci.js';

const sozluk = sozlukHazirla(readFileSync(new URL('./fixtures/test-sozluk.json', import.meta.url), 'utf8'));
const analiz = (csv, bugun = '2026-10-08') => analizEt(csv, sozluk, bugun);
const goster = kesir => bicim(kesir.pay, kesir.payda);

test('KK-13: yeni kaydı olmayan T 8,0, temel puanı 8,0 ve ortalaması 2,0', () => {
  const sonuc = analiz(fixture('GB-0030', 'GB-0133', 'GB-0134'));
  assert.deepEqual(sonuc.pencere, { bas: '2026-09-22', son: '2026-10-05' });
  const t = sonuc.temalar.find(tema => tema.ad === 'T');
  assert.equal(t.kayit, 2);
  assert.deepEqual(t.son14GunPayi, { pay: 0, payda: 2 });
  assert.equal(goster(t.puan), '8,0');
  assert.equal(goster(t.temelPuan), '8,0');
  assert.equal(goster(t.ortalama), '2,0');
});

test('KK-30: sınır gün dahil, önceki gün dışarıda; puan yuvarlanmamış ortalamadan gelir', () => {
  const csv = fixture('GB-0003', 'GB-0089', 'GB-0143', 'GB-0088', 'GB-0077');
  const sonuc = analiz(csv);
  assert.deepEqual(analiz(csv, '2026-11-01'), sonuc);
  const b = sonuc.temalar.find(tema => tema.ad === 'B');
  assert.deepEqual(b.ortalama, { pay: 7, payda: 4 });
  assert.deepEqual(b.son14GunPayi, { pay: 2, payda: 4 });
  assert.equal(goster(b.puan), '25,5');
  assert.equal(goster(b.temelPuan), '17,0');
  assert.equal(goster(b.ortalama), '1,8');
});

test('K14/K26: tam kesir, sonra kayıt sayısı, sonra Türk alfabesi sıralar', () => {
  const tema = (ad, kayit, pay, payda = 1) => ({ ad, kayit, puan: { pay, payda } });
  assert.deepEqual([
    tema('Ödeme hatası', 2, 20), tema('İptal ücreti', 2, 40, 2), tema('Az kayıt', 1, 20),
  ].sort(temaKarsilastir).map(t => t.ad), ['İptal ücreti', 'Ödeme hatası', 'Az kayıt']);
  // İki sayı da 1,3 görünür; daha büyük kesir daha az kayda rağmen önce gelir.
  assert.ok(temaKarsilastir(tema('Z', 1, 126, 100), tema('A', 10, 5, 4)) < 0);
  assert.equal(temaKarsilastir(tema('A', 1, 5, 4), tema('A', 1, 125, 100)), 0);
});

test('K39/KK-08: övgü ve diğer pencereye girer, puanlanmaz; övgü şikâyeti dışlamaz', () => {
  const csv = [fixture('GB-0030'),
    'X,2026-10-05,anket,qwerty,1,duzenli',
    'Y,2026-10-05,anket,great,5,yeni',
    'Z,2026-10-05,destek,Bildirim great,1,yeni'].join('\n');
  const sonuc = analiz(csv);
  assert.equal(goster(sonuc.temalar.find(t => t.ad === 'T').puan), '5,0');
  assert.equal(goster(sonuc.temalar.find(t => t.ad === 'B').puan), '10,0');
  assert.deepEqual(sonuc.ovgu, { kayit: 2 });
  assert.deepEqual(sonuc.diger, { kayit: 1 });
  assert.equal(sonuc.temalar.length, 2);
  assert.equal(sonuc.kapsam.kayit, 4);
});

test('KK-45: ileri ve bozuk tarih pencereyi etkilemez; tekrar ve çelişki puanlanmaz', () => {
  const temel = fixture('GB-0030', 'GB-0133', 'GB-0134');
  const csv = [temel, degistirilmisSatir({ tarih: '2026-10-09' }),
    degistirilmisSatir({ id: 'bozuk', tarih: '2026-02-30' })].join('\n');
  const sonuc = analiz(csv);
  assert.deepEqual(sonuc.temalar, analiz(temel).temalar);
  assert.deepEqual(sonuc.nedenler, { 'ileri tarih': 1, 'geçersiz tarih': 1 });
  const tek = degistirilmisSatir();
  assert.deepEqual(analiz([baslik, tek, tek].join('\n')).temalar, analiz([baslik, tek].join('\n')).temalar);
  const celiski = analiz([baslik, tek, degistirilmisSatir({ puan: '5' })].join('\n'));
  assert.equal(celiski.durum, 'bos');
  assert.deepEqual(celiski.temalar, []);
  assert.equal(celiski.pencere, null);
});

test('KK-48/K1: kaynak puanı kullanılır; kanal ve segment formülü değiştirmez', () => {
  const satir = degistirilmisSatir({ metin: 'Ödeme sorun', puan: '1' });
  const sonuc = analiz([baslik, satir].join('\n'));
  assert.equal(goster(sonuc.temalar[0].puan), '10,0');
  const bes = analiz([baslik, degistirilmisSatir({ metin: 'Ödeme sorun', puan: '5' })].join('\n'));
  assert.equal(goster(bes.temalar[0].puan), '2,0');
  const farkli = analiz([baslik, degistirilmisSatir({ metin: 'Ödeme sorun', puan: '1',
    kanal: 'anket', segment: 'kurumsal' })].join('\n'));
  assert.deepEqual(farkli.temalar, sonuc.temalar);
  assert.equal('kayitlar' in sonuc, false);
  assert.doesNotMatch(JSON.stringify(sonuc), /Ödeme sorun/);
});

test('pencere takvim sınırlarını saat diliminden bağımsız geçer', () => {
  for (const [son, bas] of [['2026-01-05', '2025-12-23'], ['2024-03-05', '2024-02-21'],
    ['2026-03-05', '2026-02-20']]) {
    assert.deepEqual(pencereHesapla([{ tarih: son }]), { bas, son });
  }
  assert.equal(pencereHesapla([]), null);
  const red = analiz('yanlış başlık');
  assert.equal(red.durum, 'red');
  assert.deepEqual(red.temalar, []);
});
