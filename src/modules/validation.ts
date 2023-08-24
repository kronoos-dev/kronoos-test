import { cpf, cnpj } from 'cpf-cnpj-validator';

function validateCpfCnpj(value: string): boolean {
  return cpf.isValid(value) || cnpj.isValid(value);
}

export { validateCpfCnpj };
