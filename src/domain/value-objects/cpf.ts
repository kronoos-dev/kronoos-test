import { Either, left, right } from "../../core/logic/Either";
import { cpfValidator } from "../../utils/cpf-validator";
import { CpfInvalidError } from "./errors/cpf-invalid-error";

export class CPF {
  constructor(private readonly cpf: string) {}

  get value(): string {
    return this.cpf;
  }

  static validate(cpf: string): boolean {
    return cpfValidator(cpf);
  }

  static create(cpf: string): Either<CpfInvalidError, CPF> {
    if (!this.validate(cpf)) {
      return left(new CpfInvalidError(cpf));
    }

    return right(new CPF(cpf));
  }
}
