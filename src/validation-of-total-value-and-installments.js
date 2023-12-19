import { lerCSV } from "./process-csv-data.js";

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

// Seu JSON
const seuJSON = [
  {
    nrContrato: "44358",
    dtContrato: "20230406",
    qtPrestacoes: "7",
    vlTotal: "74155.17",
    vlPresta: "44576.91",
    // ... outros campos
  },
  {
    // Outro objeto...
    qtPrestacoes: "5",
    vlTotal: "25000",
    vlPresta: "5000",
    // ... outros campos
  },
  // ... outros objetos
];

async function checkValueAll() {
  const nomeArquivo = "data.csv";

  const dadosCSV = await lerCSV(nomeArquivo);
  // Verificando consistência das prestações
  checkConsistency(dadosCSV);
}

checkValueAll();
