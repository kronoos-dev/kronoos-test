import { convertMoney } from "./convertMoney"

export interface CsvLine {
  nrInst: string
  nrAgencia: string
  cdClient: string
  nmClient: string
  nrCpfCnpj: string
  nrContrato: string
  dtContrato: string
  qtPrestacoes: string
  vlTotal: string
  cdProduto: string
  dsProduto: string
  cdCarteira: string
  dsCarteira: string
  nrProposta: string
  nrPresta: string
  tpPresta: string
  nrSeqPre: string
  dtVctPre: string
  vlPresta: string
  vlMora: string
  vlMulta: string
  vlOutAcr: string
  vlIof: string
  vlDescon: string
  vlAtual: string
  idSituac: string
  idSitVen: string
}

export interface ParsedCsvLine extends CsvLine {
  validVlPresta: string
  vlPrestaIsValid: boolean
  parsedDtContrato: Date | undefined
  parsedDtVctPre: Date | undefined
}

export function validatePrest(line: CsvLine) {
  const validValue = Number(line.vlTotal) / Number(line.qtPrestacoes)

  return {
    validValue: convertMoney(String(validValue)),
    isValid: validValue === Number(line.vlPresta)
  }
}