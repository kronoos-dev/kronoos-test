/**
 * Formats a value as BRL currency.
 * @param {number} value - The value to be formatted as BRL currency.
 * @returns {string} - The value formatted as BRL currency.
 */
function formatToBRL(value) {
  const formattedValue = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(value);
  return `R$ ${formattedValue}`;
}

/**
 * Validates CPF (Brazilian Individual Taxpayer Registry) or CNPJ (National Register of Legal Entities).
 * @param {string} document - The CPF or CNPJ to be validated.
 * @returns {boolean} - True if the CPF or CNPJ is valid, otherwise false.
 */
function validateDocument(document) {
  document = document?.replace(/[^\d]/g, ''); // Remove non-numeric characters

  if (document?.length === 11) {
    // CPF
    if (/^(\d)\1{10}$/.test(document)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(document.charAt(i)) * (10 - i);
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(document.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(document.charAt(i)) * (11 - i);
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    return result === parseInt(document.charAt(10));
  } else if (document?.length === 14) {
    // CNPJ
    if (/^(\d)\1{13}$/.test(document)) return false;

    let sum = 0;
    let factor = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(document.charAt(i)) * factor;
      factor = (factor === 2) ? 9 : factor - 1;
    }

    const result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(document.charAt(12))) return false;

    sum = 0;
    factor = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(document.charAt(i)) * factor;
      factor = (factor === 2) ? 9 : factor - 1;
    }

    return sum % 11 < 2 ? parseInt(document.charAt(13)) === 0 : 11 - (sum % 11) === parseInt(document.charAt(13));
  } else {
    // Invalid size for CPF or CNPJ
    return false;
  }
}

/**
 * Formats date and currency fields in a data row.
 * @param {Object} row - The data row to be formatted.
 * @returns {Object} - The formatted data row.
 */
function formatFields(row) {
  const data = { ...row }
  data.dtContrato = new Date(data.dtContrato.substr(0, 4), data.dtContrato.substr(4, 2) - 1, data.dtContrato.substr(6, 2));
  data.dtVctPre = new Date(data.dtVctPre.substr(0, 4), data.dtVctPre.substr(4, 2) - 1, data.dtVctPre.substr(6, 2));
  data.vlTotal = formatToBRL(data.vlTotal);
  data.vlPresta = formatToBRL(data.vlPresta);
  data.vlMora = formatToBRL(data.vlMora);

  return data;
}

module.exports = {
  formatFields,
  validateDocument,
  formatToBRL
}