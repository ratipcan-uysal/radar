# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proje

Radar, geri bildirim CSV'sini tarayıcıda okuyup tema panosu ve indirilebilir markdown rapor üreten tek sayfalık araç. Arka uç yok, derleme adımı yok, bağımlılık yok (K3, K17). Kod, yorumlar, test adları, commit mesajları ve belgeler Türkçe; yeni kod da Türkçe adlandırılır (`kayitlar`, `sozluk`, `bugun`…).

## Komutlar

```
npm test                                   # node --test, Node 18+; kurulum gerekmez
node --test tests/puan.test.js             # tek dosya
node --test --test-name-pattern="KK-30"    # ada göre tek test
python3 -m http.server                     # sayfayı http://localhost:8000 üzerinden aç
node tests/beklenen/hesapla.mjs            # beklenen değerleri yeniden üretir (bkz. aşağı)
```

`file://` ile açmak desteklenmez: ES modülleri ve `fetch('data/temalar.json')` engellenir (K47).

## Mimari

İki katman var; sınır `docs/plan.md` §2'de çizili:

- **Saf katman** (`src/` altında `pano.js` ve `uygulama.js` dışındaki her şey): `document`, `window`, `fetch`, `new Date()` kullanmaz. Sözlük ve `bugun` (`YYYY-AA-GG`) parametre olarak gelir, böylece Node'da test edilir.
  Akış: `analizEt(csvMetni, sozluk, bugun)` = `dogrula` (csv + tarih) → `temaEsle` → `puanHesapla`. `analizEtAlintili` buna tema başına en yeni 3 maskeli alıntıyı (`alinti.js` + `maske.js`) ekler; pano ve rapor bunu kullanır.
- **Tarayıcı katmanı**: `uygulama.js` sözlüğü fetch eder, dosyayı okur, yerel saatten `bugun`ü üretir (`toISOString` değil), Blob ile raporu indirir. `pano.js` `panoCiz(kap, sonuc, belge)` ile çizer; belge parametre olduğu için testlerde `tests/sahte-dom.js` verilir. `tests/uygulama.test.js`, `uygulama.js`'i `node:vm` içinde sahte DOM/fetch ile çalıştırır.

Bozulmaması gereken sözleşmeler:

- **Ham metin Sonuc'a girmez.** Panoya ve rapora yalnız maskeli alıntı gider (telefon K15/K27, e-posta `a***@***` K42). DOM'a yalnız `textContent` ile yazılır, `innerHTML` yok.
- **Sayılar kesir olarak taşınır** (`{pay, payda}`). Puan = (6n − toplam)(n + yeni) / n; sıralama `BigInt` çapraz çarpımla (puan ↓, kayıt ↓, `localeCompare(…, 'tr')`). Gösterim yalnız `bicim.js` ile (virgül, bir ondalık, yarım yukarı); pano ve rapor aynı fonksiyonu kullanır.
- **Türkçe normalizasyon elle yapılır** (`normalize.js`), `toLocaleLowerCase('tr')` kullanılmaz.
- **Doğrulama**: başlık birebir `id,tarih,kanal,metin,puan,segment` olmalı (BOM atılır), değilse dosya reddedilir ve içerik yankılanmaz. Her bozuk satıra tek neden verilir, sıra ve ifadeler K44/K49'daki gibi. Metin içinde satır sonu desteklenmez.
- **Sözlük şeması** (K48): `{ surum, temalar: [{ ad, kurallar: [[kelime, …], …] }], ovgu: { kurallar } }`. Kural içi VE, kurallar arası VEYA. Kayıt birden çok temaya girebilir; övgü ve "diğer" puanlanmaz, sıralamaya girmez.
- **Rapor** (`rapor.js`): ilk 5 tema, `# Radar raporu: <en yeni tarih>` + kapsam satırı; alıntılarda maske yıldızları `\*` diye kaçırılır (yalnız raporda, panoda değil — K50).

## Veri ve testler

- `data/temalar.json` onaylı sözlüktür (K52); değiştirmek ürün kararıdır, PM onayı ister. Testlerin çoğu bunun yerine `tests/fixtures/test-sozluk.json` kullanır.
- Fixture'lar `tests/yardimci.js` ile örnek CSV'den GB id'siyle birebir kopyalanır (`fixture('GB-0013', …)`); sentetik satırlar için `degistirilmisSatir`.
- `tests/beklenen/hesapla.mjs` uygulamanın kodunu **import etmez**; kuralları bağımsız yeniden hesaplar (K51). `ornek-dosya.test.js` uygulamanın çıktısını onaylı `ornek-sonuc.json` ile karşılaştırır. Bu betiğe `src/`'den import eklemeyin.
- Test adları ilgili kabul kriterini ya da kararı anar (`KK-30`, `K51`).

## Belgeler

Davranış sorusunda kaynak sırası: `docs/kararlar.md` (K1–K52, bağlayıcı) > `docs/kabul-kriterleri.md` (KK-xx) > `docs/prd.md`. Kriterle karar çeliştiğinde karara uyulur; bilinen çelişkiler `docs/plan.md` §5'te. Kapsam donduruldu (11 Ekim): yeni uç durumlar sürüm 2 listesine yazılır, koda eklenmez.

`docs/promptlar/NN-*.md` her adımda araca verilen prompt, `docs/karsilastirma/NN-*.md` araçların çıktıları. Proje Claude Code ve Codex arasında adım adım ilerliyor; commit mesajı biçimi: `<Adım> (<Araç>, <Model>): <özet>; npm test X/Y`. Prompt aksini söylemedikçe commit atılmaz.
