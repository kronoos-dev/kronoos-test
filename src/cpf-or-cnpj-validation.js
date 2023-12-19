import { readCSV } from "./process-csv-data.js";

function validateCpfCnpj(cpfCnpj) {
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

async function manipulationCpfCnpj() {
  const nomeArquivo = "data.csv";

  const dadosCSV = await readCSV(nomeArquivo);

  dadosCSV.forEach((item, index) => {
    const isValid = validateCpfCnpj(item.nrCpfCnpj);
    console.log(
      `CPF ou CNPJ ${item.nrCpfCnpj} é ${isValid ? "válido" : "invalido"}`
    );
  });
}

manipulationCpfCnpj();
