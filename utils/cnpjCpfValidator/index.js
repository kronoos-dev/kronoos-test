const { cnpj, cpf } = require("cpf-cnpj-validator");

const validateCPFOrCNPJ = (value) => {
  if (cpf.isValid(value)) {
    return 'CPF';
  } else if (cnpj.isValid(value)) {
    return 'CNPJ';
  } else {
    return 'Inválido';
  }
};

module.exports = { validateCPFOrCNPJ}