import { cnpj } from "cpf-cnpj-validator";

export class CNPJValidatorAdapter {
  static isValid(value: string, strict?: boolean) {
    return cnpj.isValid(value, strict);
  }
}
