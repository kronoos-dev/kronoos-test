import csv from 'csv-parser'
import fsp from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import {
  formatCurrency,
  makeDateType,
  validaValorDaPrestacao,
  validateCPForCNPJ,
} from './utils'

type Data = {
  nrInst: string
  nrAgencia: string
  cdClient: string
  nmClient: string
  nrCpfCnpj: string
  nrContrato: string
  dtContrato: string | Date
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
  dtVctPre: string | Date
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

let newResults: Data[] = []

async function main() {
  const p = path.join(__dirname, '..', 'assets', 'data.csv')
  let csvData: Data[] = await readCSV(p)

  newResults = csvData.map((value: Data) => {
    value.vlPresta = validaValorDaPrestacao(
      value.vlTotal,
      value.qtPrestacoes,
      value.vlPresta
    )

    value.dtContrato = makeDateType(value.dtContrato as string)
    value.dtVctPre = makeDateType(value.dtVctPre as string)

    value.vlTotal = formatCurrency(parseInt(value.vlTotal))
    value.vlPresta = formatCurrency(parseInt(value.vlPresta))
    value.vlMora = formatCurrency(parseInt(value.vlMora))
    if (validateCPForCNPJ(value.nrCpfCnpj)) {
      console.log(`O CPF/CNPJ ${value.nrCpfCnpj} é inválido`)
    }
    return value
  })

  console.log(newResults)

  // READING CSV USING EXTERNAL LIB csv-parser

  // fs.createReadStream(path.join(__dirname, '..', 'assets', 'data.csv'))
  //   .pipe(csv())
  //   .on('data', (data: Data) => results.push(data))
  //   .on('end', () => {
  //     results.map((value: Data) => {
  //       value.vlPresta = validaValorDaPrestacao(
  //         value.vlTotal,
  //         value.qtPrestacoes,
  //         value.vlPresta
  //       )

  //       value.dtContrato = makeDateType(value.dtContrato as string)
  //       value.dtVctPre = makeDateType(value.dtVctPre as string)

  //       value.vlTotal = formatCurrency(parseInt(value.vlTotal))
  //       value.vlPresta = formatCurrency(parseInt(value.vlPresta))
  //       value.vlMora = formatCurrency(parseInt(value.vlMora))
  //       if (validateCPForCNPJ(value.nrCpfCnpj)) {
  //         console.log(`O CPF/CNPJ ${value.nrCpfCnpj} é inválido`)
  //       }
  //       return value
  //     })
  //   })
}

//READING CSV WITHOUT USING ANY EXTERNAL LIB
const readCSV = async (path: string) => {
  let csvData: Data[] = []
  const data = await fsp.readFile(path, 'utf-8')
  const rows = data.split('\n')
  for (const row of rows) {
    if (row.trim() !== '') {
      const columns = row.split(',')
      const rowData: Data = {
        nrInst: columns[0],
        nrAgencia: columns[1],
        cdClient: columns[2],
        nmClient: columns[3],
        nrCpfCnpj: columns[4],
        nrContrato: columns[5],
        dtContrato: columns[6],
        qtPrestacoes: columns[7],
        vlTotal: columns[8],
        cdProduto: columns[9],
        dsProduto: columns[10],
        cdCarteira: columns[11],
        dsCarteira: columns[12],
        nrProposta: columns[13],
        nrPresta: columns[14],
        tpPresta: columns[15],
        nrSeqPre: columns[16],
        dtVctPre: columns[17],
        vlPresta: columns[18],
        vlMora: columns[19],
        vlMulta: columns[20],
        vlOutAcr: columns[21],
        vlIof: columns[22],
        vlDescon: columns[23],
        vlAtual: columns[24],
        idSituac: columns[25],
        idSitVen: columns[26],
      }
      csvData.push(rowData)
    }
  }
  return csvData
}

main()
