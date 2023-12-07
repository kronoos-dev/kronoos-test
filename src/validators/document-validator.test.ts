import { expect } from 'earl'
import { documentValidator } from './document-validator'

describe('DocumentValidator', () => {
    it('should validate and format a valid CPF successfully', () => {
        const result = documentValidator('45003338864')
        expect(result).toEqual({ type: 'CPF', isValid: true, value: '450.033.388-64' })
    })

    it('should validate and format a valid CNPJ successfully', () => {
        const result = documentValidator('26233791000193')
        expect(result).toEqual({ type: 'CNPJ', isValid: true, value: '26.233.791/0001-93' })
    })

    it('should throw trying to validate a bad CPF/CNPJ', () => {
        const result = documentValidator('45003338865')
        expect(result).toEqual({ type: 'N/A', isValid: false })
    })
})