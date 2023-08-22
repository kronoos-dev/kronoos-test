const { dtValidation } = require('../../src/core')
const { expect } = require('@jest/globals')

describe('dtValidation', () => {
  it('should return false for invalid input length', () => {
    expect(dtValidation('2021090')).toBe(false)
    expect(dtValidation('202109032')).toBe(false)
  })

  it('should return false for invalid year, month, or day', () => {
    expect(dtValidation('20X10903')).toBe(false)
    expect(dtValidation('20210003')).toBe(false)
    expect(dtValidation('20211303')).toBe(false)
    expect(dtValidation('20210900')).toBe(false)
    expect(dtValidation('20210932')).toBe(false)
  })

  it('should return false for invalid month', () => {
    expect(dtValidation('20211303')).toBe(false)
  })

  it('should return false for invalid day in the month', () => {
    expect(dtValidation('20210230')).toBe(false) // February doesn't have 30 days
  })

  it('should return a valid Date object for a valid date string', () => {
    expect(dtValidation('20210822')).toEqual(new Date(2021, 7, 22)) // JavaScript months are 0-indexed
  })
})
