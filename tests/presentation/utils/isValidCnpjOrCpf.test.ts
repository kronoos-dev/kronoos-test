import * as assert from 'assert'
import { isValidCPF, isValidCNPJ, isValidCnpjOrCpf } from '../../../src/presentation/utils'

describe('isValidCPF', () => {
  it('should return true for a valid CPF', () => {
    const result = isValidCPF('123.456.789-09')
    assert.strictEqual(result, true)
  })

  it('should return false for an invalid CPF', () => {
    const result = isValidCPF('111.222.333-44')
    assert.strictEqual(result, false)
  })
})

describe('isValidCNPJ', () => {
  it('should return true for a valid CNPJ', () => {
    const result = isValidCNPJ('02.079.795/0001-09')
    assert.strictEqual(result, true)
  })

  it('should return false for an invalid CNPJ', () => {
    const result = isValidCNPJ('11.222.333/4444-55')
    assert.strictEqual(result, false)
  })
})

describe('isValidCnpjOrCpf', () => {
  it('should return true for a valid CPF', () => {
    const result = isValidCnpjOrCpf('123.456.789-09')
    assert.strictEqual(result, true)
  })

  it('should return true for a valid CNPJ', () => {
    const result = isValidCnpjOrCpf('92.415.892/0001-00')
    assert.strictEqual(result, true)
  })

  it('should return false for an invalid document', () => {
    const result = isValidCnpjOrCpf('111.222.333')
    assert.strictEqual(result, false)
  })
})