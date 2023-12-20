/* eslint-disable no-param-reassign */
import * as cpfCnpjValidator from 'cpf-cnpj-validator'

interface validationsCpfOrCnpjData {
  [key: string]: string | undefined
}

export function validatedCpfOrCnpj(dataCsvConverted: validationsCpfOrCnpjData[]): {
  arrayDataDocumentsValid: any[]
  arrayDataDocumentsInvalid: any[]
} {
  const arrayDataDocumentsValid: any[] = []
  const arrayDataDocumentsInvalid: any[] = []

  dataCsvConverted.forEach((united) => {
    const { nrCpfCnpj } = united
    if (nrCpfCnpj) {
      const eCpfValido = cpfCnpjValidator.cpf.isValid(nrCpfCnpj)
      const eCnpjValido = cpfCnpjValidator.cnpj.isValid(nrCpfCnpj)

      if (eCpfValido || eCnpjValido) {
        const resultado: any = {}
        if (eCpfValido) {
          resultado.cpfValido = 'CPF válido'
        } else if (eCnpjValido) {
          resultado.cnpjValido = 'CNPJ válido'
        }
        arrayDataDocumentsValid.push({ ...united, ...resultado })
      } else {
        arrayDataDocumentsInvalid.push({ ...united, cpfCnpjInvalido: 'CPF ou CNPJ inválido' })
      }
    }
  })

  return { arrayDataDocumentsValid, arrayDataDocumentsInvalid }
}
