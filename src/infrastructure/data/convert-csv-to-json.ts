import csv from 'csv-parser';
import fs from 'fs';
import CustomerDto from '../../presentation/dtos/customer.dto';
import convertCsvRowToObject from './convert-csv-row-to-object';

const convertCsvToJson = async (filePath: string) => {
  const results: CustomerDto[] = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push(convertCsvRowToObject(data));
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
