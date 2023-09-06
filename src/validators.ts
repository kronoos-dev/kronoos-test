import { calculateInstallments } from './utils';

const invalidCpfCnpjList = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

export function validateCpfCnpj(value: string): boolean {
  value = value.replace(/\D/g, '');

  const isCnpj = value.length === 14;
  const isCpf = value.length === 11;

  if (!isCnpj && !isCpf) {
    return false;
  }

  if (invalidCpfCnpjList.some(item => item === value)) {
    return false;
  }

  if (isCpf) {
    const cpfArray = value.split('').map(Number);

    const calculateDigit = (j: number) => {
      const sum = cpfArray
        .slice(0, j)
        .reverse()
        .reduce((acc, digit, index) => acc + digit * (index + 2), 0);

      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const [firstDigit, secondDigit] = [9, 10].map(calculateDigit);

    if (cpfArray[9] !== firstDigit || cpfArray[10] !== secondDigit) {
      return false;
    }
  }

  if (isCnpj) {
    let v1 = 0;
    for (let i = 0, p = 5; i < 12; i++, p = p === 2 ? 9 : p - 1) {
      v1 += parseInt(value.charAt(i), 10) * p;
    }
    v1 = v1 % 11 < 2 ? 0 : 11 - (v1 % 11);

    if (parseInt(value.charAt(12), 10) !== v1) {
      return false;
    }

    let v2 = 0;
    for (let i = 0, p = 6; i < 13; i++, p = p === 2 ? 9 : p - 1) {
      v2 += parseInt(value.charAt(i), 10) * p;
    }
    v2 = v2 % 11 < 2 ? 0 : 11 - (v2 % 11);

    return parseInt(value.charAt(13), 10) === v2;
  }

  return true;
}

export function validateInstallments(
  total: number,
  amount: number,
  amountToCheck: number,
): boolean {
  return calculateInstallments(total, amount) === amountToCheck;
}
