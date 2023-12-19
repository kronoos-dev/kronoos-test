const csv = require('csv-parser');
const fs = require('fs');
const { cpf, cnpj } = require('cpf-cnpj-validator');

/**
 * Validate CPF or CNPJ
 */
const validateCPForCNPJ = valor => cpf.isValid(valor) || cnpj.isValid(valor);

/**
 * Convert date string to Date object
 */
const convertToDate = dateStr => {
  if (dateStr.length !== 8) return null;
  const [year, month, day] = [dateStr.slice(0, 4), dateStr.slice(4, 6), dateStr.slice(6, 8)];
  return new Date(Date.UTC(year, month - 1, day));
};

/**
 * Format currency in Brazilian Real
 */
const formatCurrency = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

/**
 * Process each data row
 */
const processDataRow = obj => {
  const { vlPresta, vlTotal, qtPrestacoes, nrCpfCnpj, dtContrato, dtVctPre, ...rest } = obj;
  const valorPrestacaoFornecido = parseFloat(vlPresta);
  const valorEsperado = parseFloat(vlTotal) / parseInt(qtPrestacoes);

  return {
    ...rest,
    vlPresta: formatCurrency(vlPresta),
    vlTotal: formatCurrency(vlTotal),
    isValidValorPrestacao: valorPrestacaoFornecido === valorEsperado,
    valorPrestacaoEsperado: formatCurrency(valorEsperado),
    isValidNrCpfCnpj: nrCpfCnpj ? validateCPForCNPJ(nrCpfCnpj) : false,
    dtContratoFormatted: convertToDate(dtContrato),
    dtVctPreFormatted: convertToDate(dtVctPre),
  };
};

async function parseCSV() {
  try {
    const results = [];
    await fs.createReadStream('data.csv')
      .pipe(csv())
      .on('data', data => results.push(processDataRow(data)))
      .on('end', () => console.log(results));
  } catch (error) {
    console.error('Error reading or parsing file:', error);
  }
}

parseCSV();
