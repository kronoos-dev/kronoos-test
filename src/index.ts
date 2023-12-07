let fs = require("fs");
let csv = require("csv-parser");

interface ContractData {
  nrInst: string;
  nrAgencia: string;
  cdClient: string;
  nmClient: string;
  nrCpfCnpj: string;
  nrContrato: string;
  dtContrato: string;
  qtPrestacoes: string;
  vlTotal: string;
  cdProduto: string;
  dsProduto: string;
  cdCarteira: string;
  dsCarteira: string;
  nrProposta: string;
  nrPresta: string;
  tpPresta: string;
  nrSeqPre: string;
  dtVctPre: string;
  vlPresta: string;
  vlMora: string;
  vlMulta: string;
  vlOutAcr: string;
  vlIof: string;
  vlDescon: string;
  vlAtual: string;
  idSituac: string;
  idSitVen: string;
  calcStatus?: string;
  docStatus?: string;
}

type validationStatus = "VALIDO" | "INVALIDO";

export function formatDate(date: string): string {
  const year = parseInt(date.substring(0, 4));
  const month = parseInt(date.substring(4, 6));
  const day = parseInt(date.substring(6, 8));
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    "pt-br"
  );
  return formattedDate;
}

export function numSplitter(item: string): Array<number> {
  return item.split("").map((item) => parseInt(item));
}

export function getCpfDigit(
  document: Array<number>,
  aux: number,
  depth: number
): number {
  let sum: number = 0;
  for (let i = 0; i < depth; i++) {
    sum = sum + document[i] * aux;
    aux--;
  }
  const result = sum % 11;
  return result === 0 ? 0 : 11 - result;
}

export function getCnpjDigit(document: Array<number>, depth: number): number {
  const aux =
    depth > 12
      ? [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum: number = 0;

  for (let i = 0; i < aux.length; i++) {
    sum += document[i] * aux[i];
  }

  const result = sum % 11;
  return result < 2 ? 0 : 11 - result;
}

export function validation(document: Array<number>): validationStatus {
  if (document.length === 11) {
    const firstDigit = getCpfDigit(document, 10, 9);
    const secondDigit = getCpfDigit(document, 11, 10);
    if (firstDigit === document[9] && secondDigit === document[10])
      return "VALIDO";
    else return "INVALIDO";
  } else if (document.length === 14) {
    const firstDigit = getCnpjDigit(document, 12);
    const secondDigit = getCnpjDigit(document, 13);
    if (firstDigit === document[12] && secondDigit === document[13])
      return "VALIDO";
    else return "INVALIDO";
  }
  return "INVALIDO";
}

export function formatCurrency(value: string): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(parseFloat(value))
    .toString();
}

export function calcPrest(vlTotal: number, qtPrest: number): number {
  return +(vlTotal / qtPrest).toFixed(2);
}

export function calcCheck(
  calcVlPrest: number,
  vlPrest: number
): validationStatus {
  return calcVlPrest === vlPrest ? "VALIDO" : "INVALIDO";
}

const results: ContractData[] = [];
fs.createReadStream("./data.csv")
  .pipe(csv())
  .on("data", (data: ContractData) => {
    const valorPrestacao: number = calcPrest(
      parseFloat(data.vlTotal),
      parseFloat(data.qtPrestacoes)
    );

    results.push({
      ...data,
      vlTotal: formatCurrency(data.vlTotal),
      vlAtual: formatCurrency(data.vlAtual),
      vlDescon: formatCurrency(data.vlDescon),
      vlIof: formatCurrency(data.vlIof),
      vlMora: formatCurrency(data.vlMora),
      vlMulta: formatCurrency(data.vlMulta),
      vlOutAcr: formatCurrency(data.vlOutAcr),
      vlPresta: formatCurrency(data.vlPresta),
      dtContrato: formatDate(data.dtContrato),
      dtVctPre: formatDate(data.dtVctPre),
      calcStatus: calcCheck(valorPrestacao, parseFloat(data.vlPresta)),
      docStatus: validation(numSplitter(data.nrCpfCnpj)),
    });
  })
  .on("end", () => {
    console.log(results);
  });
