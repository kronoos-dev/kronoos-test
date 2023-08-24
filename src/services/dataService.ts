import { CSVRow } from '../modules/csvRow';
import { formatCurrency } from '../modules/currency';
import { convertToDate } from '../modules/date';
import { validateCpfCnpj } from '../modules/validation';
import { ErrorHandler } from '../modules/errorHandler';

export class DataService {
  static validateCPFOrCNPJ(value: string): boolean {
    return validateCpfCnpj(value);
  }

  static formatDateToBRLCurrency(value: number): string {
    return formatCurrency(value);
  }

  static convertDateToJSDate(dateString: string): Date {
    return convertToDate(dateString);
  }

  static calculateInstallmentValue(total: number, installments: number): number {
    return total / installments;
  }

  static processCSVRow(row: any, index: number): CSVRow | null {
    // Field Validation
    const requiredFields = [
      'nrInst', 'nrAgencia', 'cdClient', 'nmClient', 'nrCpfCnpj',
      'nrContrato', 'dtContrato', 'qtPrestacoes', 'vlTotal', 'cdProduto',
      'dsProduto', 'cdCarteira', 'dsCarteira', 'nrProposta', 'nrPresta',
      'tpPresta', 'nrSeqPre', 'dtVctPre', 'vlPresta', 'vlMora', 'vlMulta',
      'vlOutAcr', 'vlIof', 'vlDescon', 'vlAtual', 'idSituac', 'idSitVen',
    ];

    if (!requiredFields.every(field => row[field])) {
      ErrorHandler.handle(new Error(`Missing field(s) in row ${index + 2}.`), 'Warning');
      return null; // Ignora a linha inválida
    }

    // Convert values to appropriate types
    row.nrInst = parseInt(row.nrInst);
    row.nrAgencia = parseInt(row.nrAgencia);
    row.nrContrato = parseInt(row.nrContrato);
    row.qtPrestacoes = parseInt(row.qtPrestacoes);
    row.cdProduto = parseInt(row.cdProduto);
    row.nrProposta = parseInt(row.nrProposta);
    row.nrPresta = parseInt(row.nrPresta);
    row.nrSeqPre = parseInt(row.nrSeqPre);
    row.vlPresta = parseFloat(row.vlPresta);
    row.vlMora = parseFloat(row.vlMora);
    row.vlMulta = parseFloat(row.vlMulta);
    row.vlOutAcr = parseFloat(row.vlOutAcr);
    row.vlIof = parseFloat(row.vlIof);
    row.vlDescon = parseFloat(row.vlDescon);
    row.vlAtual = parseFloat(row.vlAtual);

    if (!DataService.validateCPFOrCNPJ(row.nrCpfCnpj)) {
      ErrorHandler.handle(new Error(`Invalid CPF/CNPJ in row ${index + 2}: ${row.nrCpfCnpj}`), 'Warning');
      return null; // Ignora a linha inválida
    }

    row.dtContrato = DataService.convertDateToJSDate(row.dtContrato);
    row.dtVctPre = DataService.convertDateToJSDate(row.dtVctPre);

    row.vlPresta = DataService.calculateInstallmentValue(row.vlTotal, row.qtPrestacoes);

    row.vlTotal = DataService.formatDateToBRLCurrency(row.vlTotal);
    row.vlPresta = DataService.formatDateToBRLCurrency(row.vlPresta);

    return row;
  }

  static processData(data: CSVRow[]): CSVRow[] {
    const processedData: CSVRow[] = [];

    data.forEach((row, index) => {
      const processedRow = this.processCSVRow(row, index);
      if (processedRow) {
        processedData.push(processedRow);
      }
    });

    return processedData;
  }
}