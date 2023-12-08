import fs from 'node:fs'
import path, { parse } from 'node:path'
import csvParser from 'csv-parser'
import { cnpj, cpf } from 'cpf-cnpj-validator';
import assert from 'node:assert';

interface CsvLine {
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

interface ParsedCsvLine extends CsvLine {
  validQtPrestacoes: number
  parsedDtContrato: Date | undefined
  parsedDtVctPre: Date | undefined
}

function convertMoney(value: string): string {
  if (!value) throw new Error('value is mandatory')

  const parsedValue = Number(value)

  const result = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parsedValue)

  // check result contains R$
  assert.ok(result.includes('R$'))

  return result
}

function cpfCnpjIsValid(data: string): boolean {
  if (!data) return false

  const isCpf = cpf.isValid(data)

  if (isCpf) return true

  const isCnpf = cnpj.isValid(data)

  if (isCnpf) return true

  return false
}

function validateQtdPrest(line: CsvLine): number {
  const result = Number(line.vlTotal) / Number(line.qtPrestacoes)

  assert.ok(typeof result === 'number')

  return result
}

function parseDate(date: string): Date {
  const year = Number(date.substring(0, 4))
  const month = Number(date.substring(4, 6))
  const day = Number(date.substring(6, 8))

  const result = new Date(year, month - 1, day)

  assert.ok(result instanceof Date)
  assert.ok(result.getDate() === day)
  assert.ok(result.getMonth() === month - 1)
  assert.ok(result.getFullYear() === year)

  return result
}

function main() {
  console.time('process done')

  const filePath = path.resolve('data.csv')

  const csv = csvParser()

  const result: ParsedCsvLine[] = []

  fs.createReadStream(filePath)
    .pipe(csv)
    .on('data', (line: CsvLine) => {
      const nrCpfCnpjIsValid = cpfCnpjIsValid(line.nrCpfCnpj)

      const vlTotal = convertMoney(line.vlTotal)

      const vlPresta = convertMoney(line.vlPresta)

      const vlMora = convertMoney(line.vlMora)

      result.push({
        ...line,
        vlTotal,
        vlPresta,
        vlMora,
        validQtPrestacoes: validateQtdPrest(line),
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