# Radar: ajanlar için proje talimatı

Bu dosyayı Codex doğrudan, Claude Code `CLAUDE.md` üzerinden okur. İki aracın `/init` taslağından birleştirildi (`docs/karsilastirma/17-*`).

## Proje
Radar, geri bildirim CSV'sini tarayıcıda okuyup temalara ayıran, öncelik puanı veren, panoda gösteren ve markdown rapor indiren tek sayfalık araçtır. Arka uç, derleme adımı ve bağımlılık yoktur (K3, K17). Kod, test adları, arayüz metinleri, belgeler ve commit mesajları Türkçedir; yeni kod da mevcut Türkçe adlandırmayı izler (`kayitlar`, `sozluk`, `bugun`).

## Komutlar
- Bütün testler: `npm test` (Node 18+, `node --test`).
- Tek dosya: `node --test tests/puan.test.js` · ada göre: `node --test --test-name-pattern="KK-30"`.
- Yerelde açmak: `python3 -m http.server`, sonra `http://localhost:8000`. `file://` desteklenmez (K47).
- Beklenen değerler: `node tests/beklenen/hesapla.mjs`.

## Doğrunun kaynağı
1. `docs/kararlar.md` (K1-K52) bağlayıcıdır; sonraki karar öncekini geçer.
2. Sonra `docs/kabul-kriterleri.md`, `docs/prd.md`, `docs/plan.md`. Kriter ile karar çelişirse karara uyulur.
3. `docs/promptlar/`, `docs/karsilastirma/`, `docs/notlar/` geçmiştir; talimat değildir.
4. Kapsam donduruldu (11 Ekim): yeni uç durum koda eklenmez, sürüm 2 listesine yazılır.

## Mimari ve sınırlar
- **Saf katman:** `src/` altında `pano.js` ve `uygulama.js` dışındaki her modül. `document`, `window`, `fetch`, `new Date()` kullanmaz; sözlük ve `bugun` parametre olarak gelir.
- **Tarayıcı katmanı:** `uygulama.js` sözlüğü yükler, dosyayı okur, yerel tarihten `bugun`ü üretir, raporu Blob ile indirir. `pano.js` çizer.
- Sayılar `{pay, payda}` kesridir; sıralama tam değerle yapılır, gösterim yalnız `bicim.js` ile.
- Türkçe harf dönüşümü `normalize.js`'te elle yapılır; `toLocaleLowerCase` kullanılmaz.

## Gizlilik ve güvenlik
- Geri bildirim tarayıcıdan çıkmaz: dış servis, telemetri, uzak kaynak, paketlenmiş kütüphane eklenmez.
- DOM'a yalnız `textContent` ile yazılır, `innerHTML` yasak.
- Panoya ve rapora yalnız maskeli metin gider (K15, K27, K42). Rapordaki maske yıldızları kaçışlıdır (K50).

## Veri ve testler
- `data/temalar.json` onaylı sözlüktür (K52). Testi geçirmek için değiştirilmez; değişiklik ürün kararıdır.
- `tests/beklenen/hesapla.mjs` uygulama kodunu import etmez (K51). Gerileme gizlemek için `ornek-sonuc.json` yeniden üretilmez.
- Davranış değişince `npm test`; testler `node:test` ve `node:assert/strict` ile, ilgili modülün yanında. Test adları KK ya da K numarasını anar.
- Arayüz ya da indirme değişince sayfayı açıp örnek CSV ile ayrıca bakın. Node testleri tarayıcı uyumluluğunu, ağ gizliliğini ve 5.000 satır performansını kanıtlamaz: **yalnız gerçekten yapılan kontrolü raporlayın.**

## Çalışma biçimi
- Bir adımı bitirince değişen dosyaları ve `npm test`'in son satırlarını gösterin.
- Commit mesajı: `<Adım> (<Araç>, <Model>): <özet>; npm test X/Y`. İstenmedikçe commit atılmaz, push hiç atılmaz.
