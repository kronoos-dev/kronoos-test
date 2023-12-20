import { validateCpfCnpj } from "./cpfCnpjValidation";
import { formatCurrency } from "./formatCurrency";
import { installmentCalculator } from "./installmentCalculator";
import { parseCSV } from "./parseCsv";
import { parseDateString } from "./parseDateString";

const services = {
  validateCpfCnpj,
  formatCurrency,
  installmentCalculator,
  parseCSV,
  parseDateString,
};

export default services;
