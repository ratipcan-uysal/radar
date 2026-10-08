// K25: Kesri ondalığa çevirmeden, bir ondalık basamağa yarım yukarı yuvarla.
export function bicim(pay, payda) {
  if (!Number.isSafeInteger(pay) || pay < 0 || !Number.isSafeInteger(payda) || payda <= 0) {
    throw new TypeError('Pay negatif olmayan, payda pozitif güvenli tam sayı olmalıdır.');
  }
  const ondaBir = (BigInt(pay) * 20n + BigInt(payda)) / (2n * BigInt(payda));
  return `${ondaBir / 10n},${ondaBir % 10n}`;
}
