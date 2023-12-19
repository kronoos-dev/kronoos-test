const fs = require("fs");
const csv = require("csv-parser");

const formatNumberToBRL = require("../utils/formaNumbersToBRL");
const { parseDate } = require("../utils/parseDate");
const {
  validateCPF,
  identifyDocumentType,
  validateCNPJ,
} = require("../utils/cpfCnpjValidator");

function checkPrestations(vlTotal, qtPrestacoes, vlPresta) {
  if (!vlTotal || !qtPrestacoes || !vlPresta) {
    return false;
  }

  const calculatedPresta = vlTotal / qtPrestacoes;

  const roundedCalculatedPresta = Math.round(calculatedPresta * 100) / 100;
  const roundedVlPresta = Math.round(vlPresta * 100) / 100;

  return roundedCalculatedPresta === roundedVlPresta;
}

function checkTypeNrCpfOrCnpj(doc) {
  const typeDocument = identifyDocumentType(doc);

  switch (typeDocument) {
    case "CPF":
      return validateCPF(doc);
    case "CNPJ":
      return validateCNPJ(doc);
    default:
      return false;
  }
}

function buildFormatValues({
  vlPresta,
  vlTotal,
  vlMora,
  vlMulta,
  vlOutAcr,
  vlIof,
  vlDescon,
  vlAtual,
  qtPrestacoes,
  dtContrato,
  dtVctPre,
  nrCpfCnpj,
}) {
  const formatValue = (value) => formatNumberToBRL(value);

  return {
    vlPresta: formatValue(vlPresta),
    vlTotal: formatValue(vlTotal),
    vlMora: formatValue(vlMora),
    vlMulta: formatValue(vlMulta),
    vlOutAcr: formatValue(vlOutAcr),
    vlIof: formatValue(vlIof),
    vlDescon: formatValue(vlDescon),
    vlAtual: formatValue(vlAtual),
    checkPrestations: checkPrestations(
      parseFloat(vlTotal),
      parseInt(qtPrestacoes, 10),
      parseFloat(vlPresta)
    ),
    dtContrato: parseDate(dtContrato),
    dtVctPre: parseDate(dtVctPre),
    validCpfCnpj: checkTypeNrCpfOrCnpj(nrCpfCnpj),
  };
}

async function readCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    let dataArray = [];

    const stream = fs.createReadStream(filePath).pipe(csv());

    stream.on("data", (row) => {
      dataArray.push({
        ...row,
        ...buildFormatValues(row),
      });
    });

    stream.on("end", () => {
      resolve(dataArray);
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
}

async function financialProcessingService(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("O arquivo CSV não existe.");
  }

  const data = await readCSVFile(filePath);
  return data;
}

module.exports = {
  financialProcessingService,
  checkPrestations,
  checkTypeNrCpfOrCnpj,
};
