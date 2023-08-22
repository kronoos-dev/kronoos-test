
const fs = require('fs');
const csvParser = require('csv-parser');

const csvCurrencyFormat = (value) => {
    if (!value) return 0;

    return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(value)
};

const csvDateFormat = (date) => {
    if (!date || date.length < 8) return null;

    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return new Date(`${year}-${month}-${day}`);
};

const isValidTotal = (value, len, total) => {
    return (parseFloat(value) / parseFloat(len)) === parseFloat(total);
}

const isValidCpf = (value) => {
    if (typeof value !== 'string') return false;

    value = value.replace(/[^0-9]/g, '');

    if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) return false;

    value = value.split('').map((el) => +el);

    const rest = (count) =>
        ((value
            .slice(0, count - 12)
            .reduce((sum, el, index) => sum + el * (count - index), 0) *
            10) %
            11) %
        10;

    return rest(10) === value[9] && rest(11) === value[10];
};

const isValidCnpj = (value) => {
    const invalidCNPJ = [
        '00000000000000',
        '11111111111111',
        '22222222222222',
        '33333333333333',
        '44444444444444',
        '55555555555555',
        '66666666666666',
        '77777777777777',
        '88888888888888',
        '99999999999999',
    ];

    if (typeof value !== 'string') return false;

    value = value.replace(/[^0-9]/g, '');

    if (invalidCNPJ.includes(value) || value.length !== 14) {
        return false;
    }

    let len = value.length - 2;
    let numbers = value.substring(0, len);
    const digits = value.substring(len);
    let sum = 0;
    let pos = len - 7;

    for (let i = len; i >= 1; i--) {
        sum += numbers.charAt(len - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(0)) {
        return false;
    }

    len = len + 1;
    numbers = value.substring(0, len);
    sum = 0;
    pos = len - 7;
    for (let k = len; k >= 1; k--) {
        sum += numbers.charAt(len - k) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(1)) {
        return false;
    }

    return true;
};

const csvParse = async (filePath) => {
    return new Promise((resolve, reject) => {

        if (!fs.existsSync(filePath)) {
            reject(`File not found`)
        }

        let result = [];

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {

                row.validaCpfCnpj = isValidCpf(row.nrCpfCnpj) || isValidCnpj(row.nrCpfCnpj);
                row.validaPrest = isValidTotal(row.vlPresta, row.qtPrestacoes, row.vlTotal)

                row.dtContrato = csvDateFormat(row.dtContrato)
                row.dtVctPre = csvDateFormat(row.dtVctPre)

                row.vlTotal = csvCurrencyFormat(row.vlTotal);
                row.vlPresta = csvCurrencyFormat(row.vlPresta);
                row.vlMora = csvCurrencyFormat(row.vlMora);
                row.vlMulta = csvCurrencyFormat(row.vlMulta);
                row.vlOutAcr = csvCurrencyFormat(row.vlOutAcr);
                row.vlIof = csvCurrencyFormat(row.vlIof);
                row.vlDescon = csvCurrencyFormat(row.vlDescon);
                row.vlAtual = csvCurrencyFormat(row.vlAtual);

                result.push(row);
            })
            .on('end', () => {
                resolve(result);
            });

    })
};

module.exports = {
    csvParse,
    csvCurrencyFormat,
    csvDateFormat,
    isValidTotal,
    isValidCpf,
    isValidCnpj
}
