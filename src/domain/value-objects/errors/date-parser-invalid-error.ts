import { DomainError } from "../../../core/domain/errors/DomainError";

export class DateParserInvalidError extends Error implements DomainError {
  constructor(data: string | Date) {
    super(`The data ${data} is invalid.`);
    this.name = "DataParserInvalidError";
  }
}
