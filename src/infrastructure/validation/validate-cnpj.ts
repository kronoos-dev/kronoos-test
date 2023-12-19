function validateCNPJ(cnpj: string) {
    cnpj = cnpj.replace(/[^\d]/g, '');
  
    if (cnpj.length !== 14) {
      return false;
    }
  
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }
  
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
  
    if (digit1 !== parseInt(cnpj.charAt(12))) {
      return false;
    }
  
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
  
    if (digit2 !== parseInt(cnpj.charAt(13))) {
      return false;
    }
  
    return true;
  }
  export default validateCNPJ