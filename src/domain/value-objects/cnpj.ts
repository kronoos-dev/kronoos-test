import { Either, left, right } from "../../core/logic/Either";
import { cnpjValidator } from "../../utils/cnpj-validator";
import { CnpjInvalidError } from "./errors/cnpj-invalid-error";

export class CNPJ {
  constructor(private readonly cnpj: string) {}

  get value(): string {
    return this.cnpj;
  }

  static validate(cnpj: string): boolean {
    return cnpjValidator(cnpj);
  }

  static create(cnpj: string): Either<CnpjInvalidError, CNPJ> {
    if (!this.validate(cnpj)) {
      return left(new CnpjInvalidError(cnpj));
    }

    return right(new CNPJ(cnpj));
  }
}
