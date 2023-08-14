const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parser');
const { cpf, cnpj } = require('cpf-cnpj-validator');
const moment = require('moment');

interface CSVData {
    vlMora: string;
    vlPresta: string;
    vlTotal: string;
    nrCpfCnpj: string;
    dtContrato: string;
    dtVctPre: string;
    qtPrestacoes: string;
}

export class LeitorArquivos {
    lerArquivosNaPasta(pasta: string) {
        fs.readdir(pasta, (err: NodeJS.ErrnoException | null, files: string[]) => {
            if (err) {
                console.error('Erro ao ler a pasta:', err);
                return;
            }

            files.forEach((file) => {
                const filePath = path.join(pasta, file);
                this.lerArquivoCSV(filePath);
            });
        });
    }

    lerArquivoCSV(filePath: string) {
        const dataArray: CSVData[] = [];

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data: CSVData) => {
                dataArray.push(data);
            })
            .on('end', () => {
                this.processData(dataArray);
            });
    }

    processData(dataArray: CSVData[]) {
        dataArray.forEach((item) => {
            if (!cpf.isValid(item.nrCpfCnpj) && !cnpj.isValid(item.nrCpfCnpj)) {
                console.log(`CPF/CNPJ inválido: ${item.nrCpfCnpj}`);
            }

            item.dtContrato = moment(item.dtContrato, 'YYYYMMDD').toDate();
            item.dtVctPre = moment(item.dtVctPre, 'YYYYMMDD').toDate();

            const numberFormatter = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            item.vlTotal = numberFormatter.format(parseFloat(item.vlTotal));
            item.vlPresta = numberFormatter.format(parseFloat(item.vlPresta));
            item.vlMora = numberFormatter.format(parseFloat(item.vlMora));

            const vlTotal = parseFloat(item.vlTotal.replace('R$', '').replace(',', ''));
            const vlPresta = parseFloat(item.vlPresta.replace('R$', '').replace(',', ''));
            const qtPrestacoes = parseInt(item.qtPrestacoes, 10);

            const calculatedPresta = vlTotal / qtPrestacoes;
            if (calculatedPresta !== vlPresta) {
                console.log(`Valor de prestação inconsistente para ${item.nrCpfCnpj}`);
            }
        });
        console.log(dataArray);
    }
}
