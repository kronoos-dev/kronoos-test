const { vlFormat } = require('../../src/core')
const { expect } = require('@jest/globals')

describe('vlFormat', () => {
  it('should format a number as BRL currency', () => {
    expect(vlFormat('1000')).toContain('R$')
    expect(vlFormat('1000')).toContain('1.000,00')
  })

  it('should handle invalid inputs', () => {
    expect(vlFormat('abc')).toBe(false)
    expect(vlFormat('123a')).toBe(false)
    expect(vlFormat('123.123')).toBe(false)
    expect(vlFormat('-100')).toBe(false)
  })

  it('should handle decimals', () => {
    expect(vlFormat('0.99')).toContain('0,99')
    expect(vlFormat('0.1')).toContain('0,10')
  })

  it('should handle strings with commas', () => {
    expect(vlFormat('12345.67')).toContain('12.345,67')
    expect(vlFormat('987.65')).toContain('987,65')
  })

  it('should handle large numbers', () => {
    expect(vlFormat('1000000')).toContain('1.000.000,00')
    expect(vlFormat('12345678.9')).toContain('12.345.678,90')
  })
})
