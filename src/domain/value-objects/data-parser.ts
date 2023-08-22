import dayjs from "dayjs";

import { Either, left, right } from "../../core/logic/Either";
import { DateParserInvalidError } from "./errors/date-parser-invalid-error";

export class DateParser {
  constructor(private readonly date: string | Date) {}

  get value(): string | Date {
    return this.date;
  }

  static validate(date: string | Date): boolean {
    const strDate = new Date(date);

    return !isNaN(strDate.getTime());
  }

  static create(
    date: string | Date,
  ): Either<DateParserInvalidError, DateParser> {
    if (!this.validate(date)) {
      return left(new DateParserInvalidError(date));
    }

    const srtDate = new Date(dayjs(date).format("YYYY-MM-DD"));

    return right(new DateParser(srtDate));
  }
}
