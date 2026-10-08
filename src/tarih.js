// Takvim doğrulaması saat dilimine ve sistem saatine bağlı değildir.
export function tarihGecerli(tarih) {
  if (typeof tarih !== 'string' || !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(tarih)) return false;
  const [yil, ay, gun] = tarih.split('-').map(Number);
  if (yil < 1 || ay < 1 || ay > 12 || gun < 1) return false;
  const artik = yil % 4 === 0 && (yil % 100 !== 0 || yil % 400 === 0);
  const gunler = [31, artik ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return gun <= gunler[ay - 1];
}

// K22: En yeni gün dahil 14 gün; saat diliminden bağımsız takvim aritmetiği.
export function pencereHesapla(kayitlar) {
  if (!kayitlar.length) return null;
  const son = kayitlar.reduce((son, kayit) => kayit.tarih > son ? kayit.tarih : son, '');
  let [yil, ay, gun] = son.split('-').map(Number);
  for (let i = 0; i < 13; i++) {
    gun--;
    if (gun === 0) {
      ay--;
      if (ay === 0) { yil--; ay = 12; }
      const artik = yil % 4 === 0 && (yil % 100 !== 0 || yil % 400 === 0);
      gun = [31, artik ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][ay - 1];
    }
  }
  return { bas: [String(yil).padStart(4, '0'), String(ay).padStart(2, '0'),
    String(gun).padStart(2, '0')].join('-'), son };
}
