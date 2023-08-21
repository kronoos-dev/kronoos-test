const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const validateCPF = require("./validateCPF");
const validateCNPJ = require("./validateCNPJ");
const validatePrestations = require("./validatePrestations");
const convertToDateObject = require("./dateConversion");

// Constants
const VL_TOTAL = 1500.0;
const QT_PRESTACOES = 3;
const VL_PRESTA = 500.0;

async function main() {
  try {
    const dataArray = [];
    const readStream = fs.createReadStream("data.csv").pipe(csv());

    for await (const row of readStream) {
      const isCPFValid = validateCPF(row.nrCpfCnpj);
      const isCNPJValid = validateCNPJ(row.nrCpfCnpj);
      const arePrestationsValid = validatePrestations(
        parseFloat(row.vlTotal),
        parseInt(row.qtPrestacoes, 10), // Use parseInt with a radix
        parseFloat(row.vlPresta)
      );
      const dtContrato = convertToDateObject(row.dtContrato);
      const dtVctPre = convertToDateObject(row.dtVctPre);

      dataArray.push({
        ...row,
        isCPFValid,
        isCNPJValid,
        arePrestationsValid,
        dtContrato,
        dtVctPre,
      });
    }

    const csvWriter = createCsvWriter({
      path: "output.csv",
      header: [
        // Define your CSV header fields here
        { id: "nrCpfCnpj", title: "CPF/CNPJ" },
        { id: "vlTotal", title: "Valor Total" },
        { id: "qtPrestacoes", title: "Quantidade de Prestações" },
        { id: "vlPresta", title: "Valor da Prestação" },
        { id: "isCPFValid", title: "CPF Válido" },
        { id: "isCNPJValid", title: "CNPJ Válido" },
        { id: "arePrestationsValid", title: "Prestações Válidas" },
        { id: "dtContrato", title: "Data de Contrato" },
        { id: "dtVctPre", title: "Data de Vencimento de Prestação" },
      ],
    });

    await csvWriter.writeRecords(dataArray);

    console.log("CSV file has been written successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the main function
main();
