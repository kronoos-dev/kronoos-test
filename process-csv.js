const csv = require("csv-parser");
const fs = require("fs");
const validateCNPJCPF = require("./utils/validate-cpf-cnpj");
const formatDate = require("./utils/format-date");

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function processCSVData(data) {
  const vlTotal = parseFloat(data["vlTotal"]);
  const qtPrestacoes = Number(data["qtPrestacoes"]);
  const vlPresta = parseFloat(data["vlPresta"]);
  data["vlTotal"] = formatter.format(data["vlTotal"]);
  data["vlPresta"] = formatter.format(data["vlPresta"]);
  data["vlMora"] = formatter.format(data["vlMora"]);
  data["nrCpfCnpj"] = validateCNPJCPF(data["nrCpfCnpj"])
    ? "Valido, " + data["nrCpfCnpj"]
    : "Invalido, " + data["nrCpfCnpj"];
  data["vlPresta"] =
    vlTotal / qtPrestacoes === vlPresta
      ? "Valido, " + data["vlPresta"]
      : `Invalido, ${
          data["vlPresta"]
        } o valor da prestação deve ser ${formatter.format(
          vlTotal / qtPrestacoes
        )}`;
  data["dtContrato"] = formatDate(data["dtContrato"]);
  data["dtVctPre"] = formatDate(data["dtVctPre"]);
  return data;
}

function processCSVFile(results) {
  fs.createReadStream("data.csv")
    .pipe(csv())
    .on("data", (data) => {
      const processedData = processCSVData(data);
      results.push(processedData);
    })
    .on("end", () => {
      console.log(results);
    });
}

module.exports = processCSVFile;
