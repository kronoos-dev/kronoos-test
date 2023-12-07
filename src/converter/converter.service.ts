import fs from 'fs';
import csv from 'csv-parser';
import { floatToCurrency } from '../utils/number/currency';
import { validateCpfCnpj } from '../utils/validator/validateCpfCnpj';
import { checkFileExists } from '../utils/fs/checkFileExists';
import { checkInstallmentValid } from '../utils/number/checkInstallmentValid';
import { stringToDate } from '../utils/date/date';
import { DTODataSource } from './decorators/datasource.decorator';


export class ConverterService{
    csv2array(filename:string) : any {
        return new Promise((resolve, reject) => {

            let dataSource:DTODataSource[] = [];

            try {
                //Retorna uma exceção caso não encontre o arquivo
                checkFileExists(filename)

                fs.createReadStream(filename)
                    .pipe(csv())
                    .on('data', (row) => {
                        let line:DTODataSource = {
                            ...row,
                            vlPresta: floatToCurrency(row?.vlPresta),
                            vlMora: floatToCurrency(row?.vlMora),
                            vlMulta: floatToCurrency(row?.vlMulta),
                            vlOutAcr: floatToCurrency(row?.vlOutAcr),
                            vlIof: floatToCurrency(row?.vlIof),
                            vlDescon: floatToCurrency(row?.vlDescon),
                            vlAtual: floatToCurrency(row?.vlAtual),
                            vlTotal: floatToCurrency(row?.vlTotal),
                            nrCpfCnpj: validateCpfCnpj(row?.nrCpfCnpj),
                            tpPrestacao: checkInstallmentValid(row?.vlTotal, row?.qtPrestacoes, row?.vlPresta) ? 'Válida' : 'Inválida',
                            dtContrato: stringToDate(row?.dtContrato),
                            dtVctPre: stringToDate(row?.dtVctPre),
                        }
                        dataSource.push(line)
                    })
                    .on('end', () => {
                        resolve({status:200, response:{
                            dataSource
                        }})
                    });

            } catch (exception : any) {
                reject({
                    status: 422,
                    response: {
                        errorMsg:exception.message
                    }   
                })
            }
    })
    }
}