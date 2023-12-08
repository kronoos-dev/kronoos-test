import fs from 'node:fs'
import path, { parse } from 'node:path'
import csvParser from 'csv-parser'
import { CsvLine, ParsedCsvLine, validatePrest } from './helpers'
import { convertMoney } from './helpers/convertMoney'
import { cpfCnpjIsValid } from './helpers/cpfCnpjIsValid'
import { parseDate } from './helpers/parseDate'


function main() {
  console.time('process done')

  const filePath = path.resolve('data.csv')

  const csv = csvParser()

  const result: ParsedCsvLine[] = []

  fs.createReadStream(filePath)
    .pipe(csv)
    .on('data', (line: CsvLine) => {
      const nrCpfCnpjIsValid = cpfCnpjIsValid(line.nrCpfCnpj)

      const validPrest = validatePrest(line)

      result.push({
        ...line,
        vlTotal: convertMoney(line.vlTotal),
        vlPresta: convertMoney(line.vlPresta),
        vlMora: convertMoney(line.vlMora),
        vlAtual: convertMoney(line.vlAtual),
        vlDescon: convertMoney(line.vlDescon),
        vlIof: convertMoney(line.vlIof),
        vlMulta: convertMoney(line.vlMulta),
        vlOutAcr: convertMoney(line.vlOutAcr),
        validVlPresta: validPrest.validValue,
        vlPrestaIsValid: validPrest.isValid,
        nrCpfCnpj: nrCpfCnpjIsValid ? line.nrCpfCnpj : `${line.nrCpfCnpj}-INVALID`,
        dtContrato: line.dtContrato,
        parsedDtContrato: parseDate(line.dtContrato),
        dtVctPre: line.dtVctPre,
        parsedDtVctPre: parseDate(line.dtVctPre)
      })
    })
    .on('end', () => {
      // console.log(result)
      console.timeEnd('process done')
    })
}

main()