import { CPF, CNPJ } from '@julioakira/cpf-cnpj-utils'; 

export const isValidCnpjOrCpf = (document: string) => {
  const numericDocument = document.replace(/\D/g, '')
  if (numericDocument.length === 11) {
    return CPF.Validate(document)
  } else if (numericDocument.length === 14) {
    console.log("CNPJ", {numericDocument})
    return CNPJ.Validate(document)
  } else {
    return false
  }
}