import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { dogrula } from '../src/dogrula.js';
import { sozlukHazirla } from '../src/sozluk.js';
import { temaEsle } from '../src/tema.js';
import { fixture, ornekCsv } from './yardimci.js';

const kaynak = readFileSync(new URL('../src/uygulama.js', import.meta.url), 'utf8');

// Küçük DOM taklidi yalnız kullanılan textContent/append davranışını modeller.
const sozlukMetni = readFileSync(new URL('../data/temalar.json', import.meta.url), 'utf8');
const sozlukYaniti = async () => ({ ok: true, text: async () => sozlukMetni });
const temaSatirlari = (sayilar, ovgu, diger) => {
  const adlar = JSON.parse(sozlukMetni).temalar.map(tema => tema.ad);
  return adlar.map((ad, i) => `${ad}: ${sayilar[i]}`).join('') + `Övgü: ${ovgu}Diğer: ${diger}`;
};

function ekran(fetchTaklidi = sozlukYaniti) {
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
  runInNewContext(kaynak.replace(/^import .*;\n/gm, ''), {
    document, dogrula, sozlukHazirla, temaEsle, fetch: fetchTaklidi, Date: SabitTarih,
  });
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
  assert.equal(ui.pano.textContent, 'Okunan: 150 kayıt, atlanan: 2 kayıtboş metin: 1tekrar: 1'
    + temaSatirlari([35, 29, 21, 10, 2, 12, 14], 27, 0));
  assert.doesNotMatch(ui.pano.textContent, /0532|987 65|GB-0084|GB-0120|kişi/);
  assert.doesNotMatch(kaynak, /innerHTML|toISOString/);
});

test('pano: ardışık dosyalar birleşmez; ret ve seçim iptali eski panoyu temizler', async () => {
  const ui = ekran();
  await ui.yukle(fixture('GB-0011', 'GB-0150'));
  assert.match(ui.pano.textContent, /tekrar: 1/);
  await ui.yukle(fixture('GB-0139'));
  assert.equal(ui.pano.textContent, 'Okunan: 1 kayıt, atlanan: 0 kayıt' + temaSatirlari([0, 0, 0, 1, 0, 0, 0], 0, 0));
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
  assert.equal(ui.pano.textContent, 'Okunan: 1 kayıt, atlanan: 0 kayıt' + temaSatirlari([0, 0, 0, 1, 0, 0, 0], 0, 0));
  assert.equal(ui.durum.textContent, 'Dosya okundu.');
});

test('pano: sözlük yüklenemezse ya da bozuksa anlaşılır hata görünür, pano boş kalır', async () => {
  for (const taklit of [
    async () => ({ ok: false, status: 404 }),
    async () => { throw new Error('ağ yok'); },
    async () => ({ ok: true, text: async () => '{' }),
  ]) {
    const ui = ekran(taklit);
    await ui.yukle(fixture('GB-0139'));
    assert.match(ui.durum.textContent, /^Tema sözlüğü/);
    assert.equal(ui.pano.textContent, '');
  }
});

test('pano: dosya okuma hatasında önceki sonuçlar temizlenir', async () => {
  const ui = ekran();
  await ui.yukle(fixture('GB-0139'));
  await ui.yukle(async () => { throw new Error('okuma hatası'); });
  assert.equal(ui.pano.textContent, '');
  assert.equal(ui.durum.textContent, 'Dosya okunamadı. CSV dosyasını yeniden seçin.');
});
