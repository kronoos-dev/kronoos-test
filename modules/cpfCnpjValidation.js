const { cnpj, cpf } = require("cpf-cnpj-validator");

function validateCPForCNPJ(cpforcnpj) {
  if (cpforcnpj.length === 11) {
    return cpf.isValid(cpforcnpj)
  }
  if (cpforcnpj.length === 14) {
    return cnpj.isValid(cpforcnpj)
  }
  return false
}

module.exports = {
  validateCPForCNPJ,
};
