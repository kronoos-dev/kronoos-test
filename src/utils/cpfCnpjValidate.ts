import { cpf, cnpj } from 'cpf-cnpj-validator'

export const cpfCnpjValidate = (value: string) => {
  const isCpf = cpf.isValid(value)

  if (isCpf) return isCpf

  const isCnpj = cnpj.isValid(value)
  if (isCnpj) return isCnpj

  return false
}
