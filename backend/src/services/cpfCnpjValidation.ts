export function validateCpfCnpj(input: string | number): boolean {
  const cleanInput = input.toString().replace(/[^\d]+/g, "");
  const cpfRegex = /^\d{11}$/;
  const cnpjRegex = /^\d{14}$/;

  if (cpfRegex.test(cleanInput)) {
    return validateCpf(cleanInput);
  } else if (cnpjRegex.test(cleanInput)) {
    return validateCnpj(cleanInput);
  }

  return false;
}

function validateCpf(cpf: string): boolean {
  let sum = 0;
  let remainder;

  if (cpf === "00000000000") return false;

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

function validateCnpj(cnpj: string): boolean {
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(digits.charAt(0))) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === Number(digits.charAt(1));
}
