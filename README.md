# Radar

Geri bildirim CSV'sini tarayıcıda okuyup tema panosu çıkaran tek sayfalık araç. Veri tarayıcıdan dışarı gitmez; arka uç ve dış bağımlılık yoktur.

## Sayfayı açmak

Proje klasöründe yerel bir sunucu başlatın:

```
python3 -m http.server
```

Sonra tarayıcıda http://localhost:8000 adresini açın.

`index.html` dosyasına çift tıklayıp `file://` ile açmak desteklenmez (K47).

## Testler

```
npm test
```

Node 18 ve üstü gerekir. Bağımlılık kurmak gerekmez.
