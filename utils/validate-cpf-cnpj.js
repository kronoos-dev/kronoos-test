function validateCNPJCPF(number) {
  // Remove any non-digit character
  number = number.replace(/\D/g, "");

  // Check if the number has 11 or 14 digits
  if (number.length !== 11 && number.length !== 14) {
    return false;
  }

  // Check if all digits are the same
  if (/^(\d)\1+$/.test(number)) {
    return false;
  }

  if (number.length === 11) {
    // Validate CPF
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(number.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }
    if (parseInt(number.charAt(9)) !== digit) {
      return false;
    }
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(number.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }
    if (parseInt(number.charAt(10)) !== digit) {
      return false;
    }
  } else {
    // Validate CNPJ
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(number.charAt(i)) * weight;
      weight--;
      if (weight < 2) {
        weight = 9;
      }
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }
    if (parseInt(number.charAt(12)) !== digit) {
      return false;
    }
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(number.charAt(i)) * weight;
      weight--;
      if (weight < 2) {
        weight = 9;
      }
    }
    digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }
    if (parseInt(number.charAt(13)) !== digit) {
      return false;
    }
  }

  return true;
}

module.exports = validateCNPJCPF;
