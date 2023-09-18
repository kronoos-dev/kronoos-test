/**
 * @param {Number} installmentValue The current value of installment to compare
 * @param {Number} installmentLength The length to divide by total
 * @param {Number} total The total should be validated
 * @returns {Boolean} Return if the installment value are equals to total divided by installment length
 */
export const validateInstallmentsValue = (installmentValue, installmentLength, total) => {
  const currentInstallment = Number(total / installmentLength).toFixed(2);
  return parseFloat(currentInstallment) === installmentValue;
}