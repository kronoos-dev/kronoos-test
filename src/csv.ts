import csvParser from 'csv-parser';
import * as fs from 'fs';
import { calculateInstallments } from './utils';
import { formatToCpfCnpj, formatToCurrency, formatToDate } from './formaters';
import { validateCpfCnpj } from './validators';

type ICSVDataObjectKeys = { [key: string]: string | number | boolean | undefined | Date };

export interface ICSVData extends ICSVDataObjectKeys {
  nrInst: number;
  nrAgencia: number;
  cdClient: number;
  nmClient: string;
  nrCpfCnpj: string;
  nrContrato: number;
  dtContrato: Date;
  qtPrestacoes: number;
  vlTotal: number;
  cdProduto: number;
  dsProduto: string;
  cdCarteira: number;
  dsCarteira: string;
  nrProposta: number;
  nrPresta: number;
  tpPresta: string;
  nrSeqPre: number;
  dtVctPre: Date;
  vlPresta: number;
  vlMora: number;
  vlMulta: number;
  vlOutAcr: number;
  vlIof: number;
  vlDescon: number;
  vlAtual: number;
  idSituac: string;
  idSitVen: string;
  invalidCpfCnpj?: boolean;
}

type FieldSchema = {
  [key: string]: 'string' | 'date' | 'document' | 'number' | 'float' | 'currency';
};

export interface IProcessDataOptions {
  formatCurrency?: boolean;
  syncInstallments?: boolean;
  formatCpfCnpj?: boolean;
}

const fieldSchema: FieldSchema[] = [
  {
    nrInst: 'number',
    nrAgencia: 'number',
    cdClient: 'number',
    nrCpfCnpj: 'document',
    qtPrestacoes: 'number',
    cdProduto: 'number',
    cdCarteira: 'number',
    nrProposta: 'number',
    nrPresta: 'number',
    nrSeqPre: 'number',
    nrContrato: 'number',
    dtContrato: 'date',
    dtVctPre: 'date',
    vlTotal: 'currency',
    vlPresta: 'currency',
    vlMora: 'currency',
    vlMulta: 'currency',
    vlOutAcr: 'currency',
    vlIof: 'currency',
    vlDescon: 'currency',
    vlAtual: 'currency',
  },
];

export function getCsvData(
  csvFile: fs.PathLike,
  options?: IProcessDataOptions,
): Promise<ICSVData[]> {
  const data: ICSVData[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFile)
      .pipe(csvParser())
      .on('data', (row: ICSVData) => {
        const processedData = processData(row, fieldSchema, options);

        data.push(processedData);
      })
      .on('end', () => resolve(data))
      .on('error', error => reject(error));
  });
}

function processData(
  data: ICSVData,
  fieldSchema: FieldSchema[],
  options?: IProcessDataOptions,
): ICSVData {
  if (options?.syncInstallments) {
    data.vlPresta = calculateInstallments(
      parseFloat(String(data.vlTotal)),
      parseInt(String(data.qtPrestacoes)),
    );
  }

  for (let [_index, [dataKey, dataValue]] of Object.entries(data).entries()) {
    for (let field of fieldSchema) {
      switch (field[dataKey]) {
        case 'number':
          data[dataKey] = parseInt(String(dataValue));
          break;
        case 'float':
          data[dataKey] = parseFloat(String(dataValue));
          break;
        case 'date':
          data[dataKey] = formatToDate(String(dataValue));
          break;
        case 'string':
          data[dataKey] = String(data[dataKey]);
          break;
        case 'document':
          if (!validateCpfCnpj(String(data.nrCpfCnpj))) {
            data.invalidCpfCnpj = true;
          } else {
            if (options?.formatCpfCnpj) {
              data.nrCpfCnpj = formatToCpfCnpj(data.nrCpfCnpj);
            }
          }

          break;
        case 'currency':
          if (options?.formatCurrency) {
            data[dataKey] = formatToCurrency(parseFloat(String(dataValue)));
            break;
          }

          data[dataKey] = parseFloat(String(dataValue));

          break;
        default:
          break;
      }
    }
  }

  return data;
}
