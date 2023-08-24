import fs from 'fs';
import csv from 'csv-parser';
import { CSVRow } from './csvRow';

async function parseCSV(filePath: string): Promise<CSVRow[]> {
  const results: CSVRow[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data as CSVRow))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(`Error reading CSV: ${error.message}`));
  });
}

export { parseCSV };
