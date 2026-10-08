import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dogrula } from '../src/dogrula.js';
import { baslik, fixture, ornekSatir, ornekCsv, degistirilmisSatir } from './yardimci.js';

const bugun = '2026-10-08';
const oku = (...satirlar) => dogrula([baslik, ...satirlar].join('\n'), bugun);

test('K11: başlık birebir, sıralı ve büyük-küçük harf duyarlı olmalıdır; içerik yankılanmaz', () => {
  for (const hatali of [baslik.replace('id,', ''), baslik.replace(',puan', ''),
    'id,tarih,kanal,puan,metin,segment', baslik.replace('id', 'ID'), `${baslik},ad,telefon`,
    ` ${baslik}`, `"id",tarih,kanal,metin,puan,segment`, '']) {
    const sonuc = dogrula(`${hatali}\n${ornekSatir('GB-0084')},Test Kişi,05000000000`, bugun);
    assert.equal(sonuc.durum, 'red');
    assert.ok(sonuc.redNedeni.includes(baslik));
    assert.deepEqual(sonuc.kayitlar, []);
    assert.equal(sonuc.okunan, 0);
    assert.doesNotMatch(JSON.stringify(sonuc), /Test Kişi|05000000000|0532/);
  }
});

test('K11: xlsx ZIP baytları ve CSV olmayan metin reddedilir', () => {
  for (const metin of ['PK\u0003\u0004\u0000\u0000xlsx', '<html>CSV değil</html>', '']) {
    assert.equal(dogrula(metin, bugun).durum, 'red');
  }
});

test('K24: BOM kabul edilir; GB-0139 tutulur', () => {
  assert.deepEqual(dogrula(`\uFEFF${fixture('GB-0139')}`, bugun), dogrula(fixture('GB-0139'), bugun));
  assert.equal(dogrula(fixture('GB-0139'), bugun).kayitlar[0].id, 'GB-0139');
});

test('K23/K44: tam örnekte 150 okunan, GB-0140 boş metin, GB-0150 tekrar', () => {
  const sonuc = dogrula(ornekCsv, bugun);
  assert.equal(sonuc.okunan, 150);
  assert.equal(sonuc.atlanan, 2);
  assert.equal(sonuc.kayitlar.length, 148);
  assert.deepEqual(sonuc.nedenler, { 'boş metin': 1, tekrar: 1 });
  assert.ok(sonuc.kayitlar.some(kayit => kayit.id === 'GB-0139'));
  assert.ok(sonuc.kayitlar.some(kayit => kayit.id === 'GB-0011'));
  assert.ok(!sonuc.kayitlar.some(kayit => ['GB-0140', 'GB-0150'].includes(kayit.id)));
});

const bozuklar = [
  ['eksik alan', ornekSatir('GB-0057').replace(/,yeni$/, '')],
  ['eksik alan', `${ornekSatir('GB-0057')},fazla`],
  ...['id', 'tarih', 'kanal', 'puan', 'segment'].map(ad => ['eksik alan', degistirilmisSatir({ [ad]: '' })]),
  ['eksik alan', 'GB-0057,2026-10-04,magaza,"kapanmamış,1,yeni'],
  ['geçersiz tarih', degistirilmisSatir({ tarih: '2026-02-30' })],
  ['geçersiz tarih', degistirilmisSatir({ tarih: '04.10.2026' })],
  ['ileri tarih', degistirilmisSatir({ tarih: '2026-10-09' })],
  ...['twitter', 'Destek', ' magaza'].map(kanal => ['bilinmeyen kanal', degistirilmisSatir({ kanal })]),
  ...['0', '6', '10', '2.5', '1.0', '01', '+1', ' 1', '1 ', '1e0'].map(puan => ['geçersiz puan', degistirilmisSatir({ puan })]),
  ...['vip', 'Yeni', 'düzenli'].map(segment => ['bilinmeyen segment', degistirilmisSatir({ segment })]),
  ['boş metin', ornekSatir('GB-0140')],
  ['boş metin', degistirilmisSatir({ metin: ' \t ' })],
];
for (const [i, [neden, satir]] of bozuklar.entries()) {
  test(`K11/K24/K31/K49: GB-0057 türevi veya GB-0140, ${i + 1}: ${neden}`, () => {
    const sonuc = oku(satir, ornekSatir('GB-0139'));
    assert.equal(sonuc.durum, 'tamam');
    assert.equal(sonuc.okunan, 2);
    assert.equal(sonuc.atlanan, 1);
    assert.deepEqual(sonuc.nedenler, { [neden]: 1 });
    assert.deepEqual(sonuc.kayitlar.map(kayit => kayit.id), ['GB-0139']);
  });
}

test('K24: tüm kanallar, segmentler ve 1-5 tam sayı puanları kabul edilir', () => {
  for (const kanal of ['destek', 'magaza', 'anket']) {
    for (const segment of ['yeni', 'duzenli', 'kurumsal']) {
      for (const puan of ['1', '2', '3', '4', '5']) {
        assert.equal(oku(degistirilmisSatir({ kanal, segment, puan })).atlanan, 0);
      }
    }
  }
});

