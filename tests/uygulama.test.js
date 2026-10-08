import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { analizEtAlintili } from '../src/analiz.js';
import { sozlukHazirla } from '../src/sozluk.js';
import { panoCiz } from '../src/pano.js';
import { raporMetni, dosyaAdi } from '../src/rapor.js';
import { eleman } from './sahte-dom.js';
import { fixture, ornekCsv } from './yardimci.js';

const kaynak = readFileSync(new URL('../src/uygulama.js', import.meta.url), 'utf8');

// Küçük DOM taklidi yalnız kullanılan textContent/append davranışını modeller.
const sozlukMetni = readFileSync(new URL('../data/temalar.json', import.meta.url), 'utf8');
const sozlukYaniti = async () => ({ ok: true, text: async () => sozlukMetni });
const tekKayit = 'Okunan: 1 kayıt, atlanan: 0 kayıtKapsam: 2026-09-02 - 2026-09-02, 1 kayıt, kanal dağılımı: destek 1, mağaza 0, anket 0'
  + '1. Giriş ve hesap sorunuPuan 6,0, temel puan 3,0, 1 kayıt, ortalama puan 3,0Alıntılar (1)';
// GB-0139 tek başına: sayımlar, tek tema ve "Alıntılar (1)" başlığı; alıntı satırı ortada kalır.
const tekPano = metin => metin.startsWith(tekKayit) && metin.includes('GB-0139: ')
  && metin.endsWith('Övgü: 0 kayıtDiğer: 0 kayıt');

function ekran(fetchTaklidi = sozlukYaniti) {
  const durum = eleman();
  const pano = eleman();
  let degisim;
  let indir;
  const indirmeler = [];
  const bloblar = [];
  const kaldirilanlar = [];
  const raporIndir = { disabled: true, addEventListener(tur, fn) { assert.equal(tur, 'click'); indir = fn; } };
  const girdi = { files: [], addEventListener(tur, fn) { assert.equal(tur, 'change'); degisim = fn; } };
  const document = {
    getElementById(id) { return { dosya: girdi, durum, pano, 'rapor-indir': raporIndir }[id]; },
    body: { append() {} },
    createElement(tur) {
      if (tur !== 'a') return eleman();
      return { click() { indirmeler.push({ href: this.href, download: this.download }); }, remove() {} };
    },
  };
  class SabitTarih extends Date {
    constructor() { super(2026, 9, 8, 12); }
  }
  runInNewContext(kaynak.replace(/^import .*;\n/gm, ''), {
    document, analizEtAlintili, sozlukHazirla, panoCiz, raporMetni, dosyaAdi,
    fetch: fetchTaklidi, Date: SabitTarih, Blob,
    URL: { createObjectURL(blob) { bloblar.push(blob); return 'blob:rapor'; },
      revokeObjectURL(adres) { kaldirilanlar.push(adres); } },
    setTimeout(fn) { fn(); },
  });
  return {
    durum, pano, raporIndir, indirmeler, bloblar, kaldirilanlar, indir: () => indir(),
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
  const metin = ui.pano.textContent;
  assert.ok(metin.startsWith('Okunan: 150 kayıt, atlanan: 2 kayıtboş metin: 1tekrar: 1Kapsam: '));
  assert.ok(metin.endsWith('Övgü: 27 kayıtDiğer: 0 kayıt'));
  const baslik = (sira, ad, puan, kayit, ortalama) =>
    new RegExp(`${sira}\\. ${ad}Puan ${puan}, temel puan \\d+,\\d, ${kayit} kayıt, ortalama puan ${ortalama}Alıntılar`);
  assert.match(metin, baslik(1, 'Geç ya da hiç gelmeyen bildirim', '229,5', 29, '1,6'));
  assert.match(metin, baslik(2, 'İptal ücreti ve politikası', '192,0', 35, '2,0'));
  assert.match(metin, baslik(3, 'Ödeme hatası', '113,3', 21, '2,0'));
  assert.match(metin, baslik(7, 'Sadakat puanı kaybı', '6,0', 2, '3,0'));
  assert.doesNotMatch(metin, /0532|987 65|kişi/);
  assert.doesNotMatch(kaynak, /innerHTML|toISOString/);
});

test('rapor: düğme analiz tamamlanınca açılır; Blob doğru ad ve içerikle ağ isteği olmadan iner', async () => {
  let istek = 0;
  const ui = ekran(async () => { istek++; return sozlukYaniti(); });
  assert.equal(ui.raporIndir.disabled, true);
  ui.indir();
  assert.equal(ui.indirmeler.length, 0);
  await ui.yukle(ornekCsv);
  assert.equal(ui.raporIndir.disabled, false);
  ui.indir();
  assert.equal(istek, 1);
  assert.deepEqual(ui.indirmeler, [{ href: 'blob:rapor', download: 'radar-raporu-2026-10-05.md' }]);
  assert.equal(ui.bloblar[0].type, 'text/markdown;charset=utf-8');
  assert.equal(await ui.bloblar[0].text(), raporMetni(analizEtAlintili(ornekCsv, sozlukHazirla(sozlukMetni), '2026-10-08')));
  assert.deepEqual(ui.kaldirilanlar, ['blob:rapor']);
});

test('rapor: yeni seçim, ret, boş sonuç ve okuma hatası eski raporu indirtmez', async () => {
  const ui = ekran();
  for (const metin of [null, 'ad,telefon\nx,y', fixture('GB-0140'), async () => { throw new Error('okuma hatası'); }]) {
    await ui.yukle(ornekCsv);
    const yukleme = ui.yukle(metin);
    assert.equal(ui.raporIndir.disabled, true);
    await yukleme;
    assert.equal(ui.raporIndir.disabled, true);
    ui.indir();
  }
  assert.equal(ui.indirmeler.length, 0);
});

test('pano: ardışık dosyalar birleşmez; ret ve seçim iptali eski panoyu temizler', async () => {
  const ui = ekran();
  await ui.yukle(fixture('GB-0011', 'GB-0150'));
  assert.match(ui.pano.textContent, /tekrar: 1/);
  await ui.yukle(fixture('GB-0139'));
  assert.ok(tekPano(ui.pano.textContent));
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
  assert.ok(tekPano(ui.pano.textContent));
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
