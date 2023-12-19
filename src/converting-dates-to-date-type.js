import { readCSV } from "./process-csv-data.js";

function converterData(dataString) {
  if (dataString && dataString.length === 8) {
    const ano = dataString.substring(0, 4);
    const mes = dataString.substring(4, 6) - 1; // Mês é indexado de 0 a 11 no JavaScript
    const dia = dataString.substring(6, 8);
    return new Date(ano, mes, dia);
  } else {
    console.log("Formato de data inválido:", dataString);
    return null;
  }
}

function formatDataBrasileira(data) {
  if (data instanceof Date && !isNaN(data)) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return data.toLocaleDateString("pt-BR", options);
  } else {
    console.log("Data inválida:", data);
    return null;
  }
}

function convertDateForObjectResult(dataArray) {
  return dataArray.map((item) => ({
    ...item,
    dtContrato: converterData(item.dtContrato),
    dtVctPre: converterData(item.dtVctPre),
  }));
}

function formatDatesBrasileiras(dataArray) {
  return dataArray.map((item) => ({
    ...item,
    dtContrato: formatDataBrasileira(item.dtContrato),
    dtVctPre: formatDataBrasileira(item.dtVctPre),
  }));
}

async function convertingDates() {
  const nameArquivo = "data.csv";
  const dataCSV = await readCSV(nameArquivo);
  const dataForObjectDate = convertDateForObjectResult(dataCSV);

  const dataFormatted = formatDatesBrasileiras(dataForObjectDate);

  console.log(dataFormatted);

  //console.log("datas convertidas:", convertToDate(dataCSV));
}

convertingDates();
