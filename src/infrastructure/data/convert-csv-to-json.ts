import csv from 'csv-parser';
import fs from 'fs';
import { Customer } from '../../domain/models/customer.model';

const convertCsvToJson = async (filePath: string) => {
  const results: Customer[] = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      const json = JSON.stringify(results, null, 2);
      fs.writeFileSync('./data.json', json, 'utf-8');
    })
    .on('error', (error) => {
      console.log(error);
    });
};

export default convertCsvToJson;
