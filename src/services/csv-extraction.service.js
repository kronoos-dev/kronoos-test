import csv from 'csv-parser';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

class CsvExtractionService {
  execute() {
    const data_result = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(
        path.resolve(
          dirname(fileURLToPath(import.meta.url)),
          '..',
          'assets',
          'data.csv',
        ),
      )
        .pipe(csv())
        .on('data', data => data_result.push(data))
        .on('end', () => resolve(data_result))
        .on('error', reject);
    });
  }
}

export default CsvExtractionService;
