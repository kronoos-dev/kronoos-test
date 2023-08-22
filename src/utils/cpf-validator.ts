export const cpfValidator = (strCPF: string = ""): boolean => {
  if (!strCPF || strCPF.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(strCPF)) {
    return false;
  }

  let sum: number = 0;
  let remainder: number;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(strCPF.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  return remainder === parseInt(strCPF.substring(10, 11));
};
