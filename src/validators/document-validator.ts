import { cpf, cnpj } from 'cpf-cnpj-validator'

export const documentValidator = (document: string) => {
    if (cpf.isValid(document)) {
        return { type: 'CPF', isValid: true, value: cpf.format(document) } 
    }

    if (cnpj.isValid(document)) {
        return { type: 'CNPJ', isValid: true, value: cnpj.format(document) }
    }

    return { type: 'N/A', isValid: false }
}