const fs = require('fs');
const csv = require('csv-parser');
const formatNumber = require('./utils/formatNumber');
const validateCpfCnpj = require('./utils/validateCpfCnpj');
const validatePrestation = require('./utils/validatePrestation');
const convertDate = require('./utils/convertDate');

const filePath = './data.csv'; 

const results = [];

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (data) => {
    // Conversão reais
    data.vlTotal = formatNumber(data.vlTotal);
    data.vlPresta = formatNumber(data.vlPresta);
    data.vlMora = formatNumber(data.vlMora);
    // Validacao cpf cnpj
    data.nrCpfCnpj = validateCpfCnpj(data.nrCpfCnpj);

    //validar valor total prestacoes

    data.vlPresta = validatePrestation(data.vlTotal, data.qtPrestacoes, data.vlPresta);

    //converter data -

    data.dtContrato = convertDate(data.dtContrato);
    data.dtVctPre = convertDate(data.dtVctPre);

    results.push(data);
  })
  .on('end', () => {
    console.log(results);
  });