import { lerCSV } from "./process-csv-data.js";

function converterParaData(json) {
  json.forEach((item, index) => {
    if (item.dtContrato && item.dtContrato.length === 8) {
      const ano = item.dtContrato.substring(0, 4);
      const mes = item.dtContrato.substring(4, 6);
      const dia = item.dtContrato.substring(6, 8);
      const dataContrato = new Date(`${ano}-${mes}-${dia}`);
      json[index].dtContrato = dataContrato;
    } else {
      console.log(`Formato inválido para dtContrato na posição ${index + 1}`);
    }

    if (item.dtVctPre && item.dtVctPre.length === 8) {
      const ano = item.dtVctPre.substring(0, 4);
      const mes = item.dtVctPre.substring(4, 6);
      const dia = item.dtVctPre.substring(6, 8);
      const dataVctPre = new Date(`${ano}-${mes}-${dia}`);
      json[index].dtVctPre = dataVctPre;
    } else {
      console.log(`Formato inválido para dtVctPre na posição ${index + 1}`);
    }
  });
  return json;
}

// Seu JSON
const seuJSON = [
  {
    nrContrato: "44358",
    dtContrato: "20230406",
    dtVctPre: "20230213",
    // ... outros campos
  },
  {
    // Outro objeto...
    dtContrato: "20230415",
    dtVctPre: "20230420",
    // ... outros campos
  },
  // ... outros objetos
];

async function convertingDates() {
  const nomeArquivo = "data.csv";

  const dadosCSV = await lerCSV(nomeArquivo);

  // Convertendo para objetos Date
  //converterParaData(seuJSON);
  console.log("datas convertidas:", converterParaData(dadosCSV));
}

convertingDates();
