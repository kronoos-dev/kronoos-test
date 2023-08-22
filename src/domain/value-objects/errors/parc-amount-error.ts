import { DomainError } from "../../../core/domain/errors/DomainError";

export class ParcAmountError extends Error implements DomainError {
  constructor() {
    super(`Os valores das parcelas não batem com o valor total.`);
    this.name = "ParcAmountError";
  }
}
