import * as fs from 'fs';
import * as csv from 'csv-parser';
import {NumberFormat} from "intl";

// Function to format a number as BRL currency
function formatToBRL(number) {
    return NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(number);
}

function isValidCPF(cpf) {

    // Check if the CPF has the correct length
    if (cpf.length !== 11) {
        return false;
    }

    // Calculate and verify the first CPF verification digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Calculate and verify the second CPF verification digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    return remainder === parseInt(cpf.charAt(10));


}

// Function to validate CNPJ (Cadastro Nacional da Pessoa Jurídica)
function isValidCNPJ(cnpj) {

    // Check if the CNPJ has the correct length
    if (cnpj.length !== 14) {
        return false;
    }

    // Calculate and verify the first CNPJ verification digit
    let sum = 0;
    let multiplier = 5;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * multiplier;
        if (multiplier === 2) {
            multiplier = 9;
        } else {
            multiplier--;
        }
    }
    let remainder = sum % 11;
    if (remainder < 2) {
        if (parseInt(cnpj.charAt(12)) !== 0) {
            return false;
        }
    } else {
        if (parseInt(cnpj.charAt(12)) !== 11 - remainder) {
            return false;
        }
    }

    // Calculate and verify the second CNPJ verification digit
    sum = 0;
    multiplier = 6;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * multiplier;
        if (multiplier === 2) {
            multiplier = 9;
        } else {
            multiplier--;
        }
    }
    remainder = sum % 11;
    if (remainder < 2) {
        if (parseInt(cnpj.charAt(13)) !== 0) {
            return false;
        }
    } else {
        if (parseInt(cnpj.charAt(13)) !== 11 - remainder) {
            return false;
        }
    }

    return true;
}

function formatToDate(dateString) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    return new Date(year, month - 1, day);
}

function processCSV(filePath) {
    const results = [];
    let counter = 0;
    fs.createReadStream(filePath)
        .pipe(csv({skipComments: true}))
        .on('data', (data) => {
                counter++;
                if (!isValidCPF(data.nrCpfCnpj) && !isValidCNPJ(data.nrCpfCnpj)) return;
                const vl = data.vlTotal / data.qtPrestacoes;
                if (vl != data.vlPresta) return;

                const vlTotal = formatToBRL(parseFloat(data.vlTotal));
                const vlPresta = formatToBRL(parseFloat(data.vlPresta));
                const vlMora = formatToBRL(parseFloat(data.vlMora));
                const dtContrato = formatToDate(data.dtContrato);
                const dtVctPre = formatToDate(data.dtVctPre);
                results.push({...data, vlTotal, vlPresta, vlMora, dtContrato, dtVctPre})
            }
        )
        .on('end', () => {
            // Print the processed data
            console.log(results);
            console.log(counter);
        });
}

processCSV('./data.csv')