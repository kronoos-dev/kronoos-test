import isValidCpfCnpj from '../../../commons/utils/cpfCnpjStrategy/index.js'

describe('Validates CPF and CNPJ', () => {
  it('should return with a valid CPF', () => {
    const cpf = '43267297087'
    const result = isValidCpfCnpj(cpf)

    expect(result).toBe('43267297087')
  })

  it('should return with a valid CNPJ', () => {
    const cnpj = '32595501000154'
    const result = isValidCpfCnpj(cnpj)

    expect(result).toBe('32595501000154')
  })

  it('should return an error message for CPF or CNPJ with incorrect size', () => {
    const cpfCnpj = '123'
    const result = isValidCpfCnpj(cpfCnpj)

    expect(result).toBe('CPF ou CNPJ inconsistente: 123')
  })

  it('should return an error message for invalid CPF', () => {
    const cpf = '53267297087'
    const result = isValidCpfCnpj(cpf)

    expect(result).toBe('CPF inválido: 53267297087')
  })

  it('should return error message for invalid CNPJ', () => {
    const cnpj = '82595501000154'
    const result = isValidCpfCnpj(cnpj)

    expect(result).toBe('CNPJ inválido: 82595501000154')
  })
})
