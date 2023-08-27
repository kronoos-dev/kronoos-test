function formatCurrencyValues(data) {
  const VALUES = ['vlTotal', 'vlPresta', 'vlMora', 'vlMulta', 'vlAtual'];
  VALUES.map((value) => {
    data[value] = new Intl.NumberFormat("pt-BR", {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(data[value])
  });
}

function cpfCnpj(data) {
  if (data.nrCpfCnpj.length == 11) {
    data['cpfCnpjIsValid'] = verifyCpf(data.nrCpfCnpj)
  }
  else if (data.nrCpfCnpj.length == 14) {
    data['cpfCnpjIsValid'] = verifyCnpj(data.nrCpfCnpj)
  }
  else {
    return false;
  }
}

function verifyCpf(cpf) {
  /* 
  Instructions for CPF algorithm are from this site:  
  https://www.calculadorafacil.com.br/computacao/validar-cpf 
  */
  let sum = 0;
  let firstNumVerify = null;
  let secondNumVerify = null;
  for (let i = 0; i < 9; i++) {
    sum = sum + (parseInt(cpf[i]) * (i + 1))
  }
  firstNumVerify = (sum % 11 === 10) ? 0 : sum % 11;
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum = sum + (parseInt(cpf[i]) * (i))
  }
  secondNumVerify = (sum % 11) === 10 ? 0 : sum % 11;
  return (cpf[9] == firstNumVerify) && (cpf[10] == secondNumVerify) ? true : false;
} 

function verifyCnpj(cnpj) {
  /*
  Instructions for CNPJ algorithm are from this site:  
  https://www.geradorcnpj.com/algoritmo_do_cnpj.htm
  */
  let sum = 0;
  let firstNumVerify = null;
  let secondNumVerify = null;
  const FIRSTSTEP = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const SECONDSTEP = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  for (let i = 0; i < 12; i++) {
    sum = sum + (parseInt(cnpj[i]) * (FIRSTSTEP[i]))
  }
  firstNumVerify = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
  sum = 0
  for (let i = 0; i < 13; i++) {
    sum = sum + (parseInt(cnpj[i]) * (SECONDSTEP[i]))
  }
  secondNumVerify = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
  return (cnpj[12] == firstNumVerify) && (cnpj[13] == secondNumVerify) ? true : false
} 

function verifyVlTotal(data) {
  return parseInt((parseInt(data.vlTotal) / parseInt(data.qtPrestacoes))) === parseInt(data.vlPresta) ? true : false;
}

function convertToDate(data) {
  return new Date(data.slice(0,4), (data.slice(4,6) - 1), data.slice(6,8))
}
  
module.exports = { formatCurrencyValues, cpfCnpj, verifyVlTotal, convertToDate }