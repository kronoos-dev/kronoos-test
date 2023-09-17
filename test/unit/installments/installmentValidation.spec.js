import formatCurrencyToBRL from '../../../commons/utils/helpers/currencyFormatter.js'
import isValidInstallment from '../../../commons/utils/installments/installmentValidation.js'

describe('Validation installment', () => {
  it('should return a valid installment string when calculation is right', () => {
    const amount = '1000'
    const installments = '10'
    const installment = '100'
    const result = isValidInstallment(amount, installments, installment)
    expect(result).toBe(formatCurrencyToBRL(100))
  })

  it('should return a invalid installment string when calculation is wrong', () => {
    const amount = '1000'
    const installments = '10'
    const installment = '22'
    const result = isValidInstallment(amount, installments, installment)
    expect(result).toBe('Valor inconsistente: ' + formatCurrencyToBRL(22))
  })
})
