import fs from 'fs';
import csvParser from 'csv-parser';

import { toJSDate } from './Utils/DateFormatter';
import { validateDocument } from './Utils/DocumentValidator';
import { validateInstallment } from './Utils/InstallmentValidator';
import { formatMoneyToBRL } from './Utils/MoneyFormatter';

import type { CsvUser, User } from "./Types/User";

const results: User[] = [];

fs.createReadStream('data.csv')
  .pipe(csvParser())
  .on('data', (data: CsvUser) => {

    validateInstallment(parseFloat(data.vlTotal), parseInt(data.qtPrestacoes, 10), parseFloat(data.vlPresta));
    validateDocument(data.nrCpfCnpj);

    const formattedData = {
      ...data,
      dtContrato: toJSDate(data.dtContrato),
      dtVctPre: toJSDate(data.dtVctPre),
      vlTotal: formatMoneyToBRL(parseFloat(data.vlTotal)),
      vlPresta: formatMoneyToBRL(parseFloat(data.vlPresta)),
      vlMora: formatMoneyToBRL(parseFloat(data.vlMora)),
      vlMulta: formatMoneyToBRL(parseFloat(data.vlMulta)),
      vlOutAcr: formatMoneyToBRL(parseFloat(data.vlOutAcr)),
      vlIof: formatMoneyToBRL(parseFloat(data.vlIof)),
      vlDescon: formatMoneyToBRL(parseFloat(data.vlDescon)),
      vlAtual: formatMoneyToBRL(parseFloat(data.vlAtual)),
    };

    results.push(formattedData);

  })
  .on('end', () => {
    console.log("Finalizado.");
  });