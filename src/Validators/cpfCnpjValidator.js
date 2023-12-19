function validateCpfCnpj(data) {
    if (!Array.isArray(data)) {
      console.error('A entrada deve ser uma array de CPFs e/ou CNPJs.');
      return [];
    }
  
    return data.map(item => {
      const cpfCnpj = item.nrCpfCnpj;
      const cleanedValue = cpfCnpj.replace(/\D/g, ''); // Remove caracteres não numéricos
      isValid = false
  
      if (cleanedValue.length === 11) {
        // Se o tamanho for 11, considera um CPF
        isValid = validateCpf(cleanedValue);
      } else if (cleanedValue.length === 14) {
        // Se o tamanho for 14, considera um CNPJ
        isValid = validateCnpj(cleanedValue);
      } else {
        // Tamanhos inválidos para CPF ou CNPJ
        isValid = (`(Tamanho inválido para CPF ou CNPJ)`)
      }
  
      
    item.nrCpfCnpj = ( `${cpfCnpj} é ${isValid===true?"válido.":"inválido!"} ${isValid===(`(Tamanho inválido para CPF ou CNPJ)`) ?isValid: ""}`);


      return item;
    });
  }
  
  function validateCpf(cpf) {
    const isValid = /^[0-9]{11}$/.test(cpf);
  
    if (!isValid || /^([0-9])\1{10}$/.test(cpf)) return false; // CPFs com todos os dígitos iguais são considerados inválidos
  
    const digits = cpf.split('').map(digit => parseInt(digit));
  
    // Verificando o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i);
    }
    let mod = sum % 11;
    let firstVerifier = mod < 2 ? 0 : 11 - mod;
    if (firstVerifier !== digits[9]) {
      return false;
    }
  
    // Verificando o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * (11 - i);
    }
    mod = sum % 11;
    let secondVerifier = mod < 2 ? 0 : 11 - mod;
    if (secondVerifier !== digits[10]) {
      return false;
    }
  
    return true;
  }
  
  function validateCnpj(cnpj) {
    const isValid = /^[0-9]{14}$/.test(cnpj);
  
    if (!isValid || /^([0-9])\1{13}$/.test(cnpj)) return false; // CNPJs com todos os dígitos iguais sserão considerados inválidos
  
    const digits = cnpj.split('').map(digit => parseInt(digit));
  
    // Verificando o primeiro dígito verificador
    let sum = 0;
    let multiplier = 2;
    for (let i = 11; i >= 0; i--) {
      sum += digits[i] * multiplier;
      multiplier = multiplier === 9 ? 2 : multiplier + 1;
    }
    let mod = sum % 11;
    let firstVerifier = mod < 2 ? 0 : 11 - mod;
    if (firstVerifier !== digits[12]) {
      return false;
    }
  
    // Verificando o segundo dígito verificador
    sum = 0;
    multiplier = 2;
    for (let i = 12; i >= 0; i--) {
      sum += digits[i] * multiplier;
      multiplier = multiplier === 9 ? 2 : multiplier + 1;
    }
    mod = sum % 11;
    let secondVerifier = mod < 2 ? 0 : 11 - mod;
    if (secondVerifier !== digits[13]) {
      return false;
    }
  
    return true;
  }
  
  module.exports = {
    validateCpfCnpj,
  };
  