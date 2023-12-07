import fs from 'fs'
import csv from 'csv-parser'

export const csv2Json = <T>(filePath: string): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        const lines: T[] = []
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('header', (headers) => headers.push(headers))
            .on('data', (data: T) => lines.push(data))
            .on('end', () => resolve(lines))
            .on('error', (error) => reject(error))
    })
}