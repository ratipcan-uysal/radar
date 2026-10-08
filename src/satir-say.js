// CSV metnindeki kayıt sayısı (başlık hariç). Tırnak içindeki satır sonları ayrı satır sayılmaz; boş satırlar sayılmaz.
export function satirSay(metin) {
  const govde = metin.replace(/^﻿/, '');
  let kayit = 0;
  let tirnakta = false;
  let doluSatir = false;
  for (const harf of govde) {
    if (harf === '"') {
      tirnakta = !tirnakta;
      doluSatir = true;
    } else if ((harf === '\n' || harf === '\r') && !tirnakta) {
      if (doluSatir) kayit++;
      doluSatir = false;
    } else if (harf !== ' ' && harf !== '\t') {
      doluSatir = true;
    }
  }
  if (doluSatir) kayit++;
  return Math.max(0, kayit - 1);
}
