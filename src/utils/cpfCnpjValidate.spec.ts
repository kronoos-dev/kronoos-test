import { describe, expect, it, vi } from 'vitest'

import { cpfCnpjValidate } from './cpfCnpjValidate'

describe('CPF CNPJ VALIDATION', () => {
  it('should be a valid CPF ', () => {
    const getCpf = vi.fn(cpfCnpjValidate)
    const cpf = getCpf('11459612744')

    expect(cpf).toBeTruthy()
    expect(getCpf).toHaveReturned()
  })

  it('should be a valid CNPJ ', () => {
    const getCnpj = vi.fn(cpfCnpjValidate)
    const cnpj = getCnpj('80192479000144')

    expect(cnpj).toBeTruthy()
    expect(getCnpj).toHaveReturned()
  })
})
