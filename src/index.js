import { processCSVFile } from "./csvManipulation.js";
import { formatMonetaryValues } from "./currencyConvertion.js";
import { validateCpfCnpj } from "./validationCpfCnpj.js";

let proccesedCSV = await processCSVFile("data.csv");
let formatedCurrency = formatMonetaryValues(proccesedCSV);
let validatedCpfCnpj = validateCpfCnpj(formatedCurrency);

console.log(validatedCpfCnpj);
