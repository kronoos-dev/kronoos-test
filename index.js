import fs from 'fs';
import csv from 'csv-parser'
import { validateCpfCnpj, validatePrest, numberToCurrency, dateFromString, calculatePrestValue } from './utils.js';

const adaptCsvData = (docName) => {
    const results = [];
    fs.createReadStream(docName)
        .pipe(csv())
        .on('data', (data) => {
            if (!validateCpfCnpj(data)){ // no need to continue since is invalid
                return;
            }
            if (!validatePrest(data)) {
                data.vlPresta = String(calculatePrestValue(data));
            }
            data.dtContrato = dateFromString(data.dtContrato);
            data.dtVctPre = dateFromString(data.dtVctPre);

            for (const [key, value] of Object.entries(data)) {
                if (key.substring(0, 2) === 'vl'){
                    data[key] = numberToCurrency(value);
                }
            }
            results.push(data);
        })
        .on('end', () => {
            return results;
        });
}