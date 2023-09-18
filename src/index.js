import { createReadStream } from 'node:fs';
import csv from 'csv-parser';

import { convertStringToDate } from './utils/convertStringToDate.js';
import { formatCurrency } from './utils/formatCurrency.js';
import { validateDocument } from './utils/validateDocument.js';
import { validateInstallmentsValue } from './utils/validateInstallmentsValue.js';

const main = () => {
  let items = [];
  const filepath = 'data.csv';

  createReadStream(filepath)
    .pipe(csv())
    .on('data', (row) => {
      const prestacaoValida = validateInstallmentsValue(
        parseFloat(row.vlPresta),
        parseInt(row.qtPrestacoes),
        parseFloat(row.vlTotal)
      );
      const cpfCnpjValido = validateDocument(row.nrCpfCnpj);


      items.push({
        ...row,
        dtContrato: convertStringToDate(row.dtContrato),
        dtVctPre: convertStringToDate(row.dtVctPre),
        vlTotal: formatCurrency(row.vlTotal),
        vlPresta: formatCurrency(row.vlPresta),
        vlMora: formatCurrency(row.vlMora),
        prestacaoValida,
        cpfCnpjValido,
      });
    })
    .on('end', () => console.table(items));
};

main();