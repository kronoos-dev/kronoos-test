import { Either, left, right } from "../../core/logic/Either";
import { CurrencyInvalidError } from "./errors/currency-invalid-error";

export class Currency {
  constructor(private readonly currency: string) {}

  get value(): string {
    return this.currency;
  }

  static validate(currency: number): boolean {
    return isNaN(currency);
  }

  static create(currency: string): Either<CurrencyInvalidError, Currency> {
    const numericValue: number = parseFloat(currency);

    if (this.validate(numericValue)) {
      return left(new CurrencyInvalidError(numericValue));
    }

    const currencyFormat = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(numericValue);

    return right(new Currency(currencyFormat));
  }

  static divide(value: number, divider: number): number {
    const result = value / divider;

    return parseFloat(result.toFixed(2));
  }
}
