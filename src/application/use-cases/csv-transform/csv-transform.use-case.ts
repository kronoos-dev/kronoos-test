import { Either, left, right } from "../../../core/logic/Either";
import { CNPJ } from "../../../domain/value-objects/cnpj";
import { CPF } from "../../../domain/value-objects/cpf";
import { Currency } from "../../../domain/value-objects/currency";
import { DateParser } from "../../../domain/value-objects/data-parser";
import { CnpjInvalidError } from "../../../domain/value-objects/errors/cnpj-invalid-error";
import { CpfInvalidError } from "../../../domain/value-objects/errors/cpf-invalid-error";
import { CurrencyInvalidError } from "../../../domain/value-objects/errors/currency-invalid-error";
import { DateParserInvalidError } from "../../../domain/value-objects/errors/date-parser-invalid-error";
import { ParcAmountError } from "../../../domain/value-objects/errors/parc-amount-error";
import { CsvRepository } from "../../../infra/repositories/csv.repository";
import { AllContractClient } from "../../../infra/repositories/types/csv-type";

type CsvTransformErrors =
  | CpfInvalidError
  | CnpjInvalidError
  | CurrencyInvalidError
  | DateParserInvalidError
  | ParcAmountError;

type CsvTransformResponse = Either<CsvTransformErrors[], AllContractClient[]>;

export class CsvTransformUseCase {
  constructor(private readonly csvRepository: CsvRepository) {}

  async handle(csvFilePath: string): Promise<CsvTransformResponse> {
    const csvData = await this.csvRepository.handle(csvFilePath);
    const errors: CsvTransformErrors[] = [];

    for await (const data of csvData) {
      if (data.nrCpfCnpj) {
        const isCpf = data.nrCpfCnpj.length === 11;
        const isCnpj = data.nrCpfCnpj.length === 14;

        if (isCpf && !CPF.validate(data.nrCpfCnpj)) {
          errors.push(new CpfInvalidError(data.nrCpfCnpj));
        }

        if (isCnpj && !CNPJ.validate(data.nrCpfCnpj)) {
          errors.push(new CnpjInvalidError(data.nrCpfCnpj));
        }

        if (!isCpf && !isCnpj) {
          errors.push(new CpfInvalidError(data.nrCpfCnpj));
        }

        if (isCpf) {
          const cpf = CPF.create(data.nrCpfCnpj);

          if (cpf.isLeft()) {
            errors.push(cpf.value);
          } else {
            data.nrCpfCnpj = cpf.value.value;
          }
        }
      }

      if (data.vlTotal) {
        const currency = Currency.create(data.vlTotal);

        if (currency.isLeft()) {
          errors.push(new CurrencyInvalidError(parseFloat(data.vlTotal)));
        } else {
          data.vlTotal = currency.value.value;
        }
      }

      if (data.vlPresta) {
        const currency = Currency.create(data.vlPresta);

        if (currency.isLeft()) {
          errors.push(new CurrencyInvalidError(parseFloat(data.vlPresta)));
        } else {
          data.vlPresta = currency.value.value;
        }
      }

      if (data.vlMora) {
        const currency = Currency.create(data.vlMora);

        if (currency.isLeft()) {
          errors.push(new CurrencyInvalidError(parseFloat(data.vlMora)));
        } else {
          data.vlMora = currency.value.value;
        }
      }

      if (data.vlTotal && data.vlPresta) {
        const currency = Currency.divide(
          parseFloat(data.vlTotal),
          parseFloat(data.vlPresta),
        );

        const vlPrestacao = parseFloat(data.vlPresta);

        if (currency !== vlPrestacao) {
          errors.push(new ParcAmountError());
        }
      }

      if (data.dtContrato) {
        const date = DateParser.create(data.dtContrato);

        if (date.isLeft()) {
          errors.push(new DateParserInvalidError(data.dtContrato));
        } else {
          data.dtContrato = date.value.value;
        }
      }

      if (data.dtVctPre) {
        const date = DateParser.create(data.dtVctPre);

        if (date.isLeft()) {
          errors.push(new DateParserInvalidError(data.dtVctPre));
        } else {
          data.dtVctPre = date.value.value;
        }
      }
    }

    if (errors.length > 0) {
      return left(errors);
    }

    return right(csvData);
  }
}
