export default function formatDateField(data: CsvData): CsvData {
  const fieldsToFormat = [
 'dtContrato',
 'dtVctPre'
  ];

  const formattedDataItem: CsvData = {
    ...data,
    ...fieldsToFormat.reduce((acc, field) => {
      if (typeof data[field] === 'string') {
        const FUF = data[field] as string
        const ano = parseInt(FUF.substring(0, 4), 10);
        const mes = parseInt(FUF.substring(4, 2), 10) - 1; 
        const dia = parseInt(FUF.substring(6, 2), 10);
        const date = new Date(ano, mes, dia);
        acc[field] = new Date(date)
      }
      return acc;
    }, {} as CsvData),
  };

  return formattedDataItem;
}