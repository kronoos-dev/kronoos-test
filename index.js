
const { validateCPFOrCNPJ } = require('./utils/cnpjCpfValidator');
const { convertToDate } = require('./utils/convertToDate');
const { formatCurrency } = require('./utils/formatCurrency');
const { readCSVFile } = require('./utils/readCSVFile');
const { validatePresta } = require('./utils/validatePresta');

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

  console.log(processedData);
};

const filePath = './data.csv';

readCSVFile(filePath, processData);
