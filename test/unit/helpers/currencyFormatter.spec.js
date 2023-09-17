import formatCurrencyToBRL from '../../../commons/utils/helpers/currencyFormatter.js'

const removeSpaces = str => str.replace(/[^\dR$,]/g, '')

describe('Formatting Currency', () => {
  it('should format a value in Brazilian currency (BRL)', () => {
    const value = 1000.5
    const result = formatCurrencyToBRL(value)

    expect(removeSpaces(result)).toEqual(removeSpaces('R$ 1.000,50'))
  })

  it('should format zero in Brazilian currency (BRL)', () => {
    const value = 0
    const result = formatCurrencyToBRL(value)
    expect(removeSpaces(result)).toEqual(removeSpaces('R$0,00'))
  })

  it('should format a negative value in Brazilian currency (BRL)', () => {
    const value = -500.75
    const result = formatCurrencyToBRL(value)
    expect(removeSpaces(result)).toEqual(removeSpaces('-R$500,75'))
  })
})
