import formatCurrencyToBRL from '../helpers/currencyFormatter.js'

const isValidInstallment = (amount, installments, installment) => {
  const installmentValue = parseFloat(amount) / parseInt(installments, 10)
  return installmentValue !== parseFloat(installment)
    ? 'Valor inconsistente: ' + formatCurrencyToBRL(installment)
    : formatCurrencyToBRL(installment)
}

export default isValidInstallment
