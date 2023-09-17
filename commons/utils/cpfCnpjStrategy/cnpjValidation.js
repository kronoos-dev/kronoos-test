import {
  CNPJ_FIRST_MULTIPLIER,
  CNPJ_SECOND_MULTIPLIER,
} from '../../constants.js'
import { cpfCnpjStringToArray, cpfCnpjCheckDigit } from './shared/index.js'

const isValidCnpj = cnpj => {
  const cnpjArray = cpfCnpjStringToArray(cnpj).slice(0, 12)
  const firstCnpjDigit = cpfCnpjCheckDigit(cnpjArray, CNPJ_FIRST_MULTIPLIER)
  cnpjArray.push(firstCnpjDigit)
  const secondCnpjDigit = cpfCnpjCheckDigit(cnpjArray, CNPJ_SECOND_MULTIPLIER)
  const twoCheckDigits = JSON.stringify([firstCnpjDigit, secondCnpjDigit])
  const lastCnpjDigits = JSON.stringify(cpfCnpjStringToArray(cnpj).slice(12))
  return twoCheckDigits === lastCnpjDigits ? cnpj : `CNPJ inválido: ${cnpj}`
}

export default isValidCnpj
