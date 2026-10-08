import { bicim } from './bicim.js';

const KANAL_ADI = { destek: 'destek', magaza: 'mağaza', anket: 'anket' };
const kesir = ({ pay, payda }) => bicim(pay, payda);

function raporlanabilir(sonuc) {
  if (sonuc.durum !== 'tamam') throw new TypeError('Rapor için kullanılabilir kayıt gerekir.');
}

export function dosyaAdi(sonuc) {
  raporlanabilir(sonuc);
  return `radar-raporu-${sonuc.kapsam.son}.md`;
}

// Sonuc yalnız maskeli alıntı taşır; K50 kaçışı yalnız raporda uygulanır.
export function raporMetni(sonuc) {
  raporlanabilir(sonuc);
  const { ilk, son, kayit, kanallar } = sonuc.kapsam;
  const dagilim = Object.entries(kanallar).map(([kanal, sayi]) => `${KANAL_ADI[kanal]} ${sayi}`).join(', ');
  const satirlar = [
    `# Radar raporu: ${son}`,
    `Kapsam: ${ilk} - ${son}, ${kayit} kayıt, kanal dağılımı: ${dagilim}`,
  ];
  for (const tema of sonuc.temalar.slice(0, 5)) {
    satirlar.push('', `## ${tema.ad}`, '',
      `Puan ${kesir(tema.puan)}, temel puan ${kesir(tema.temelPuan)}, ${tema.kayit} kayıt, ortalama puan ${kesir(tema.ortalama)}`);
    for (const alinti of tema.alintilar.slice(0, 3)) {
      const metin = alinti.metin.replaceAll('\\', '\\\\').replaceAll('*', '\\*')
        .replace(/\r\n|\r|\n/g, '\n> ');
      satirlar.push('', `> ${metin} — ${alinti.tarih} / ${alinti.kanal} / ${alinti.id}`);
    }
  }
  return `${satirlar.join('\n')}\n`;
}
