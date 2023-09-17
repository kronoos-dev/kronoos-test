import { cpf, cnpj } from 'cpf-cnpj-validator';
export const cpfCpnjIsValid = (value: string) => {
    return cpf.isValid(value) || cnpj.isValid(value)
}
export default cpfCpnjIsValid

