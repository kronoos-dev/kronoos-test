const csvProcessor = require('./Processor/csvProcessor');
const currencyFormatter = require('./Converter/currencyFormatter');
const cpfCnpjValidator = require('./Validators/cpfCnpjValidator');
const dateConverter = require('./Converter/dateConverter');
const totalAndInstallmentsValidator = require('./Validators/totalAndInstallmentsValidator');

async function main() {
  try {
    const data = await csvProcessor.readAndProcessCSV('../data/data.csv');

    // Operações  dos dados
    currencyFormatter.formatCurrency(data);
    cpfCnpjValidator.validateCpfCnpj(data);
    dateConverter.convertDates(data);
    totalAndInstallmentsValidator.validateTotalAndInstallments(data);

    console.log('Dados processados com sucesso:', data);
  } catch (error) {
    console.error('Erro ao processar os dados:', error);
  }
}

main();
