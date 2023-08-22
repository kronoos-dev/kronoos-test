import { DomainError } from "../../../core/domain/errors/DomainError";

export class CurrencyInvalidError extends Error implements DomainError {
  constructor(currency: number) {
    super(`The currency ${currency} is invalid.`);
    this.name = "CurrencyInvalidError";
  }
}
