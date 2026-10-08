Rapor adımı tamamlandı. İndirme düğmesi geçerli analizden sonra etkinleşiyor ve Markdown dosyasını Blob ile ağ isteği olmadan indiriyor. Commit atılmadı.

Yazılan ve değiştirilen dosyalar:

- Yeni: [src/rapor.js](/Users/ratipcanuysal/claude_lecture/masterclass/radar/src/rapor.js)
- Yeni: [tests/rapor.test.js](/Users/ratipcanuysal/claude_lecture/masterclass/radar/tests/rapor.test.js)
- Değişti: [src/uygulama.js](/Users/ratipcanuysal/claude_lecture/masterclass/radar/src/uygulama.js)
- Değişti: [tests/uygulama.test.js](/Users/ratipcanuysal/claude_lecture/masterclass/radar/tests/uygulama.test.js)

`npm test` son satırları:

```text
ℹ tests 122
ℹ suites 0
ℹ pass 122
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 224.109333
```

Örnek dosyanın raporunun ilk 25 satırı:

```markdown
# Radar raporu: 2026-10-05
Kapsam: 2026-08-24 - 2026-10-05, 148 kayıt, kanal dağılımı: destek 51, mağaza 51, anket 46

## Geç ya da hiç gelmeyen bildirim

Puan 229,5, temel puan 128,0, 29 kayıt, ortalama puan 1,6

> Telefonu yeniden başlatınca birikmiş bildirimler birden geldi. — 2026-10-05 / magaza / GB-0088

> Bildirim yine gecikti 😡 — 2026-10-04 / magaza / GB-0057

> Onay bildirimi rezervasyon saatinden sonra geldi. — 2026-10-03 / magaza / GB-0006

## İptal ücreti ve politikası

Puan 192,0, temel puan 140,0, 35 kayıt, ortalama puan 2,0

> iptal ücretinin iadesi için üç kez yazdım. — 2026-10-05 / anket / GB-0077

> Iptal butonuna basinca uyari cikmadi, sonra kartimdan para cekildi. Lutfen duzeltin. — 2026-10-05 / magaza / GB-0146

> Uygulama "harika" ama iptal ücreti, bildirimler, ödeme... hepsi sorun — 2026-10-03 / magaza / GB-0105

## Ödeme hatası

```