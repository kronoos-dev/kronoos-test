import csv from 'csv-parser';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dateFormatter from '../utils/date-formatter.js';
import currencyFormatter from '../utils/currency-formatter.js';
import removeDuplicatedObj from '../utils/remove-duplicated-obj.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

class CsvExtractionService {
  execute() {
    const data_result = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(path.resolve(__dirname, '..', 'assets', 'data.csv'))
        .pipe(csv())
        .on('data', data => {
          // if (
          //   currencyFormatter.format(data['vlTotal']) /
          //     currencyFormatter.format(data['qtPrestacoes']) !==
          //   currencyFormatter.format(data['vlPresta'])
          // ) {
          //   console.log(
          //     'era pra ser: ',
          //     currencyFormatter.format(data['vlTotal'] / data['qtPrestacoes']),
          //     'é:',
          //     currencyFormatter.format(data['vlPresta']),
          //   );
          // }

          data_result.push({
            ...data,
            vlTotal: currencyFormatter.format(data['vlTotal']),
            vlPresta: currencyFormatter.format(data['vlPresta']),
            vlMora: currencyFormatter.format(data['vlMora']),
            dtContrato: dateFormatter(data['dtContrato']),
          });
        })
        .on('end', () => resolve(data_result))
        .on('error', reject);
    });
  }
}

export default CsvExtractionService;
