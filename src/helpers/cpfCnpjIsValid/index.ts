import { cnpj, cpf } from 'cpf-cnpj-validator';

export function cpfCnpjIsValid(data: string): boolean {
  const parsedData = data.trim().replace(/[^0-9]/g, '')

  if (!parsedData) return false

  const isCpf = cpf.isValid(parsedData)

  if (isCpf) return true

  const isCnpf = cnpj.isValid(parsedData)

  if (isCnpf) return true

  return false
}