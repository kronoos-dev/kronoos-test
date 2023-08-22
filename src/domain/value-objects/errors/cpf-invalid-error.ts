import { DomainError } from "../../../core/domain/errors/DomainError";

export class CpfInvalidError extends Error implements DomainError {
  constructor(cpf: string) {
    super(`The cpf ${cpf} is invalid.`);
    this.name = "CpfInvalidError";
  }
}
