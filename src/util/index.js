const fs = require("fs").promises;
const csv = require("csv-parser");

function convertToDate(dateString) {
  const dateRegex = /^\d{8}$/;
  if (!dateRegex.test(dateString)) {
    return null;
  }

  const year = parseInt(dateString.substr(0, 4), 10);
  const month = parseInt(dateString.substr(4, 2), 10) - 1;
  const day = parseInt(dateString.substr(6, 2), 10);

  const dateObject = new Date(year, month, day);

  return isNaN(dateObject.getTime()) ? null : dateObject;
}

function isCPF(cpf) {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfRegex.test(cpf);
}

function isCNPJ(cnpj) {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return cnpjRegex.test(cnpj);
}

function formatCPF(cpf) {
  if (!cpf || typeof cpf !== "string") {
    return cpf;
  }

  const numericCPF = cpf.replace(/\D/g, "");

  return numericCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatCNPJ(cnpj) {
  if (!cnpj || typeof cnpj !== "string") {
    return cnpj;
  }

  const numericCNPJ = cnpj.replace(/\D/g, "");

  return numericCNPJ.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
}

function formatCurrency(value) {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);

  return formattedValue;
}

async function readCSV(filePath) {
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    return fileData;
  } catch (error) {
    throw new Error(`Erro ao ler o arquivo CSV: ${error.message}`);
  }
}

async function parseCSV(csvData) {
  const dataArray = [];

  return new Promise((resolve, reject) => {
    const parser = csv();

    parser.on("data", (row) => {
      dataArray.push(row);
    });

    parser.on("end", () => {
      resolve(dataArray);
    });

    parser.on("error", (error) => {
      reject(`Erro ao processar o CSV: ${error.message}`);
    });

    parser.write(csvData);
    parser.end();
  });
}

module.exports = {
  convertToDate,
  isCPF,
  isCNPJ,
  formatCPF,
  formatCNPJ,
  formatCurrency,
  readCSV,
  parseCSV,
};
