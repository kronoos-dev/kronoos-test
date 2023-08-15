const csv = require("csv-parser");
const fs = require("fs");
const results = [];

const formatBRL = (value) =>
  new Intl.NumberFormat("PT-BR", { style: "currency", currency: "BRL" }).format(
    value
  );

const formatDate = (date) => {
  if (date.length !== 8) {
    return date;
  }
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  return new Date(`${year}-${month}-${day}`);
};

fs.createReadStream("data.csv")
  .pipe(
    csv({
      separator: ",",
    })
  )
  .on("data", (data) => {
    const errors = [];

    // validação simples, mas poderia ser um regex
    const isCNPJ = String(data.nrCpfCnpj).length === 14;
    const isCPF = String(data.nrCpfCnpj).length === 11;
    const isCPFCNPJ = isCNPJ || isCPF;

    if (!isCPFCNPJ) {
      errors.push("nrCpfCnpj_incorreto");
    }

    const checkValorPrestacao =
      Number(data.vlTotal) / Number(data.qtPrestacoes) ===
      Number(data.vlPresta);

    if (!checkValorPrestacao) {
      errors.push("vlPresta_incorreto");
    }
    if (data.dtContrato.length !== 8) {
      errors.push("dtContrato_incorreto");
    }
    if (data.dtVctPre.length !== 8) {
      errors.push("dtVctPre_incorreto");
    }

    return results.push({
      ...data,
      errors,
      vlTotal: formatBRL(data.vlTotal),
      vlPresta: formatBRL(data.vlPresta),
      vlMora: formatBRL(data.vlMora),
      dtContrato: formatDate(data.dtVctPre),
      dtVctPre: formatDate(data.dtVctPre),
    });
  })
  .on("end", () => {});
