const { cpf, cnpj } = require("cpf-cnpj-validator");

const cpfCnpjValidate = (cpfCnpj) => {
  cpf.isValid(cpfCnpj) || cnpj.isValid(cpfCnpj) ? true : false;
};

const validatePrestationCalculations = (data) => {
  const calculatedPresta =
    parseInt(data.vlTotal, 10) / parseInt(data.qtPrestacoes, 10);

  if (calculatedPresta !== parseInt(data.vlPresta, 10)) {
    return false;
  }

  return true;
};

module.exports = {
  cpfCnpjValidate,
  validatePrestationCalculations,
};
