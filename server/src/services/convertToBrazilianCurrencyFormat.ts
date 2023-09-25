import { CsvData } from "../Model/csvModel";

function formatCurrency(value: number): string {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return formatter.format(value);
}


export default function formatCurrencyFields(data: CsvData): CsvData {
  const fieldsToFormat = [
    'vlPresta',
    'vlMora',
    'vlMulta',
    'vlOutAcr',
    'vlIof',
    'vlDescon',
    'vlAtual',
    'vlTotal',
  ];

  const formattedDataItem: CsvData = {
    ...data,
    ...fieldsToFormat.reduce((acc, field) => {
      if (typeof data[field] === 'number') {
        acc[field] = formatCurrency(data[field] as number);
      }
      return acc;
    }, {} as CsvData),
  };

  return formattedDataItem;
}