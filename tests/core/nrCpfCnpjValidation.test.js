const { nrCpfCnpjValidation } = require('../../src/core')
const { expect } = require('@jest/globals')

describe('nrCpfCnpjValidation', () => {
  it('should return false for non-numeric input', () => {
    expect(nrCpfCnpjValidation('abc')).toBe(false)
    expect(nrCpfCnpjValidation('123abc')).toBe(false)
  })

  it('should return false for same digit sequences', () => {
    expect(nrCpfCnpjValidation('11111111111')).toBe(false)
    expect(nrCpfCnpjValidation('00000000000')).toBe(false)
    expect(nrCpfCnpjValidation('22222222222')).toBe(false)
  })

  it('should return false for invalid CPF', () => {
    expect(nrCpfCnpjValidation('12345678901')).toBe(false) // Invalid CPF
  })

  it('should return the valid CPF for a valid CPF input', () => {
    expect(nrCpfCnpjValidation('52998224725')).toBe('52998224725') // Valid CPF
  })

  it('should return false for invalid CNPJ', () => {
    expect(nrCpfCnpjValidation('12345678901234')).toBe(false) // Invalid CNPJ
  })

  it('should return the valid CNPJ for a valid CNPJ input', () => {
    expect(nrCpfCnpjValidation('83049086000174')).toBe('83049086000174') // Valid CNPJ
  })
})
