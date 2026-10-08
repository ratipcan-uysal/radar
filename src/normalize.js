const HARITA = {
  'İ': 'i', 'I': 'i', 'ı': 'i', 'î': 'i', 'Î': 'i',
  'Ş': 's', 'ş': 's', 'Ğ': 'g', 'ğ': 'g', 'Ü': 'u', 'ü': 'u', 'û': 'u', 'Û': 'u',
  'Ö': 'o', 'ö': 'o', 'Ç': 'c', 'ç': 'c', 'â': 'a', 'Â': 'a',
};

// Türkçe harfleri elle çevirir; yerel ayara bağlı küçültme kullanılmaz, sonuç her tarayıcıda aynıdır.
// Baştaki ve sondaki boşluk korunur: " tl" gibi kurallar kelime sınırı için ona dayanır.
export function normalize(metin) {
  let sonuc = '';
  for (const harf of String(metin).normalize('NFC')) sonuc += HARITA[harf] ?? harf;
  return sonuc.toLowerCase().replace(/\s+/g, ' ');
}
