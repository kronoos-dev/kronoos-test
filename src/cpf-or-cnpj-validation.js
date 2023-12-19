import { lerCSV } from "./process-csv-data.js";

function validarCpfCnpj(cpfCnpj) {
  const cleanCpfCnpj = cpfCnpj.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (cleanCpfCnpj.length === 11) {
    // CPF
    let sum = 0;
    let digit = 0;
    let multiplier = 10;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCpfCnpj[i]) * multiplier;
      multiplier--;
    }

    digit = 11 - (sum % 11);
    digit = digit > 9 ? 0 : digit;

    if (parseInt(cleanCpfCnpj[9]) !== digit) {
      return false;
    }

    sum = 0;
    multiplier = 11;

    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCpfCnpj[i]) * multiplier;
      multiplier--;
    }

    digit = 11 - (sum % 11);
    digit = digit > 9 ? 0 : digit;

    if (parseInt(cleanCpfCnpj[10]) !== digit) {
      return false;
    }

    return true;
  } else if (cleanCpfCnpj.length === 14) {
    // CNPJ
    let sum = 0;
    let digit = 0;
    let multiplier = 5;

    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCpfCnpj[i]) * multiplier;
      multiplier = multiplier === 2 ? 9 : multiplier - 1;
    }

    digit = 11 - (sum % 11);
    digit = digit > 9 ? 0 : digit;

    if (parseInt(cleanCpfCnpj[12]) !== digit) {
      return false;
    }

    sum = 0;
    multiplier = 6;

    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCpfCnpj[i]) * multiplier;
      multiplier = multiplier === 2 ? 9 : multiplier - 1;
    }

    digit = 11 - (sum % 11);
    digit = digit > 9 ? 0 : digit;

    if (parseInt(cleanCpfCnpj[13]) !== digit) {
      return false;
    }

    return true;
  }

  return false;
}

// Seu JSON
const seuJSON = [
  {
    nrContrato: "44358",
    dtContrato: "20230406",
    qtPrestacoes: "7",
    vlTotal: "74155.17",
    cdProduto: "332",
    // ... outros campos
    nrCpfCnpj: "984073507745", // Troque pelo número do CPF ou CNPJ a ser validado
  },
  {
    // Outro objeto...
    nrCpfCnpj: "62922411060", // Troque pelo número do CPF ou CNPJ a ser validado
  },
  // ... outros objetos
];

//..

async function manipulationCpfCnpj() {
  const nomeArquivo = "data.csv";

  const dadosCSV = await lerCSV(nomeArquivo);

  //..

  // Validando CPFs e CNPJs no JSON
  dadosCSV.forEach((item, index) => {
    const isValid = validarCpfCnpj(item.nrCpfCnpj);
    console.log(
      `CPF/CNPJ ${item.nrCpfCnpj} é ${isValid ? "válido" : "invalido"}`
    );
  });
}

manipulationCpfCnpj();
