const fs = require("fs");
const csv = require("csv-parser");
const Intl = require("intl");
const isCNPJValid = require("./utils/cnpj.utils");
const isCPFValid = require("./utils/cpf.utils");

function convertToDate(dateString) {
  const [, year, month, day] = dateString.match(/^(\d{4})(\d{2})(\d{2})$/);
  return new Date(year, month - 1, day);
}

function convertCurrency(value) {
  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return currency.format(value);
}

(function () {
  const data = [];

  fs.createReadStream("data.csv")
    .pipe(csv())
    .on("data", (row) => {
      let pojo = {};
      const {
        vlTotal,
        vlPresta,
        qtPrestacoes,
        vlMora,
        nrCpfCnpj,
        dtContrato,
        dtVctPre,
      } = row;
      const total = convertCurrency(vlTotal);
      const presta = convertCurrency(vlPresta);
      const mora = convertCurrency(vlMora);

      const tipoDocumento = isCPFValid(nrCpfCnpj)
        ? "CPF"
        : isCNPJValid(nrCpfCnpj)
        ? "CNPJ"
        : "Documento Inválido";

      const calculatedValue = Number(vlTotal) / Number(qtPrestacoes);
      const isValidated = calculatedValue.toFixed(2) === vlPresta;

      const dataContrato = convertToDate(dtContrato);
      const dataVctPre = convertToDate(dtVctPre);

      data.push(
        Object.assign(pojo, {
          vlTotal: total,
          vlPresta: presta,
          vlMora: mora,
          tpDocumento: tipoDocumento,
          qtPrestacoes,
          prestacoesValidadas: isValidated,
          nrCpfCnpj,
          dtContrato: dataContrato,
          dtVctPre: dataVctPre,
        })
      );
    })
    .on("end", () => {
      console.log("Dados processados:", data);
      fs.writeFileSync("./retorno.json", JSON.stringify(data));
    });
})();
