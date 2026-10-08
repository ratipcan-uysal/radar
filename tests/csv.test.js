import { test } from 'node:test';
import assert from 'node:assert/strict';
import { csvAyristir } from '../src/csv.js';
import { fixture, ornekSatir, baslik } from './yardimci.js';

test('GB-0105: virgüller ve kaçışlı çift tırnaklar tek metin olarak okunur', () => {
  const [, satir] = csvAyristir(fixture('GB-0105'));
  assert.equal(satir.bozuk, false);
  assert.equal(satir.alanlar.length, 6);
  assert.equal(satir.alanlar[3], 'Uygulama "harika" ama iptal ücreti, bildirimler, ödeme... hepsi sorun');
});

test('GB-0057 ve GB-0119: emoji ve Türkçe harfler korunur', () => {
  const [, ilk, ikinci] = csvAyristir(fixture('GB-0057', 'GB-0119'));
  assert.equal(ilk.alanlar[3], 'Bildirim yine gecikti 😡');
  assert.equal(ikinci.alanlar[3], 'rezervasyon değiştirmek çok kolay. 👏');
});

test('GB-0140: boş metin alanı sütun sayısını değiştirmez', () => {
  const [, satir] = csvAyristir(fixture('GB-0140'));
  assert.equal(satir.alanlar.length, 6);
  assert.equal(satir.alanlar[3], '');
});

test('GB-0105: BOM, CRLF/LF ve son satır sonunun varlığı sonucu değiştirmez', () => {
  const metin = fixture('GB-0105');
  const beklenen = csvAyristir(metin);
  for (const son of ['', '\n']) {
    assert.deepEqual(csvAyristir(`\uFEFF${metin}${son}`), beklenen);
    assert.deepEqual(csvAyristir(`\uFEFF${metin.replaceAll('\n', '\r\n')}${son ? '\r\n' : ''}`), beklenen);
  }
});

test('K49: kapanmamış tırnak sonraki GB-0057 satırını yutmaz', () => {
  const satirlar = csvAyristir(`${baslik}\nGB-0900,2026-10-01,destek,"açık\n${ornekSatir('GB-0057')}`);
  assert.equal(satirlar.length, 3);
  assert.equal(satirlar[1].bozuk, true);
  assert.equal(satirlar[2].bozuk, false);
  assert.equal(satirlar[2].alanlar[0], 'GB-0057');
});

test('K49: alan ortasındaki tırnak ve kapanıştan sonraki metin bozuktur', () => {
  assert.equal(csvAyristir('a"b,c')[0].bozuk, true);
  assert.equal(csvAyristir('"a"b,c')[0].bozuk, true);
  assert.equal(csvAyristir('"a",c')[0].bozuk, false);
});
