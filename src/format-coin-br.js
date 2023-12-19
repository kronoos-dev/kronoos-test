import { readCSV } from "./process-csv-data.js";

function formatarMoedaBRL(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parseFloat(valor));
}

function formatarValoresMonetarios(objeto) {
  const chaves = Object.keys(objeto);

  for (const chave of chaves) {
    if (!isNaN(parseFloat(objeto[chave]))) {
      objeto[chave] = formatarMoedaBRL(objeto[chave]);
    }
  }
}

// Função para percorrer e formatar os valores monetários no JSON
async function formatarJSONComoMoeda(json) {
  const nomeArquivo = "data.csv";

  const dadosCSV = await readCSV(nomeArquivo);

  for (let i = 0; i < dadosCSV.length; i++) {
    formatarValoresMonetarios(dadosCSV[i]);
  }

  return dadosCSV;
}

// Seu JSON de exemplo
const seuJSON = [
  {
    nrContrato: "44358",
    dtContrato: "20230406",
    vlTotal: "74155.17",
    vlPresta: "44576.91",
    vlMora: "25016.76",
    vlMulta: "73284.22",
    // ... outros campos
  },
  {
    nrInst: "222",
    // ... outros campos
    vlPresta: "37625.56",
    vlMora: "65691.61",
    vlMulta: "3079.16",
    // ... outros campos
  },
  // ... outros objetos
];

// Chamada da função para formatar os valores monetários
const jsonFormatado = await formatarJSONComoMoeda(seuJSON);
console.log(jsonFormatado);
