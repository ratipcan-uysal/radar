// Takvim doğrulaması saat dilimine ve sistem saatine bağlı değildir.
export function tarihGecerli(tarih) {
  if (typeof tarih !== 'string' || !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(tarih)) return false;
  const [yil, ay, gun] = tarih.split('-').map(Number);
  if (yil < 1 || ay < 1 || ay > 12 || gun < 1) return false;
  const artik = yil % 4 === 0 && (yil % 100 !== 0 || yil % 400 === 0);
  const gunler = [31, artik ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return gun <= gunler[ay - 1];
}
