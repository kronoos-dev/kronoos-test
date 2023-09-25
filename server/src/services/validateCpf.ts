export default function validateCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/[^\d]/g, '');

  
  if (cleanCPF.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cleanCPF)) {
    return false;
  }

  let sum = 0;
  cleanCPF.split('').slice(0, 9).forEach((digit, index) => {
    const parsedDigit = parseInt(digit);
    sum += parsedDigit * (10 - index);
  });
  const firstDigit = 11 - (sum % 11);

  if (firstDigit > 9 ? 0 : firstDigit !== parseInt(cleanCPF.charAt(9))) {
    return false;
  }

  sum = 0;
  cleanCPF.split('').slice(0, 10).forEach((digit, index) => {
    const parsedDigit = parseInt(digit);
    sum += parsedDigit * (11 - index);
  });
  const secondDigit = 11 - (sum % 11);

  if (secondDigit > 9 ? 0 : secondDigit !== parseInt(cleanCPF.charAt(10))) {
    return false;
  }

  return true;
}