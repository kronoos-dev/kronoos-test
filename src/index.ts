import * as fields from "./fields/index"
import { Row } from "./interfaces/sheet";
import { regexs } from "./regex";
import * as utils from './utils/index';

const fs = require('fs');
const { parse } = require('csv-parse');

export async function init() {
    const data = await getDataFromCsv();

    fs.writeFileSync('./src/.temp/dataParsed.json', JSON.stringify(data), (err: any) => {
        if (err) console.log(err);
    });
};

async function getDataFromCsv() {
    try {
        const data = await readCsv();
        parseFields(data);

        return data;
    } catch (err) {
        return err;
    };
};

async function readCsv() {
    try {
        const rows: Row[] = [];

        const stream = fs.createReadStream("./data.csv");

        const pipe = stream.pipe(parse({
            columns: true,
        }));

        await new Promise((resolve: any, reject: any) => {
            pipe.on("data", (row: Row) => {
                rows.push(row);
            });
            pipe.on("error", (err: any) => {
                reject(err);
            });
            pipe.on("end", () => {
                resolve();
            });
        });
        
        return rows;
    } catch (err: any) {
        return err;
    };
};

export function parseFields(list: Row[] | undefined) {
    const monetaryFieldsParsed = parseMonetaryFields(list);
    const validatedDocuments = validateDocuments(monetaryFieldsParsed);
    const validatedValuesAndInstallments = validateValuesAndInstallments(validatedDocuments);
    const dataParsed = parseDates(validatedValuesAndInstallments);

    return dataParsed;
};

export function parseMonetaryFields(list: Row[] | any) {
    try {
        const data = list.filter((row: Row | any) => {
            for (let i = 0; i < fields.monetary.length; i++) {
                const valueParsed = utils.convertToBRL(row[fields.monetary[i]]);

                row[fields.monetary[i]] = valueParsed;
            };

            return row;
        });

        return data;
    } catch (err: any) {
        return err;
    };
};

export function validateDocuments(list: any) {
    const data = list.map((row: any) => {
        const isCPF = row['nrCpfCnpj'].match(regexs.cpfVerification);
        const isCNPJ = row['nrCpfCnpj'].match(regexs.cnpjVerification);

        if (isCPF) {
            row.nrCpfCnpj = row['nrCpfCnpj'].replace(regexs.cpfVerification, '$1.$2.$3-$4');

            return row;
        } else if (isCNPJ) {
            row.nrCpfCnpj = row['nrCpfCnpj'].replace(regexs.cnpjVerification, '$1.$2.$3/$4-$5');

            return row;
        } else {
            row.nrCpfCnpj = "CPF/CNPJ inválido"

            return row;
        }
    });

    return data;
};

export function validateValuesAndInstallments(list: any) {
    try {
        const data = list.map((row: any) => {
            const vlTotal = parseFloat(row.vlTotal.replace('R$', '').trim().replace(',', '.'));
            const vlPresta = parseFloat(row.vlPresta.replace('R$', '').trim().replace(',', '.'));
            const qtPrestacoes = parseInt(row.qtPrestacoes, 10);

            const result = vlTotal / qtPrestacoes;

            const isResultEqualToInstallmentValue = result == vlPresta;

            const rowParsed = { ...row, isPrestValueValid: isResultEqualToInstallmentValue ? true : false }

            return rowParsed;
        });

        return data;
    } catch (err) {
        console.log(err);
        return err;
    };
};

export function parseDates(list: Row[]) {
    const data = list.map((row: Row) => {
        row.dtContrato = utils.formatDate(row.dtContrato);
        row.dtVctPre = utils.formatDate(row.dtVctPre);

        return row;
    });

    return data;
};

init();