import importCsv from "./validateFunctions/csvRead";
import { formatCurrency } from "./validateFunctions/formatCurrency";
import formatDate from "./validateFunctions/formatDate";
import { isCpfOrCnpj } from "./validateFunctions/verifyCnpjOrCpf";
import fs from "fs";

export class Main {
  data: any[];

  constructor(data: any[]) {
    this.data = data;
    this.verifyAndFixCpfAndCnpj();
    this.fixNumberValues();
    this.verifyInstallment();
    this.validateDate();
    fs.writeFileSync("data.json", JSON.stringify(this.data, null, 2), "utf-8");
  }

  fixNumberValues(): void {
    this.data = this.data.map((data) => {
      const vlTotal = formatCurrency(Number(data.vlTotal));
      const vlPresta = formatCurrency(Number(data.vlPresta));
      const vlMora = formatCurrency(Number(data.vlMora));
      return { ...data, vlTotal, vlPresta, vlMora };
    });
  }

  verifyAndFixCpfAndCnpj(): void {
    this.data = this.data.map((data) => {
      return { ...data, nrCpfCnpj: isCpfOrCnpj(data.nrCpfCnpj) };
    });
  }

  verifyInstallment(): void {
    this.data = this.data.map((data) => {
      const numbers = data.vlPresta.match(/(\d{1,3}(?:\.\d{3})*(?:,\d{2}))/);
      const extractedNumber = parseFloat(
        numbers[1].replace(/\./g, "").replace(",", ".")
      );

      if (data.vlTotal / data.qtPrestacoes == extractedNumber) return data;
      else
        return { ...data, vlPresta: `${data.vlPresta} - prestação inválida` };
    });
  }

  validateDate(): void {
    this.data = this.data.map((data) => {
      return {
        ...data,
        dtVctPre: formatDate(data.dtVctPre),
        dtContrato: formatDate(data.dtContrato),
      };
    });
  }
}

importCsv("data.csv")
  .then((data) => new Main(data))
  .catch((err) => console.log(err));