test('K44/K49: tek neden; eksik alan → tarih → ileri tarih → kanal → puan → segment → metin', () => {
  const sorunlar = { id: '', tarih: '2026-02-30', kanal: 'twitter', puan: '0', segment: 'vip', metin: '' };
  for (const [alan, neden] of [['id', 'eksik alan'], ['tarih', 'geçersiz tarih'],
    ['tarih', 'ileri tarih'], ['kanal', 'bilinmeyen kanal'], ['puan', 'geçersiz puan'],
    ['segment', 'bilinmeyen segment'], ['metin', 'boş metin']]) {
    assert.deepEqual(oku(degistirilmisSatir(sorunlar)).nedenler, { [neden]: 1 });
    if (neden === 'geçersiz tarih') sorunlar.tarih = '2026-10-09';
    else delete sorunlar[alan];
  }
});

test('K45/K31: bugün parametredir; bugünün GB-0057 türevi kabul edilir, yarınki atlanır', () => {
  const csv = [baslik, degistirilmisSatir({ tarih: '2026-10-08' })].join('\n');
  assert.equal(dogrula(csv, '2026-10-08').atlanan, 0);
  assert.deepEqual(dogrula(csv, '2026-10-07').nedenler, { 'ileri tarih': 1 });
  assert.throws(() => dogrula(csv), TypeError);
  assert.throws(() => dogrula(csv, '2026-02-30'), TypeError);
});

test('K10/K23: GB-0030 aynı id ile üç kez gelirse ilki tutulur', () => {
  const satir = ornekSatir('GB-0030');
  const sonuc = oku(satir, satir, satir);
  assert.equal(sonuc.okunan, 3);
  assert.equal(sonuc.kayitlar.length, 1);
  assert.deepEqual(sonuc.nedenler, { tekrar: 2 });
});

test('K10: GB-0011/GB-0150 farklı id aynı içerik; ilk gelen tutulur', () => {
  for (const ids of [['GB-0011', 'GB-0150'], ['GB-0150', 'GB-0011']]) {
    const sonuc = dogrula(fixture(...ids), bugun);
    assert.deepEqual(sonuc.nedenler, { tekrar: 1 });
    assert.equal(sonuc.kayitlar[0].id, ids[0]);
  }
});

test('K34: GB-0030 çelişkisi KK-29 (b)/(c) sırasından bağımsızdır; bütün kopyalar atlanır', () => {
  const asil = ornekSatir('GB-0030');
  const farkli = asil.replace(',1,duzenli', ',4,duzenli');
  const b = oku(asil, farkli, ornekSatir('GB-0133'));
  const c = oku(farkli, asil, ornekSatir('GB-0133'));
  assert.deepEqual(b, c);
  assert.deepEqual(b.nedenler, { 'çelişkili id': 2 });
  assert.deepEqual(oku(asil, asil, farkli).nedenler, { 'çelişkili id': 3 });
});

test('K34: GB-0057 id dışındaki her alanın değişmesi çelişkidir', () => {
  for (const [alan, deger] of Object.entries({ tarih: '2026-10-03', kanal: 'destek',
    metin: 'Bildirim yine gecikti 😡 ', puan: '2', segment: 'duzenli' })) {
    assert.deepEqual(oku(ornekSatir('GB-0057'), degistirilmisSatir({ [alan]: deger })).nedenler,
      { 'çelişkili id': 2 }, alan);
  }
});

test('K34: çelişkili GB-0011 çıkarılınca bağımsız GB-0150 tekrar diye atlanmaz', () => {
  const sonuc = oku(ornekSatir('GB-0011'), ornekSatir('GB-0150'),
    ornekSatir('GB-0011').replace(',2,yeni', ',3,yeni'));
  assert.deepEqual(sonuc.nedenler, { 'çelişkili id': 2 });
  assert.equal(sonuc.kayitlar[0].id, 'GB-0150');
});

test('K11: bozuk GB-0057 kopyası geçerli id grubunu etkilemez', () => {
  const sonuc = oku(ornekSatir('GB-0057'), degistirilmisSatir({ puan: '0' }));
  assert.deepEqual(sonuc.nedenler, { 'geçersiz puan': 1 });
  assert.equal(sonuc.kayitlar.length, 1);
});

test('K49/K23: metinde satır sonu iki bozuk fiziksel satırdır; boş iç satır da sayılır', () => {
  const sonuc = oku('GB-0900,2026-10-04,magaza,"ilk\nikinci",1,yeni', '', ornekSatir('GB-0057'));
  assert.equal(sonuc.okunan, 4);
  assert.deepEqual(sonuc.nedenler, { 'eksik alan': 3 });
  assert.equal(sonuc.kayitlar[0].id, 'GB-0057');
});

test('K24: yalnız GB-0140 veya yalnız başlık kullanılabilir satır üretmez', () => {
  const sonuc = dogrula(fixture('GB-0140'), bugun);
  assert.equal(sonuc.durum, 'bos');
  assert.equal(sonuc.okunan, 1);
  assert.equal(sonuc.atlanan, 1);
  assert.deepEqual(sonuc.nedenler, { 'boş metin': 1 });
  assert.equal(dogrula(`${baslik}\n`, bugun).durum, 'bos');
});

test('K10/K45: çağrılar dosya birleştirmez; aynı girdi aynı sonucu üretir', () => {
  const csv = fixture('GB-0011', 'GB-0150');
  const ilk = dogrula(csv, bugun);
  ilk.kayitlar[0].metin = 'değiştirildi';
  assert.equal(dogrula(csv, bugun).kayitlar[0].metin, 'her açılışta yeniden giriş istiyor.');
  assert.equal(dogrula(fixture('GB-0150'), bugun).atlanan, 0);
});
