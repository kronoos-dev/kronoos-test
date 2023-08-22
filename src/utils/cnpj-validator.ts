export const cnpjValidator = (cnpj: string = ""): boolean => {
  if (!cnpj || cnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  const digits: number[] = cnpj.split("").map(Number);

  let sum: number = 0;
  let factor: number = 5;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }
  let remainder: number = sum % 11;
  const firstDigit: number = remainder < 2 ? 0 : 11 - remainder;

  sum = 0;
  factor = 6;
  for (let i = 0; i < 13; i++) {
    sum += digits[i] * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }
  remainder = sum % 11;
  const secondDigit: number = remainder < 2 ? 0 : 11 - remainder;

  return digits[12] === firstDigit && digits[13] === secondDigit;
};
