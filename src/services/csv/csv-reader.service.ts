/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs'
import csvParser from 'csv-parser'
import path from 'path'

const csvFilePath = path.join(__dirname, '../../../data.csv')

async function readCsv(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const dataArray: any[] = []

    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        dataArray.push(row)
      })
      .on('end', () => {
        resolve(dataArray)
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

export default readCsv
