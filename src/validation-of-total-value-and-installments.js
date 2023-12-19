import { readCSV } from "./process-csv-data.js";

function checkConsistency(json) {
  json.forEach((item, index) => {
    const vlTotal = parseFloat(item.vlTotal);
    const qtPrestacoes = parseFloat(item.qtPrestacoes);
    const vlPresta = parseFloat(item.vlPresta);

    if (vlTotal && qtPrestacoes && vlPresta) {
      const resultadoDivisao = vlTotal / qtPrestacoes;

      if (resultadoDivisao !== vlPresta) {
        console.log(`Prestação ${index + 1} está inconsistente.`);
        console.log(`Resultado da divisão: ${resultadoDivisao}`);
        console.log(`Valor da prestação: ${vlPresta}`);
      } else {
        console.log(`Prestação ${index + 1} está consistente.`);
      }
    } else {
      console.log(`Prestação ${index + 1} possui valores inválidos.`);
    }
  });
}

async function checkValueAll() {
  const nomeArquivo = "data.csv";
  const dadosCSV = await readCSV(nomeArquivo);
  checkConsistency(dadosCSV);
}

checkValueAll();
