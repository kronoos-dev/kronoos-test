
import fs from 'fs'
import csv from 'csv-parser'

export const CSVRead = (dataCallback, endCallback) => fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', dataCallback)
    .on('end', endCallback);


export const validatePrestationCalculation = (vlTotal, qtPrestacoes, vlPresta) => ((vlTotal / qtPrestacoes) === vlPresta)

export function convertToDate(yyyymmdd) {
    const year = yyyymmdd.slice(0, 4);
    const month = yyyymmdd.slice(4, 6) - 1; // Months are zero-indexed
    const day = yyyymmdd.slice(6, 8);
    return new Date(year, month, day);
}

export function validNrCpfCnpj(value) {

    const isValidCpf = validateCPF(value)
    const isValidCnpj = validateCNPJ(value)


    return {
        isValidCpf,
        isValidCnpj
    }


}



function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove characters that are not digits

    if (cpf.length !== 11) {
        return false;
    }

    // Check for common invalid CPFs
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf[i - 1]) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
    }

    if (remainder !== parseInt(cpf[9])) {
        return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
    }

    if (remainder !== parseInt(cpf[10])) {
        return false;
    }

    return true;
}


function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, ''); // Remove characters that are not digits

    if (cnpj.length !== 14) {
        return false;
    }

    // Check for common invalid CNPJs
    if (/^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) {
        return false;
    }

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) {
        return false;
    }

    return true;
}
