const fs = require("fs");
const csv = require("csv-parser");
const { cpf } = require("cpf-cnpj-validator");
const { cnpj } = require("cpf-cnpj-validator");
const moment = require("moment/moment");
const utils = require("../utils/utils");

function createReadStream() {
  if (__basedir) {
    const pathUpload = __basedir + "/resources/static/assets/uploads/file.csv";
    const data = [];
    const clients = [];

    return new Promise((resolve) => {
      fs.createReadStream(`${pathUpload}`)
        .pipe(csv())
        .on("data", (row) => {
          data.push(row);
        })
        .on("end", async () => {
          try {
            if (data && data.length > 0) {
              for await (const item of data) {
                item.vlTotal = validateIntl(item.vlTotal);
                const valuePrest = item.vlPresta;
                item.vlPresta = validateIntl(item.vlPresta);
                item.vlMora = validateIntl(item.vlMora);
                item.nrCpfCnpj = validateFormatCPFCNPJ(item.nrCpfCnpj);
                item.dtContrato = moment(item.dtContrato).format("DD/MM/YYYY");
                item.dtVctPre = moment(item.dtVctPre).format("DD/MM/YYYY");
                item.vlPresta = utils.isValidatePrest(
                  valuePrest,
                  item.vlTotal,
                  item.qtPrestacoes
                );
                clients.push(item);
              }
              resolve(data);
            }
          } catch (error) {
            throw new Error(error.message);
          }
        });
      return clients;
    });
  }
}

function validateIntl(value) {
  if (value) {
    return Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
  return 0;
}

function validateFormatCPFCNPJ(nrCpfCnpj) {
  let isCpf = false;
  if (nrCpfCnpj && nrCpfCnpj.length === 11) {
    isCpf = true;
    return cpf.format(nrCpfCnpj);
  }

  if (!isCpf && nrCpfCnpj && nrCpfCnpj.length > 11) {
    return cnpj.format(nrCpfCnpj);
  }

  utils.isValidCPFCNPJ(nrCpfCnpj);
}

const uploadService = async () => {
  const test = await Promise.all([createReadStream()]);
  return test[0];
};

module.exports = uploadService;
