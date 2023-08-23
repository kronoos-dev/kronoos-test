import { describe, expect, it, vi } from 'vitest'

import { calculateInstallment } from './calculateInstallment'

describe('INSTALLMENT CALCULATION', () => {
  it('should be installment equal to division of total amount per quantity installment ', () => {
    const getCalculateInstallment = vi.fn(calculateInstallment)
    const isEqual = getCalculateInstallment('4000', '5', '800')

    expect(isEqual).toBeTruthy()
    expect(getCalculateInstallment).toHaveReturned()
  })
})
