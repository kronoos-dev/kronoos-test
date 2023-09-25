import { CsvData } from "../Model/csvModel"


export default function validateTotalAndInstallments(params: CsvData) {
  const {qtPrestacoes, vlPresta, vlTotal} = params

  return vlTotal + qtPrestacoes === vlPresta
} 