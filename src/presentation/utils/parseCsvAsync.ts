// Dependencies
import csvParser from 'csv-parser'
import { createReadStream } from 'fs'

// Async csv parser
export const parseCsvAsync = <T>(filePath: string): Promise<T[]> => {
  const extractedList: T[] = []

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath)
    
    readStream.on('error', (error) => reject(error))

    readStream
      .pipe(csvParser())
      .on('data', (data) => extractedList.push(data))
      .on('end', () => resolve(extractedList))
  })
}
