import { createReadStream } from "fs";
import csv from 'csv-parser'

interface Item {
  nrInst: string
  nrAgencia: string
  cdClient: string
  nmClient: string
  nrCpfCnpj: any
  nrContrato: string
  dtContrato: any
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
  dtVctPre: any
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
export class CSVParser {
  data: Array<Item>

  constructor() {
    this.data = []
  }

  async convert(csvPath: string): Promise<Array<Item>> {
    return new Promise((resolve, reject) => {
      createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => this.data.push(row))
        .on('end', () => {
          resolve(this.data)
        })
        .on('error', (err) => {
          console.error(`Erro ao processar arquivo.`)
          reject(err)
        })
    })

  }
}