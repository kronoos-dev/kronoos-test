import { CSVRow } from '../modules/csvRow';
import { parseCSV } from '../modules/csv';
import { ErrorHandler } from '../modules/errorHandler';
import { DataService } from './dataService.js';

export class CSVService {
  static async readCSV(filePath: string): Promise<CSVRow[]> {
    try {
      const data = await parseCSV(filePath);
      const processedData: CSVRow[] = [];

      for (let index = 0; index < data.length; index++) {
        const row = data[index];

        try {
          const processedRow = DataService.processCSVRow(row, index);

          if (processedRow) {
            processedData.push(processedRow);
          }
        } catch (error) {
          ErrorHandler.handle(error, `Erro na linha ${index + 2} do CSV`);
        }
      }

      return processedData;
    } catch (error) {
      ErrorHandler.handle(error, 'Erro na leitura do CSV');
      return [];
    }
  }
}