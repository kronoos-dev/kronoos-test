const { cpf, cnpj } = require('cpf-cnpj-validator');

const validateCpfCnpj = (cpfCnpj) => {

    if (cpfCnpj.length === 11 && cpf.isValid(cpfCnpj)) {
      return cpf.format(cpfCnpj);
    } else if (cpfCnpj.length === 14 && cnpj.isValid(cpfCnpj)) {
        return cnpj.format(cpfCnpj);
    }
  
    return 'Inválido'; 
}

module.exports = validateCpfCnpj;
