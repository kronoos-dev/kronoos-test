import fs from 'node:fs';
import path from 'node:path';
import csv from 'csv-parser';
import { ICsvData } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import { isDocumentValid } from '../utils/validateDocument';
import { isInstallmentValid } from '../utils/validateInstallment';

export class KronoosService {
  formatData(csvData: ICsvData[]): ICsvData[] {
    return csvData.map(data => {
      const formattedData: ICsvData = { 
        ...data,
        nrCpfCnpj: isDocumentValid(data.nrCpfCnpj) ? data.nrCpfCnpj : 'Documento inválido',
        dtVctPre: formatDate(data.dtVctPre as string),
        dtContrato: formatDate(data.dtContrato as string),
        vlPresta: isInstallmentValid(
          Number(data.vlTotal), 
          Number(data.qtPrestacoes), 
          Number(data.vlPresta)
        ) ? data.vlPresta : 'O campo vlTotal dividido por qtPrestacoes não é igual ao campo vlPresta.',
      };
  
      for (const key in formattedData) {
        const keyName = key as keyof typeof data;
        if (key.startsWith('vl') && !isNaN(Number(formattedData[keyName]))) 
          formattedData[keyName] = formatCurrency(Number(data[keyName]));
      }
  
      return formattedData;
    });
  };
  
  async readCsv(): Promise<ICsvData[]> {
    return new Promise((resolve, reject) => {
      const results: ICsvData[] = [];
      fs.createReadStream(path.resolve(__dirname, '..', '..', 'data.csv'))
        .pipe(csv())
        .on('data', (data: ICsvData) => results.push(data))
        .on('end', async () => {
          const formattedData = this.formatData(results);
          
          resolve(formattedData);
        })
        .on('error', (error: any) => reject(error));
    });
  }
}