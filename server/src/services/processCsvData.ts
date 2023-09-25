import { CsvData } from "../Model/csvModel";
import formatDateField from "./convertDatesToDateType";
import formatCurrencyFields from "./convertToBrazilianCurrencyFormat";
import validateCpfCnpj from "./validateCpfOrCnpj";
import validateTotalAndInstallments from "./validateTotalAndInstallments";

function formatCsv(row: CsvData) {
    const isValidateCpfCnpj = validateCpfCnpj(row.nrCpfCnpj)
    const csvFormated = formatCurrencyFields(formatDateField(row))
    const isValidateTotalAndInstallments = validateTotalAndInstallments(row)
  return {... csvFormated, isValidateCpfCnpj, isValidateTotalAndInstallments }
}


export default function processCsvData(data: CsvData[], page: number, perPage: number): Record<string, Record<string, CsvData[]>> {
  const groupedData: Record<string, Record<string, CsvData[]>> = {};

  data.slice((page - 1) * perPage, page * perPage).forEach((row) => {
    const csvFormated = formatCsv(row)
    const { nmClient, nrContrato } = csvFormated;

    if (!groupedData[nmClient]) {
      groupedData[nmClient] = {};
    }

    if (!groupedData[nmClient][nrContrato]) {
      groupedData[nmClient][nrContrato] = [];
    }
    groupedData[nmClient][nrContrato].push(csvFormated);

  });
  return groupedData;
}



