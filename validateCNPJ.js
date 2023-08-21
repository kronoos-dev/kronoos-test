function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, "");
  
    if (cnpj.length !== 14) {
      return false;
    }
  
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }
  
    let size = 12;
    let numbers = cnpj.substring(0, size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(cnpj.charAt(12))) {
      return false;
    }
  
    size = 13;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(cnpj.charAt(13))) {
      return false;
    }
  
    return true;
  }

module.exports = validateCNPJ;
