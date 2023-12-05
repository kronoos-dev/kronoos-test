const fs = require('fs');
const csv = require('csv-parser');
const { formatToBrlCurrency } = require('./utils/converters/monetary');
const { verifyIfFileExists } = require('./utils/validator/dataSource');
const { verifyCpfCnpj } = require('./utils/validator/cpfCnpj');
const { formatDate } = require('./utils/converters/date');
const { logError, logSuccess } = require('./utils/logs/logs');

const filePath = './src/data/data.csv';

async function Main() {
  const newDataSource = [];

  verifyIfFileExists(filePath);

  try {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('resume', () => {
        console.log(`
        =========================================================================================
        =  ██╗  ██╗██████╗  ██████╗ ███╗   ██╗ ██████╗  ██████╗ ███████╗
        =  ██║ ██╔╝██╔══██╗██╔═══██╗████╗  ██║██╔═══██╗██╔═══██╗██╔════╝
        =  █████╔╝ ██████╔╝██║   ██║██╔██╗ ██║██║   ██║██║   ██║███████╗
        =  ██╔═██╗ ██╔══██╗██║   ██║██║╚██╗██║██║   ██║██║   ██║╚════██║
        =  ██║  ██╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝╚██████╔╝███████║  CSV Management
        =  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚══════╝  By: Koenomatachisan
        =========================================================================================                                                           
`)
      })
      .on('data', (row) => {
        const newRow = {
          ...row,

          vlPresta: formatToBrlCurrency(row?.vlPresta),
          vlMora: formatToBrlCurrency(row?.vlMora),
          vlMulta: formatToBrlCurrency(row?.vlMulta),
          vlOutAcr: formatToBrlCurrency(row?.vlOutAcr),
          vlIof: formatToBrlCurrency(row?.vlIof),
          vlDescon: formatToBrlCurrency(row?.vlDescon),
          vlAtual: formatToBrlCurrency(row?.vlAtual),
          vlTotal: formatToBrlCurrency(row?.vlTotal),
          nrCpfCnpj: verifyCpfCnpj(row?.nrCpfCnpj),
          paymentInstallmentIsValid: row?.vlTotal / row?.qtPrestacoes === row?.vlPresta ? true : false,
          dtContrato: formatDate(row.dtContrato),
          dtVctPre: formatDate(row.dtVctPre),
        }
        newDataSource.push(newRow);
      });
  } catch { }

}

Main();