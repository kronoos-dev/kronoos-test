import { LoadCSV } from "./utils/LoadCSV";
import { FormatCurrency } from "./utils/FormatCurrency/FormatCurrency";
import { CPFValidatorAdapter } from "./adapters/CPFValidatorAdapter/CPFValidatorAdapter";
import { CNPJValidatorAdapter } from "./adapters/CNPJValidatorAdapter/CNPJValidatorAdapter";
import { ImportedCSV } from "./interfaces/ImportedCSV";

class App {
  static results: ImportedCSV[] = [];

  static invalids: {
    reason: string;
    data: ImportedCSV;
  }[] = [];

  static get total() {
    return this.results.length + this.invalids.length;
  }

  private static async loadFile() {
    const results = await LoadCSV.loadFile<ImportedCSV>("data.csv");
    this.results = results;
  }

  private static validateCPForCNPJ() {
    const results: ImportedCSV[] = [];
    const invalidated: {
      reason: string;
      data: ImportedCSV;
    }[] = [];

    for (const result of this.results) {
      const cpfIsValid = CPFValidatorAdapter.isValid(result.nrCpfCnpj);
      const cnpjIsValid = CNPJValidatorAdapter.isValid(result.nrCpfCnpj);

      if (cpfIsValid || cnpjIsValid) {
        results.push(result);
      } else {
        if (!cpfIsValid) {
          invalidated.push({
            reason: "CPF inválido",
            data: result,
          });
        } else {
          invalidated.push({
            reason: "CNPJ inválido",
            data: result,
          });
        }
      }
    }

    this.results = results;
    this.invalids = invalidated;
  }

  private static checkInstallment() {
    const results: ImportedCSV[] = [];
    const invalidated: {
      reason: string;
      data: ImportedCSV;
    }[] = [];

    for (const result of this.results) {
      const vlTotal = parseFloat(result.vlTotal);
      const qtPrestacoes = parseInt(result.qtPrestacoes);
      const vlPresta = parseFloat(result.vlPresta);

      const total = Math.round((vlTotal / qtPrestacoes) * 100) / 100;

      if (vlPresta === total) {
        results.push(result);
      } else {
        invalidated.push({
          reason: "Valor total não corresponde ao valor da prestação",
          data: result,
        });
      }
    }

    this.results = results;
    this.invalids = invalidated;
  }

  private static convertCurrency() {
    const results: ImportedCSV[] = [];
    const invalidated: {
      reason: string;
      data: ImportedCSV;
    }[] = [];

    for (const result of this.results) {
      try {
        const vlTotal = FormatCurrency.ToBRL(result.vlTotal);
        const vlPresta = FormatCurrency.ToBRL(result.vlPresta);
        const vlMora = FormatCurrency.ToBRL(result.vlMora);

        result.vlAtual = vlTotal;
        result.vlPresta = vlPresta;
        result.vlMora = vlMora;

        results.push(result);
      } catch (error) {
        invalidated.push({
          reason: "Valor inválido",
          data: result,
        });
      }
    }

    this.results = results;
    this.invalids = invalidated;
  }

  private static parseDate(date: string) {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    const result = new Date(`${year}-${month}-${day}`);

    return result;
  }

  private static convertDate() {
    const results: ImportedCSV[] = [];

    for (const result of this.results) {
      const dtContrato = this.parseDate(result.dtContrato as string);
      const dtVctPre = this.parseDate(result.dtVctPre as string);

      result.dtContrato = dtContrato;
      result.dtVctPre = dtVctPre;

      results.push(result);
    }

    this.results = results;
  }

  static async run() {
    await this.loadFile();
    this.validateCPForCNPJ();
    this.checkInstallment();
    this.convertCurrency();
    this.convertDate();

    console.log("Total de registros: ", this.total);
    console.log("Total de registros válidos: ", this.results.length);
    console.log("Total de registros inválidos: ", this.invalids.length);
  }
}

App.run();
