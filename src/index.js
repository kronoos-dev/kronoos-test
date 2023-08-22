import { processCSVFile } from "./csvManipulation.js";
import { formatMonetaryValues } from "./currencyConvertion.js";
import { validateCpfCnpj } from "./validationCpfCnpj.js";
import { checkInstallmentConsistency } from "./checkInstallmentConsistency.js";

let proccesedCSV = await processCSVFile("data.csv");
let formatedCurrency = formatMonetaryValues(proccesedCSV);
let validatedCpfCnpj = validateCpfCnpj(formatedCurrency);
let inconsistentInstallments = checkInstallmentConsistency(validatedCpfCnpj);

console.log(inconsistentInstallments);
