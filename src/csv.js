// K49: Her fiziksel satır bağımsızdır; tırnak içinde satır sonu desteklenmez.
// Bozuk satırlar sonraki satırın ayrıştırılmasını etkilemez.
export function csvAyristir(metin) {
  const satirlar = metin.replace(/^\uFEFF/, '').split(/\r\n|\n|\r/);
  if (satirlar.at(-1) === '') satirlar.pop();
  return satirlar.map(satirAyristir);
}

function satirAyristir(ham) {
  const alanlar = [];
  let alan = '';
  let durum = 'bas';
  let bozuk = false;
  for (let i = 0; i < ham.length; i++) {
    const harf = ham[i];
    if (durum === 'tirnak') {
      if (harf !== '"') alan += harf;
      else if (ham[i + 1] === '"') {
        alan += '"';
        i++;
      } else durum = 'kapali';
    } else if (harf === ',') {
      alanlar.push(alan);
      alan = '';
      durum = 'bas';
    } else if (harf === '"' && durum === 'bas') {
      durum = 'tirnak';
    } else {
      if (harf === '"' || durum === 'kapali') bozuk = true;
      alan += harf;
      durum = 'duz';
    }
  }
  alanlar.push(alan);
  return { ham, alanlar, bozuk: bozuk || durum === 'tirnak' };
}
