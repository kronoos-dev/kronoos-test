import fs from "fs";
import csv from "csv-parser";
import cpf from "cpf";
import * as cnpj from "cnpj";

const formatCurrencyBRL = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const validateCpfCnpj = (nrCpfCnpj) => {
  if (cpf.isValid(nrCpfCnpj)) {
    return "CPF válido";
  } else if (cnpj.validate(nrCpfCnpj)) {
    return "CNPJ válido";
  } else {
    return "CPF ou CNPJ inválido";
  }
}

const data = [];
fs.createReadStream("data.csv")
  .pipe(csv())
  .on("data", (row) => {
    const qtPrestacoes = parseInt(row.qtPrestacoes);
    const result = row.vlTotal / qtPrestacoes;
    row.validacaoValorPrestacao = result === row.vlPresta ? "Correto" : "Incorreto";

    for (const key in row) {
      if (key.startsWith("vl")) {
        row[key] = formatCurrencyBRL(row[key]);
      }
    }

    row.validacaoCpfCnpj = validateCpfCnpj(row.nrCpfCnpj);
    row.dtContrato = new Date(row.dtContrato.substr(0, 4), row.dtContrato.substr(4, 2) - 1, row.dtContrato.substr(6, 2));
    row.dtVctPre = new Date(row.dtVctPre.substr(0, 4), row.dtVctPre.substr(4, 2) - 1, row.dtVctPre.substr(6, 2));
    data.push(row);
  })
  .on("end", () => {
    console.log(data);
  });
