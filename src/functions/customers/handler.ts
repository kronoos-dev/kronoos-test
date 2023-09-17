import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import csv from "csv-parser";
import { createReadStream } from "fs";
import { CustomerDto } from "./dtos/customer.dto";

const customers: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
  const results: CustomerDto[] = [];
  const errors: string[] = [];

  await new Promise((resolve, reject) => {
    createReadStream("data.csv")
      .pipe(csv())
      .on("data", (data) => {
        const convertedData = CustomerDto.validateAndConvertAnyToCustomer(data);
        if (typeof convertedData === "string") errors.push(convertedData);
        else results.push(convertedData);
      })
      .on("end", () => {
        resolve("");
      })
      .on("error", reject);
  });
  return formatJSONResponse({
    message: `Success`,
    errorsNullOrEmpty: errors.filter((x) => x.includes("nulo e/ou vazio"))
      .length,
    errorsInvalidCpfCnpj: errors.filter((x) => x.includes("Cpf/cnpj inválido"))
      .length,
    errorsValues: errors.filter((x) =>
      x.includes("qtPrestacoes não é igual ao campo vlPresta")
    ).length,
    success: results.length,
    customers: results,
  });
};

export const main = middyfy(customers);
