import { expect } from 'earl'
import { isInstallmentValueValid } from './installment-value.validator'

describe('isInstallmentValueValid', () => {
    it('should return true for an invalid installmentValue', () => {
        const context = {
            installments: 10, 
            total: 1000, 
            installmentValue: 100
        }
        const result = isInstallmentValueValid(context)
        expect(result).toEqual(true)
    })

    it('should return false for an invalid installmentValue', () => {
        const context = {
            installments: 10, 
            total: 1000, 
            installmentValue: 99
        }
        const result = isInstallmentValueValid(context)
        expect(result).toEqual(false)
    })
})