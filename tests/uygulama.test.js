import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { dogrula } from '../src/dogrula.js';
import { fixture, ornekCsv } from './yardimci.js';

const kaynak = readFileSync(new URL('../src/uygulama.js', import.meta.url), 'utf8');

// Küçük DOM taklidi yalnız kullanılan textContent/append davranışını modeller.
function ekran() {
  function eleman() {
    let metin = '';
    let cocuklar = [];
    return {
      get textContent() { return metin + cocuklar.map(cocuk => cocuk.textContent).join(''); },
      set textContent(deger) { metin = deger; cocuklar = []; },
      append(cocuk) { cocuklar.push(cocuk); },
    };
  }
  const durum = eleman();
  const pano = eleman();
  let degisim;
  const girdi = { files: [], addEventListener(tur, fn) { assert.equal(tur, 'change'); degisim = fn; } };
  const document = {
    getElementById(id) { return { dosya: girdi, durum, pano }[id]; },
    createElement() { return eleman(); },
  };
  class SabitTarih extends Date {
    constructor() { super(2026, 9, 8, 12); }
  }
  runInNewContext(kaynak.replace(/^import .*;\n/, ''), { document, dogrula, Date: SabitTarih });
  return {
    durum, pano,
    yukle(metin) {
      girdi.files = metin === null ? [] : [{ text: typeof metin === 'function' ? metin : async () => metin }];
      return degisim();
    },
  };
}

test('pano: gerçek CSV sayımları ve K44 nedenleri textContent ile, ham alıntısız görünür', async () => {
  const ui = ekran();
  await ui.yukle(ornekCsv);
  assert.equal(ui.durum.textContent, 'Dosya okundu.');
  assert.equal(ui.pano.textContent, 'Okunan: 150 kayıt, atlanan: 2 kayıtboş metin: 1tekrar: 1');
  assert.doesNotMatch(ui.pano.textContent, /0532|987 65|GB-0084|GB-0120|kişi/);
  assert.doesNotMatch(kaynak, /innerHTML|toISOString/);
});

test('pano: ardışık dosyalar birleşmez; ret ve seçim iptali eski panoyu temizler', async () => {
  const ui = ekran();
  await ui.yukle(fixture('GB-0011', 'GB-0150'));
  assert.match(ui.pano.textContent, /tekrar: 1/);
  await ui.yukle(fixture('GB-0139'));
  assert.equal(ui.pano.textContent, 'Okunan: 1 kayıt, atlanan: 0 kayıt');
  await ui.yukle('ad,telefon\nTest Kişi,05000000000');
  assert.equal(ui.pano.textContent, '');
  assert.match(ui.durum.textContent, /Dosya reddedildi/);
  assert.doesNotMatch(ui.durum.textContent, /Test Kişi|05000000000/);
  await ui.yukle(null);
  assert.equal(ui.durum.textContent, 'Dosya seçin.');
  assert.equal(ui.pano.textContent, '');
});

test('pano: yalnız GB-0140 varsa kullanılabilir satır yok ve sayımlar görünür', async () => {
  const ui = ekran();
  await ui.yukle(fixture('GB-0140'));
  assert.equal(ui.durum.textContent, 'Kullanılabilir satır yok');
  assert.equal(ui.pano.textContent, 'Okunan: 1 kayıt, atlanan: 1 kayıtboş metin: 1');
});

test('pano: eski dosyanın geciken okuması yeni GB-0139 sonucunu değiştirmez', async () => {
  const ui = ekran();
  let tamamla;
  const eski = ui.yukle(() => new Promise(resolve => { tamamla = resolve; }));
  await ui.yukle(fixture('GB-0139'));
  tamamla(fixture('GB-0140'));
  await eski;
  assert.equal(ui.pano.textContent, 'Okunan: 1 kayıt, atlanan: 0 kayıt');
  assert.equal(ui.durum.textContent, 'Dosya okundu.');
});

test('pano: dosya okuma hatasında önceki sonuçlar temizlenir', async () => {
  const ui = ekran();
  await ui.yukle(fixture('GB-0139'));
  await ui.yukle(async () => { throw new Error('okuma hatası'); });
  assert.equal(ui.pano.textContent, '');
  assert.equal(ui.durum.textContent, 'Dosya okunamadı. CSV dosyasını yeniden seçin.');
});
