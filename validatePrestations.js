function validatePrestations(vlTotal, qtPrestacoes, vlPresta) {
  const calculatedPresta = vlTotal / qtPrestacoes;

  const roundedCalculatedPresta = parseFloat(calculatedPresta.toFixed(2));

  if (roundedCalculatedPresta !== vlPresta) {
    return false;
  }

  return true;
}

const vlTotal = 1500.0;
const qtPrestacoes = 3;
const vlPresta = 500.0;

if (validatePrestations(vlTotal, qtPrestacoes, vlPresta)) {
  console.log("Os cálculos estão corretos e consistentes.");
} else {
  console.log("Os cálculos não estão consistentes.");
}

function convertToDateObject(dateString) {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6) - 1;
  const day = dateString.substring(6, 8);
  return new Date(year, month, day);
}

const dtContratoString = "20230820";
const dtVctPreString = "20230915";

const dtContrato = convertToDateObject(dtContratoString);
const dtVctPre = convertToDateObject(dtVctPreString);

console.log("Data de Contrato:", dtContrato);
console.log("Data de Vencimento de Prestação:", dtVctPre);

const VL_TOTAL = 1500.0;
const QT_PRESTACOES = 3;
const VL_PRESTA = 500.0;

async function main() {
  try {
    if (validatePrestations(VL_TOTAL, QT_PRESTACOES, VL_PRESTA)) {
      console.log("Os cálculos estão corretos e consistentes.");
    } else {
      console.log("Os cálculos não estão consistentes.");
    }

    const dtContratoString = "20230820";
    const dtVctPreString = "20230915";
    const dtContrato = convertToDateObject(dtContratoString);
    const dtVctPre = convertToDateObject(dtVctPreString);
    console.log("Data de Contrato:", dtContrato);
    console.log("Data de Vencimento de Prestação:", dtVctPre);

    const dataArray = [];
    const readStream = fs.createReadStream("data.csv").pipe(csv());

    for await (const row of readStream) {
      const isCPFValid = validateCPF(row.nrCpfCnpj);
      const isCNPJValid = validateCNPJ(row.nrCpfCnpj);
      const arePrestationsValid = validatePrestations(
        parseFloat(row.vlTotal),
        parseInt(row.qtPrestacoes, 10),
        parseFloat(row.vlPresta)
      );
      const dtContrato = convertToDateObject(row.dtContrato);
      const dtVctPre = convertToDateObject(row.dtVctPre);

      console.log("CPF Valido:", isCPFValid);
      console.log("CNPJ Valido:", isCNPJValid);
      console.log("Prestations Valid:", arePrestationsValid);
      console.log("Data do Contrato:", dtContrato);
      console.log("Data de  Vencimento de Prestacao:", dtVctPre);
      console.log("===============================");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = validatePrestations;
