const fs = require("fs");
const csv = require("csv-parser");
const validator = require('cpf-cnpj-validator');

exports.formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(val);
}

exports.formatData = (data) => {
    let year = data.substring(0, 4);
    let month = data.substring(5, 6);
    let day = data.substring(7, 8);
    let date = new Date(Date.UTC(year, month, day));
    return Intl.DateTimeFormat('pt-BR').format(date);
}

exports.validCnpjOrCpf = (str) => {
    return !!(validator.cpf.isValid(str) || validator.cnpj.isValid(str));
}

exports.processFile = async () => {
    const records = [];
    const parser = fs
        .createReadStream('data.csv')
        .pipe(csv({
            // CSV options if any
        }));
    for await (const record of parser) {
        // Work with each record
        records.push(record);
    }
    return records;
};