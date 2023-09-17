import { CPF_FIRST_MULTIPLIER, CPF_SECOND_MULTIPLIER } from '../../constants.js'
import { cpfCnpjStringToArray, cpfCnpjCheckDigit } from './shared/index.js'

const isValidCpf = cpf => {
  const cpfArray = cpfCnpjStringToArray(cpf).slice(0, 9)
  const firstCpfDigit = cpfCnpjCheckDigit(cpfArray, CPF_FIRST_MULTIPLIER)
  cpfArray.push(firstCpfDigit)
  const secondCpfDigit = cpfCnpjCheckDigit(cpfArray, CPF_SECOND_MULTIPLIER)
  const twoCheckDigits = JSON.stringify([firstCpfDigit, secondCpfDigit])
  const lastCpfDigits = JSON.stringify(cpfCnpjStringToArray(cpf).slice(9))
  return twoCheckDigits === lastCpfDigits ? cpf : `CPF inválido: ${cpf}`
}

export default isValidCpf
