const util = require("./src/util");

const csvFilePath = "data.csv";

async function processCSV(filePath) {
  try {
    const csvData = await util.readCSV(filePath);
    const dataArray = await util.parseCSV(csvData);

    // Validar e formatar CPF/CPNJ
    dataArray.forEach((item) => {
      // Remove caracteres não numéricos
      const numericCpfCnpj = item.nrCpfCnpj.replace(/\D/g, "");

      if (numericCpfCnpj.length === 11 && util.isCPF(numericCpfCnpj)) {
        item.nrCpfCnpj = util.formatCPF(numericCpfCnpj);
      } else if (numericCpfCnpj.length === 14 && util.isCNPJ(numericCpfCnpj)) {
        item.nrCpfCnpj = util.formatCNPJ(numericCpfCnpj);
      } else {
        item.nrCpfCnpj = `CPF ou CNPJ inválido: ${item.nrCpfCnpj}`;
      }
    });

    // Converter os valores para BRL
    const convertedDataArray = dataArray.map((item) => {
      const convertedItem = { ...item };

      convertedItem.vlTotal = util.formatCurrency(parseFloat(item.vlTotal));
      convertedItem.vlPresta = util.formatCurrency(parseFloat(item.vlPresta));
      convertedItem.vlMora = util.formatCurrency(parseFloat(item.vlMora));
      convertedItem.vlMulta = util.formatCurrency(parseFloat(item.vlMulta));
      convertedItem.vlOutAcr = util.formatCurrency(parseFloat(item.vlOutAcr));
      convertedItem.vlIof = util.formatCurrency(parseFloat(item.vlIof));
      convertedItem.vlDescon = util.formatCurrency(parseFloat(item.vlDescon));
      convertedItem.vlAtual = util.formatCurrency(parseFloat(item.vlAtual));

      // Verificar se o valor de vlTotal dividido por qtPrestacoes é igual a vlPresta
      const calculatedValue =
        parseFloat(item.vlTotal) / parseFloat(item.qtPrestacoes);
      const expectedValue = parseFloat(item.vlPresta);
      convertedItem.observacao =
        calculatedValue === expectedValue
          ? "Cálculo correto"
          : "Cálculo incorreto";

      // Converter as datas para objetos do tipo Date
      convertedItem.dtContrato = util.convertToDate(item.dtContrato);
      convertedItem.dtVctPre = util.convertToDate(item.dtVctPre);

      return convertedItem;
    });

    console.log("Dados convertidos para BRL:", convertedDataArray);
  } catch (error) {
    console.error(`Error encontrado na função processCSV: ${error}`);
  }
}

async function run() {
  await processCSV(csvFilePath);
}

run();
