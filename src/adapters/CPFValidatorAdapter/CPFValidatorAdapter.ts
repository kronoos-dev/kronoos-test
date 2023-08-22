import { cpf } from "cpf-cnpj-validator";

export class CPFValidatorAdapter {
  static isValid(value: string, strict?: boolean) {
    return cpf.isValid(value, strict);
  }
}
