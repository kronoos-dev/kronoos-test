import isValidCpf from './cpfValidation.js'
import isValidCnpj from './cnpjValidation.js'

const isValidCpfCnpj = cpfCnpj => {
  if (cpfCnpj && cpfCnpj.length === 11) {
    return isValidCpf(cpfCnpj)
  }
  if (cpfCnpj && cpfCnpj.length === 14) {
    return isValidCnpj(cpfCnpj)
  }
  return `CPF ou CNPJ inconsistente: ${cpfCnpj}`
}

export default isValidCpfCnpj
