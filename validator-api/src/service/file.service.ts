import fs from "fs";
import csvParser from "csv-parser";
import {COLLUMNS} from "../enum/columns.enum";
import {validateItem} from "../util/validateItem";

export class FileService {
    public fileExtensionValidation(file: File) {
        // @ts-ignore
        const extension = file.originalname.split('.');
        return extension[1] === 'csv'
    }

    public async readFile(file: File) {
        return new Promise((resolve): any => {
            const headers = [];
            const data = []
            // @ts-ignore
            fs.createReadStream(file.path)
                .pipe(csvParser())
                .on('headers', (header) => headers.push(header))
                .on("data", row => data.push(row))
                .on("end", async () => {
                    await Promise.all(headers);
                    await Promise.all(data);
                    resolve({headers, data});
                })
        })
    }


    public headerValidation(headers: JSON[]) {
        let formattedHeader = []
        for (const header of headers) {
            formattedHeader.push(header.toString().toUpperCase());
        }
        const hasColumn = (currentValue) => formattedHeader.includes(currentValue);
        return COLLUMNS.every(hasColumn);

    }

    public validateData(data: JSON[]) {
        let hasError = false;
        for (const item of data) {
            Object.keys(item).forEach(function (key) {
                item[key] = validateItem(key, item)
                if (item[key].hasError === true) {
                    hasError = true;
                }
            })
        }

        return {validatedData:data, hasError};
    }


}

