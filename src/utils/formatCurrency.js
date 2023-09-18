/**
 * @param {Number} value The value brute of the currency
 * @returns {String} The value formatted
 */
export const formatCurrency = (value) => {
  const numberFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });
  const currencyFormatted = numberFormat.format(value);

  return currencyFormatted;
};