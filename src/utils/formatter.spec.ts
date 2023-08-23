import { describe, expect, it, vi } from 'vitest'

import { dateFormatter, priceFormatter } from './formatter'

describe('FORMATTER AMOUNT', () => {
  it('should convert a number to brazilian amount formatter', () => {
    const getAmount = vi.fn(priceFormatter)
    const amount = getAmount(10.12).replace(/\u00a0/g, ' ') // removing '&nbssp; whitespace

    expect(amount).toBe('R$ 10,12')
    expect(getAmount).toHaveReturned()
  })

  it('should convert a string to brazilian date formatter', () => {
    const getDate = vi.fn(dateFormatter)
    const date = getDate('20240401')

    expect(date).toBe('01/04/2024')
    expect(getDate).toHaveReturned()
  })
})
