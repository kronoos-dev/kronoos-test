import { CNPJ, CPF } from '@julioakira/cpf-cnpj-utils'

export const validaValorDaPrestacao = (
  vlTotal: string,
  qtPrestacoes: string,
  vlPresta: string
): string => {
  const prestacoes = (parseFloat(vlTotal) / parseFloat(qtPrestacoes)).toFixed(2)
  if (prestacoes != vlPresta) {
    console.log(
      `O valor da prestação ${vlPresta} é inválido mas já foi corrigido ${prestacoes}`
    )
    return prestacoes
  }
  return vlPresta
}

export const formatCurrency = (value: number): string => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const validateCPForCNPJ = (cpfCnpj: string): boolean => {
  return CPF.Validate(cpfCnpj) || CNPJ.Validate(cpfCnpj)
}

export const makeDateType = (date: string): Date => {
  if (date.length < 8) throw new Error('Invalid date')
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)
  return new Date(`${year}-${month}-${day}`)
}
