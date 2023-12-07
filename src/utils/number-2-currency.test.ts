import { expect } from 'earl'
import { format } from './number-2-currency'

describe('CurrencyFormatter', () => {
    it('should convert a number into BRL Currency successfully', () => {
        const result = format(10000.55)
        expect(result).toEqual('R$\xa010.000,55')
    })
})