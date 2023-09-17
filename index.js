import { createReadStream } from 'node:fs'
import csv from 'csv-parser'
import csvTransformHandler from './usecases/transform.js'

const parseCsvToArray = csvDataPath => {
  const results = []
  createReadStream(csvDataPath)
    .pipe(csv())
    .pipe(csvTransformHandler)
    .on('data', chunk => {
      results.push(chunk)
    })
    .on('end', () => {
      console.log(results)
    })
}

parseCsvToArray('./data.csv')

export default parseCsvToArray
