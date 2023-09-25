import * as fs from 'node:fs';
import csvParser from 'csv-parser';
import { CsvData } from '../Model/csvModel';

export default function readCsvAndConvertToArray(filePath: string): Promise<CsvData[]> {
  return new Promise((resolve, reject) => {
    const dataArray: CsvData[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        dataArray.push({
          nrInst: row.nrInst,
          nrAgencia: row.nrAgencia,
          cdClient: row.cdClient,
          nmClient: row.nmClient,
          nrCpfCnpj: row.nrCpfCnpj,
          nrContrato: row.nrContrato,
          dtContrato: row.dtContrato,
          qtPrestacoes: parseInt(row.qtPrestacoes),
          vlTotal: parseFloat(row.vlTotal),
          cdProduto: row.cdProduto,
          dsProduto: row.dsProduto,
          cdCarteira: row.cdCarteira,
          dsCarteira: row.dsCarteira,
          nrProposta: row.nrProposta,
          nrPresta: row.nrPresta,
          tpPresta: row.tpPresta,
          nrSeqPre: row.nrSeqPre,
          dtVctPre: row.dtVctPre,
          vlPresta: parseFloat(row.vlPresta),
          vlMora: parseFloat(row.vlMora),
          vlMulta: parseFloat(row.vlMulta),
          vlOutAcr: parseFloat(row.vlOutAcr),
          vlIof: parseFloat(row.vlIof),
          vlDescon: parseFloat(row.vlDescon),
          vlAtual: parseFloat(row.vlAtual),
          idSituac: row.idSituac,
          idSitVen: row.idSitVen
        })
      })
      .on('end', () => {
        resolve(dataArray);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// {
//   nrInst: row.nrInst,
//   nrAgencia: row.nrAgencia,
//   cdClient: row.cdClient,
//   nmClient: row.nmClient,
//   nrCpfCnpj: row.nrCpfCnpj,
//   nrContrato: row.nrContrato,
//   dtContrato: row.dtContrato,
//   qtPrestacoes: parseInt(row.qtPrestacoes),
//   vlTotal: parseFloat(row.vlTotal),
//   cdProduto: row.cdProduto,
//   dsProduto: row.dsProduto,
//   cdCarteira: row.cdCarteira,
//   dsCarteira: row.dsCarteira,
//   nrProposta: row.nrProposta,
//   nrPresta: row.nrPresta,
//   tpPresta: row.tpPresta,
//   nrSeqPre: row.nrSeqPre,
//   dtVctPre: row.dtVctPre,
//   vlPresta: parseFloat(row.vlPresta),
//   vlMora: parseFloat(row.vlMora),
//   vlMulta: parseFloat(row.vlMulta),
//   vlOutAcr: parseFloat(row.vlOutAcr),
//   vlIof: parseFloat(row.vlIof),
//   vlDescon: parseFloat(row.vlDescon),
//   vlAtual: parseFloat(row.vlAtual),
//   idSituac: row.idSituac,
//   idSitVen: row.idSitVen,
// }