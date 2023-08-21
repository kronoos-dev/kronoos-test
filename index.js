const fs = require('fs');
const csv = require('csv-parser');
const { validateCPFOrCNPJ } = require('./modules/cnpjCpfValidator');
const { convertToDate } = require('./modules/convertToDate');
const { formatCurrency } = require('./modules/formatCurrency');
const { outputToJson } = require('./modules/outputToJson');
const { validatePresta } = require('./modules/validatePresta');

const readCSVFile = (filePath, callback) => {
  const data = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      callback(data);
    });
};

const processData = (data) => {
  const processedData = data.map((item) => {
    const formattedItem = {
      ...item,
      vlTotal: formatCurrency(parseFloat(item.vlTotal)),
      vlPresta: formatCurrency(parseFloat(item.vlPresta)),
      vlMora: formatCurrency(parseFloat(item.vlMora)),
      vlMulta: formatCurrency(parseFloat(item.vlMulta)),
      vlOutAcr: formatCurrency(parseFloat(item.vlOutAcr)),
      vlIof: formatCurrency(parseFloat(item.vlIof)),
      vlDescon: formatCurrency(parseFloat(item.vlDescon)),
      vlAtual: formatCurrency(parseFloat(item.vlAtual)),
      nrCpfCnpj: item.nrCpfCnpj,
      isValidCPFOrCNPJ: validateCPFOrCNPJ(item.nrCpfCnpj),
      isValidPresta: validatePresta(
        parseFloat(item.vlTotal),
        parseFloat(item.vlPresta),
        parseInt(item.qtPrestacoes)
      ),
      dtContrato: convertToDate(item.dtContrato),
      dtVctPre: convertToDate(item.dtVctPre),
    };

    return formattedItem;
  });

  outputToJson(processedData)
};

const filePath = './data.csv';

readCSVFile(filePath, processData);