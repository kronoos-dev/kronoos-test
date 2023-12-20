function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  
    if (cpf === '' || cpf.length !== 11 || /^(\d)\1+$/g.test(cpf)) {
      return false;
    }
  
    let soma = 0;
    let resto;
  
    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
  
    resto = (soma * 10) % 11;
  
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
  
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
  
    soma = 0;
  
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
  
    resto = (soma * 10) % 11;
  
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
  
    return resto === parseInt(cpf.substring(10, 11));
  }
  
  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  
    if (cnpj === '' || cnpj.length !== 14 || /^(\d)\1+$/g.test(cnpj)) {
      return false;
    }
  
    // Verifica o primeiro dígito
    let soma = 0;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * (5 - i % 6);
    }
  
    let resto = soma % 11;
    if (resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }
  
    if (resto !== parseInt(cnpj.charAt(12))) {
      return false;
    }
  
    // Verifica o segundo dígito
    soma = 0;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * (6 - i % 6);
    }
  
    resto = soma % 11;
    if (resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }
  
    return resto === parseInt(cnpj.charAt(13));
  }
  
  // Exemplo de uso
  const cpfValido = validarCPF('123.456.789-09');
  const cnpjValido = validarCNPJ('12.345.678/0001-01');
  
  console.log('CPF válido:', cpfValido);
  console.log('CNPJ válido:', cnpjValido);
  