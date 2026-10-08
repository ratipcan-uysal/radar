import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { sozlukHazirla } from '../src/sozluk.js';
import { kayitTemalari, temaEsle } from '../src/tema.js';
import { dogrula } from '../src/dogrula.js';
import { ornekCsv } from './yardimci.js';

// Beklenen listeler docs/karsilastirma/11-claude-sozluk.md'deki "Tam listeler"den alındı (K52).
const yol = new URL('../data/temalar.json', import.meta.url);
const atla = !existsSync(yol) && 'data/temalar.json yok (onaylı sözlük gelmedi)';

const BEKLENEN = {
  'İptal ücreti ve politikası': '0005 0007 0013 0021 0030 0034 0041 0048 0052 0058 0064 0075 0077 0084 0093 0094 0096 0098 0100 0103 0105 0106 0117 0123 0128 0129 0130 0131 0132 0133 0135 0137 0141 0146 0149',
  'Geç ya da hiç gelmeyen bildirim': '0003 0006 0009 0020 0024 0031 0040 0045 0051 0053 0056 0057 0059 0061 0065 0070 0071 0080 0083 0085 0088 0089 0095 0101 0105 0111 0142 0143 0144',
  'Ödeme hatası': '0001 0008 0010 0015 0026 0028 0042 0055 0068 0076 0082 0086 0092 0102 0105 0107 0112 0120 0121 0124 0127',
  'Giriş ve hesap sorunu': '0011 0046 0050 0066 0069 0081 0099 0108 0109 0139 0150',
  'Sadakat puanı kaybı': '0017 0047',
  'Yanlış ya da eski restoran bilgisi': '0004 0012 0022 0043 0060 0072 0078 0104 0110 0126 0136 0147',
  'Masa ve oturma yeri seçimi': '0018 0027 0035 0038 0067 0073 0097 0113 0114 0118 0122 0134 0138 0148',
};
const OVGU = '0002 0014 0016 0019 0023 0025 0029 0032 0033 0036 0037 0039 0044 0049 0054 0062 0063 0074 0079 0087 0090 0091 0115 0116 0119 0125 0145';

const idler = liste => liste.split(' ').map(no => `GB-${no}`);
// GB-0150, GB-0011'in birebir tekrarıdır; dogrula atar (K10/K23), panoda 10 görünür.
const kayitlar = () => dogrula(ornekCsv, '2026-10-08').kayitlar;
const sozluk = () => sozlukHazirla(readFileSync(yol, 'utf8'));
const idleri = grup => grup.kayitlar.map(k => k.id).sort();

test('örnek dosya: her temanın kayıtları tam listeyle aynıdır', { skip: atla }, () => {
  const sonuc = temaEsle(kayitlar(), sozluk());
  for (const tema of sonuc.temalar) {
    const beklenen = idler(BEKLENEN[tema.ad]).filter(id => id !== 'GB-0150').sort();
    assert.deepEqual(idleri(tema), beklenen, tema.ad);
  }
  assert.equal(sonuc.temalar.length, Object.keys(BEKLENEN).length);
});

test('örnek dosya: kayıt sayıları 35/29/21/10/2/12/14, övgü 27, diğer 0', { skip: atla }, () => {
  const sonuc = temaEsle(kayitlar(), sozluk());
  assert.deepEqual(sonuc.temalar.map(t => t.kayitlar.length), [35, 29, 21, 10, 2, 12, 14]);
  assert.deepEqual(idleri(sonuc.ovgu), idler(OVGU).sort());
  assert.equal(sonuc.diger.kayitlar.length, 0);
});

test('örnek dosya: her kaydın tema kümesi listelerden çıkanla aynıdır; yalnız GB-0105 üç temada', { skip: atla }, () => {
  const s = sozluk();
  const sayac = [];
  for (const kayit of kayitlar()) {
    const beklenen = Object.keys(BEKLENEN).filter(ad => idler(BEKLENEN[ad]).includes(kayit.id));
    const { temalar, ovgu } = kayitTemalari(kayit.metin, s);
    assert.deepEqual(temalar, beklenen, kayit.id);
    assert.equal(ovgu, idler(OVGU).includes(kayit.id), `${kayit.id} övgü`);
    if (temalar.length > 1) sayac.push(kayit.id);
  }
  assert.deepEqual(sayac, ['GB-0105']);
});

test('KK-07: GB-0105 üç temada, "diğer"de değil', { skip: atla }, () => {
  const sonuc = temaEsle(kayitlar(), sozluk());
  const girilen = sonuc.temalar.filter(t => t.kayitlar.some(k => k.id === 'GB-0105')).map(t => t.ad);
  assert.deepEqual(girilen, ['İptal ücreti ve politikası', 'Geç ya da hiç gelmeyen bildirim', 'Ödeme hatası']);
});

test('KK-10: GB-0013, GB-0100 ve GB-0034 aynı temada; GB-0100 ile GB-0077 aynı kümede', { skip: atla }, () => {
  const s = sozluk();
  const tema = id => kayitTemalari(kayitlar().find(k => k.id === id).metin, s).temalar;
  for (const id of ['GB-0013', 'GB-0100', 'GB-0034']) assert.ok(tema(id).includes('İptal ücreti ve politikası'), id);
  assert.deepEqual(tema('GB-0100'), tema('GB-0077'));
});

test('K39/KK-39: GB-0020 ve GB-0070 bildirim temasında, iptalde değil; GB-0094 ve GB-0146 iptalde, ödemede değil', { skip: atla }, () => {
  const s = sozluk();
  const tema = id => kayitTemalari(kayitlar().find(k => k.id === id).metin, s).temalar;
  for (const id of ['GB-0020', 'GB-0070']) assert.deepEqual(tema(id), ['Geç ya da hiç gelmeyen bildirim']);
  for (const id of ['GB-0094', 'GB-0146']) assert.deepEqual(tema(id), ['İptal ücreti ve politikası']);
});

test('KK-41: GB-0033, GB-0063 ve GB-0090 övgüdedir, sadakat temasında değil', { skip: atla }, () => {
  const sonuc = temaEsle(kayitlar(), sozluk());
  const ovgu = idleri(sonuc.ovgu);
  const sadakat = idleri(sonuc.temalar.find(t => t.ad === 'Sadakat puanı kaybı'));
  for (const id of ['GB-0033', 'GB-0063', 'GB-0090']) {
    assert.ok(ovgu.includes(id), id);
    assert.ok(!sadakat.includes(id), id);
  }
});
