import { processCSVFile } from "./csvManipulation.js";
import { formatMonetaryValues } from "./currencyConvertion.js";

let proccesedCSV = await processCSVFile("data.csv");
let formatedCurrency = formatMonetaryValues(proccesedCSV);

console.log(formatedCurrency);
