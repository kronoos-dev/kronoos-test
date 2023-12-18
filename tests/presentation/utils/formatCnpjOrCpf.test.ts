import * as assert from 'assert'
import { formatCPF, formatCNPJ, formatCnpjOrCpf } from '../../../src/presentation/utils'

describe('formatCPF', () => {
  it('should format valid CPF correctly', () => {
    const result = formatCPF('12345678909')
    assert.strictEqual(result, '123.456.789-09')
  })

  it('should throw an error for invalid CPF length', () => {
    assert.throws(() => formatCPF('1234567890'), /Invalid CPF length/)
  })
})

describe('formatCNPJ', () => {
  it('should format valid CNPJ correctly', () => {
    const result = formatCNPJ('12345678901234')
    assert.strictEqual(result, '12.345.678/9012-34')
  })

  it('should throw an error for invalid CNPJ length', () => {
    assert.throws(() => formatCNPJ('123456789012345'), /Invalid CNPJ length/)
  })
})

describe('formatCnpjOrCpf', () => {
  it('should format valid CPF correctly', () => {
    const result = formatCnpjOrCpf('12345678909')
    assert.strictEqual(result, '123.456.789-09')
  })

  it('should format valid CNPJ correctly', () => {
    const result = formatCnpjOrCpf('12345678901234')
    assert.strictEqual(result, '12.345.678/9012-34')
  })

  it('should return the input unchanged for invalid length', () => {
    const result = formatCnpjOrCpf('123')
    assert.strictEqual(result, '123')
  })
})