const fs = require("fs");
const csv = require("csv-parser");

function lerCSV(nomeArquivo) {
  const dados = [];

  fs.createReadStream(nomeArquivo)
    .pipe(csv())
    .on("data", (row) => {
      dados.push(row);
    })
    .on("end", () => {
      try {
        const headers = Object.keys(dados[0]);

        const converterMoeda = (item) => {
          headers.forEach((header) => {
            if (header.includes("vl")) {
              item[header] = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(item[header].replace(/[^\d.-]/g, "")));
            }
          });
        };

        const validarCPFouCNPJ = (item) => {
          const nrCpfCnpj = item["nrCpfCnpj"]?.replace(/\D/g, "");

          if (nrCpfCnpj && nrCpfCnpj.length === 11 && !validarCPF(nrCpfCnpj)) {
            console.log(
              `Erro de validação CPF para nrContrato ${item["nrContrato"]}`
            );
          } else if (
            nrCpfCnpj &&
            nrCpfCnpj.length === 14 &&
            !validarCNPJ(nrCpfCnpj)
          ) {
            console.log(
              `Erro de validação CNPJ para nrContrato ${item["nrContrato"]}`
            );
          } else if (
            nrCpfCnpj &&
            nrCpfCnpj.length !== 11 &&
            nrCpfCnpj.length !== 14
          ) {
            console.log(
              `Erro: nrCpfCnpj inválido para nrContrato ${item["nrContrato"]}`
            );
          }
        };

        const validarCPF = (cpf) => {
          return cpf && !isNaN(cpf) && cpf.length === 11;
        };

        const validarCNPJ = (cnpj) => {
          return cnpj && !isNaN(cnpj) && cnpj.length === 14;
        };

        const validarValorTotalPrestacoes = (item) => {
          const valorCalculado =
            Number(item["vlTotal"].replace(/[^\d.-]/g, "")) /
            Number(item["qtPrestacoes"]);
          if (
            valorCalculado !== Number(item["vlPresta"].replace(/[^\d.-]/g, ""))
          ) {
            console.log(
              `Erro na validação para nrContrato ${item["nrContrato"]}`
            );
          }
        };

        const converterDatas = (item) => {
          headers.forEach((header) => {
            if (header.includes("dt")) {
              const dateString = item[header];
              if (dateString && dateString.length === 8) {
                const year = dateString.substring(0, 4);
                const month = dateString.substring(4, 6) - 1;
                const day = dateString.substring(6, 8);
                item[header] = new Date(year, month, day);
              }
            }
          });
        };

        dados.forEach((item) => {
          converterMoeda(item);
          if (item["nrCpfCnpj"]) {
            validarCPFouCNPJ(item);
          }
          validarValorTotalPrestacoes(item);
          converterDatas(item);
        });

        const json = JSON.stringify(dados, null, 2);
        console.log("Processo concluído com sucesso!");
        console.log(json);
      } catch (error) {
        console.error(`Erro durante o processamento: ${error.message}`);
      }
    })
    .on("error", (error) => {
      console.error(`Erro ao ler o arquivo CSV: ${error.message}`);
    });

  return dados;
}

const dados = lerCSV("./data.csv");
