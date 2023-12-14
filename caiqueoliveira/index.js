const csv = require('csv-parser')
const fs = require('fs')
const { cpf } = require('cpf-cnpj-validator');
const results = [];
const invalidCPFs = [];
const invalidSum = [];

fs.createReadStream('../data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {

        results.forEach((el) => {
            // coloca em um array os CPFs inválidos
            if (!cpf.isValid(el.nrCpfCnpj)) {
                invalidCPFs.push(el.nrCpfCnpj);
            }
            //coloca em um array os cliente com o valor inconsistente 
            if ((el.vlTotal / el.qtPrestacoes) != el.vlPresta) {
                invalidSum.push(el.cdClient);
            }

            el.vlTotal = Number(el.vlTotal).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            el.vlPresta = Number(el.vlPresta).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            el.vlMora = Number(el.vlMora).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            el.vlMulta = Number(el.vlMulta).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            el.vlOutAcr = Number(el.vlOutAcr).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            el.vlIof = Number(el.vlIof).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            el.vlDescon = Number(el.vlDescon).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            el.vlAtual = Number(el.vlAtual).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

            el.dtContrato = new Date(el.dtContrato.substring(0, 4), el.dtContrato.substring(4, 6) - 1, el.dtContrato.substring(6, 8));
            el.dtVctPre = new Date(el.dtVctPre.substring(0, 4), el.dtVctPre.substring(4, 6) - 1, el.dtVctPre.substring(6, 8));

        })
        //array com os dados tratados
        console.log(results);
        //array de cpf invalidos
        // console.log(invalidCPFs)
        //array de usuarios com os valores inválidos
        // console.log(invalidSum)

        if (invalidCPFs.length == 0) {
            console.log('All CPFs are Valid!')
        } else {
            console.log('there are:' + invalidCPFs.length + ' invalid CPFs.')
        }

        if (invalidSum.length == 0) {
            console.log('All Values are Valid!')
        } else {
            console.log('there are:' + invalidSum.length + ' invalid CPFs.')
        }

    });

