const { vlPrestaValidation } = require('../../src/core')
const { expect } = require('@jest/globals')

describe('vlPrestaValidation', () => {
  it('should return false for non-numeric input', () => {
    expect(vlPrestaValidation('abc', '10', '1000')).toBe(false)
    expect(vlPrestaValidation('100', 'xyz', '1000')).toBe(false)
    expect(vlPrestaValidation('100', '10', 'def')).toBe(false)
  })

  it('should return false if total divided by number of installments is not equal to installment value', () => {
    expect(vlPrestaValidation('64', '10', '1000')).toBe(false) // 1000 / 10 ≠ 64
  })

  it('should return the total value if valid installment value', () => {
    expect(vlPrestaValidation('50', '4', '200')).toBe('200') // 200 / 4 = 50
  })
})
