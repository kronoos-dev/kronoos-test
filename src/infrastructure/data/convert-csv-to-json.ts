import csv from 'csv-parser'
import fs from 'fs'
import getFileDirectoryFromRoot from '../files/get-file-directory-from-root'
import { Customer } from '../../model/customer.model';

const convertCsvToJson = async () => {
    const filePath = getFileDirectoryFromRoot('data.csv');
    const results: Customer[] = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data)
        })
        .on("end", () => {
            const json = JSON.stringify(results, null, 2);
            fs.writeFileSync("./data.json", json, "utf-8");
        });
}

export default convertCsvToJson
