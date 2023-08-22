import { createReadStream } from "fs";
import csv from 'csv-parser'

export class CSVParser {
  data: Array<any>

  constructor() {
    this.data = []
  }

  async convert(csvPath: string) {
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