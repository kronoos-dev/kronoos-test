const { cpf } = require("cpf-cnpj-validator");
const { cnpj } = require("cpf-cnpj-validator");

function isValidCPFCNPJ(nrCpfCnpj) {
  let isCpf = false;
  if (nrCpfCnpj && nrCpfCnpj.length === 11) {
    isCpf = true;
    return cpf.isValid(nrCpfCnpj);
  }

  if (!isCpf && nrCpfCnpj && nrCpfCnpj.length > 11) {
    return cnpj.isValid(nrCpfCnpj);
  }
}

function isValidatePrest(vlPresta, vlTotal, qtPrestacoes) {
  if (vlTotal && qtPrestacoes) {
    const result = vlTotal / qtPrestacoes;
    if (result === vlPresta) {
      return result;
    }
    return 0;
  }
  return 0;
}

exports.isValidCPFCNPJ = isValidCPFCNPJ;
exports.isValidatePrest = isValidatePrest;
