function isValidCPF(cpf) {
  const cpfPattern = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;
  return cpfPattern.test(cpf);
}

function isValidCNPJ(cnpj) {
  const cnpjPattern = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;
  return cnpjPattern.test(cnpj);
}

export function validateCpfCnpj(dataArray) {
  const validatedData = dataArray.filter((row) => {
    const nrCpfCnpj = row.nrCpfCnpj.replace(/[^0-9]/g, "");
    if (isValidCPF(nrCpfCnpj) || isValidCNPJ(nrCpfCnpj)) {
      return true;
    }
    return false;
  });

  return validatedData;
}
