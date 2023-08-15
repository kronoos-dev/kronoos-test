import { createReadStream } from 'fs';
import csv from 'csv-parser';
import { convertToBRCurrency, isValidCPF, isValidCNPJ, formatDate, convertToDate, checkTotalConsistent } from './utils.js'

const dataHandler = (data) => {
  const vlTotal = convertToBRCurrency(data.vlTotal)
  const vlPresta = convertToBRCurrency(data.vlPresta)
  const vlMora = convertToBRCurrency(data.vlMora)
  const vlMulta = convertToBRCurrency(data.vlMulta)
  const vlAtual = convertToBRCurrency(data.vlAtual)
  const dtContrato = convertToDate(data.dtContrato);
  const dtVctPre = convertToDate(data.dtVctPre);
  const cleanedNrCpfCnpj = data.nrCpfCnpj.replace(/[^\d]+/g,'');
  const newData = {...data, vlTotal, vlPresta, vlMora, vlMulta, vlAtual,
    dtContrato: formatDate(dtContrato),
    dtVctPre: formatDate(dtVctPre),
    isTotalConsistent: checkTotalConsistent(data.vlTotal, data.qtPrestacoes, data.vlPresta)
  }

  if (cleanedNrCpfCnpj.length === 11) {
    return {...newData, isValidCPF: isValidCPF(cleanedNrCpfCnpj)}
  }

  return {...newData, isValidCNPJ: isValidCNPJ(cleanedNrCpfCnpj)}
}

const processCSVFile = (filePath) => {
	const results = [];

  createReadStream(filePath)
  .pipe(csv())
  .on('data', (data) => {
    const convertData = dataHandler(data);
    convertData && results.push(convertData);
  })
  .on('end', () => {
    console.log(results);
  });
}

processCSVFile('./data.csv')