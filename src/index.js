const fs = require("fs");
const csv = require("csv-parser");
const validateCpfCnpj = require("./util/validateCpfCnpj");

const data = [];

fs.createReadStream("./src/providers/data.csv")
  .pipe(csv())
  .on("data", (row) => {
    // Convertendo valores para moeda BRL
    const numberFormat = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    row.vlTotal = numberFormat.format(row.vlTotal);
    row.vlPresta = numberFormat.format(row.vlPresta);
    row.vlMora = numberFormat.format(row.vlMora);
    row.vlMulta = numberFormat.format(row.vlMulta);
    row.vlOutAcr = numberFormat.format(row.vlOutAcr);
    row.vlIof = numberFormat.format(row.vlIof);
    row.vlDescon = numberFormat.format(row.vlDescon);
    row.vlAtual = numberFormat.format(row.vlAtual);

    // Validando CPF ou CNPJ
    if (!validateCpfCnpj(row.nrCpfCnpj)) {
      console.error(`Erro: CPF ou CNPJ inválido para ${row.nmClient}`);
    }

    // Dividindo o valor total pelas prestações
    const valorPrestacaoCalculado = row.vlTotal / row.qtPrestacoes;
    if (valorPrestacaoCalculado !== row.vlPresta) {
      console.error(
        `Erro: Valor de prestação inconsistente para ${row.nmClient}`
      );
    }

    // Convertendo datas para o tipo Date
    row.dtContrato = new Date(
      row.dtContrato.substring(0, 4),
      row.dtContrato.substring(4, 6) - 1,
      row.dtContrato.substring(6, 8)
    );
    row.dtVctPre = new Date(
      row.dtVctPre.substring(0, 4),
      row.dtVctPre.substring(4, 6) - 1,
      row.dtVctPre.substring(6, 8)
    );

    data.push(row);
  })
  .on("end", () => {
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFileSync("./src/outputs/dataProcessed.json", jsonData, "utf-8");

    console.log("Dados processados com sucesso:", data);
  });
