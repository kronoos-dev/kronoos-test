export function validateCPFourCNPJ(data: string) {
  const digits = data.split('').map(Number);

  if(digits.length < 12) {

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i);
    }
    
    let remainder = 11 - (sum % 11);
    if (remainder >= 10) {
      remainder = 0;
    }

    if (digits[9] !== remainder) {
      return "CPF not validate!";
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * (11 - i);
    }
    
    remainder = 11 - (sum % 11);
    if (remainder >= 10) {
      remainder = 0;
    }

    if (digits[10] !== remainder) {
      return "CPF not validate!";
    }

    return "CPF validate!";

  } else {

    const digits = data.split('').map(Number);

    let sum = 0;
    let factor = 5;
    for (let i = 0; i < 12; i++) {
      sum += digits[i] * factor;
      factor = factor === 2 ? 9 : factor - 1;
    }

    let remainder = 11 - (sum % 11);
    if (remainder >= 10) {
      remainder = 0;
    }

    if (digits[12] !== remainder) {
      return "CNPJ not validate!";
    }

    sum = 0;
    factor = 6;
    for (let i = 0; i < 13; i++) {
      sum += digits[i] * factor;
      factor = factor === 2 ? 9 : factor - 1;
    }

    remainder = 11 - (sum % 11);
    if (remainder >= 10) {
      remainder = 0;
    }

    if (digits[13] !== remainder) {
      return "CNPJ not validate!";
    }

    return "CNPJ validate!";

  }
}