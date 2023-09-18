import { createReadStream } from 'node:fs';
import csv from 'csv-parser';

/**
 * @param {Number} value The value brute of the currency
 * @returns {String} The value formatted
 */
const formatCurrency = (value) => {
  const numberFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });
  const currencyFormatted = numberFormat.format(value);

  return currencyFormatted;
};

/**
 * @param {String} document The document of the natural
 * @param {Number} length The quantity of digits to sum and validate
 * @param {Function} callback The function whos will be used to calculate digit
 * @returns {Number} The digit of the result
 */
const calculateDigits = (document, length, callback) => {
  const firstCharacters = document.slice(0, length).split('');
  const sum = firstCharacters.reduce(callback, 0);

  let remainder = 11 - (sum % 11);
  return remainder >= 10 ? 0 : remainder;
}

/**
 * @param {String} document The document of the natural
 * @param {Number} length The quantity of digits to sum and validate
 * @param {Number} digitPosition The whos will be validated
 * @returns {Number} The digit of the result
 */
const calculateDigitNatural = (document, length, digitPosition) => {
  return calculateDigits(document, length, (accum, digit, index) => {
    return accum + parseInt(digit) * (digitPosition - index);
  });
}

/**
 * @param {String} document The document of the juridical
 * @param {Number} length The quantity of digits to sum and validate
 * @param {Number} weightDigit Weight used for calculating the verification digit
 * @returns {Number} the digit of the result
 */
const calculateDigitJuridical = (document, length, weight) => {
  return calculateDigits(document, length, (accum, digit, index) => {
    const total = accum + parseInt(digit) * weight;
    weight = weight === 2 ? 9 : weight - 1;
    return total;
  });
}

/**
 * @param {String | Number} document The document to be validated
 * @returns {Boolean} Returns if the document is valid or not
 */
const validateDocument = (document) => {
  // Removes non numeric characters from the document
  const documentFormatted = String(document).replace(/\D/g, "");
  // Validate if all the characters of the string are equals
  if (/^(\d)\1+$/.test(documentFormatted)) return false;

  const validators = {
    natural: () => {
      const firstDigit = calculateDigitNatural(documentFormatted, 9, 10);
      const secondDigit = calculateDigitNatural(documentFormatted, 10, 11);

      return firstDigit === parseInt(documentFormatted.charAt(9)) &&
        secondDigit === parseInt(documentFormatted.charAt(10));
    },
    juridical: () => {
      const firstDigit = calculateDigitJuridical(documentFormatted, 12, 5);
      const secondDigit = calculateDigitJuridical(documentFormatted, 13, 6);

      return firstDigit === parseInt(documentFormatted.charAt(12)) &&
        secondDigit === parseInt(documentFormatted.charAt(13));
    },
  };

  const currentValidator = documentFormatted.length > 11 ? 'juridical' : 'natural';
  return validators[currentValidator]();
};

/**
 * @param {String} dateString The string whos will be converted to Date
 * @returns {Date}
 */
const convertStringToDate = (dateString) => { 
  const lengths = [4, 2, 2];
  const dateArray = lengths.map((length, index) => {
    const offset = lengths.slice(0, index + 1).reduce((accum, value) => accum + value, 0);
    return dateString.slice(offset - length, offset);
  });

  return new Date(dateArray.join('-'));
}

/**
 * @param {Number} installmentValue The current value of installment to compare
 * @param {Number} installmentLength The length to divide by total
 * @param {Number} total The total should be validated
 * @returns {Boolean} Return if the installment value are equals to total divided by installment length
 */
const validateInstallmentsValue = (installmentValue, installmentLength, total) => {
  const currentInstallment = Number(total / installmentLength).toFixed(2);
  return parseFloat(currentInstallment) === installmentValue;
}

const main = () => {
  let items = [];
  const filepath = 'data.csv';

  createReadStream(filepath)
    .pipe(csv())
    .on('data', (row) => {
      const prestacaoValida = validateInstallmentsValue(
        parseFloat(row.vlPresta),
        parseInt(row.qtPrestacoes),
        parseFloat(row.vlTotal)
      );
      const cpfCnpjValido = validateDocument(row.nrCpfCnpj);


      items.push({
        ...row,
        dtContrato: convertStringToDate(row.dtContrato),
        dtVctPre: convertStringToDate(row.dtVctPre),
        vlTotal: formatCurrency(row.vlTotal),
        vlPresta: formatCurrency(row.vlPresta),
        vlMora: formatCurrency(row.vlMora),
        prestacaoValida,
        cpfCnpjValido,
      });
    })
    .on('end', () => console.table(items));
};

main();