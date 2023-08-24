import { Request, Response, NextFunction } from 'express';

const fs = require('fs');
const csv = require('csv-parser')
csv({ separator: ',' });

export default class PaymentsController {
    async getPayments(req: Request, res: Response) {
        const results: any[] = [];
        let i = 1;
        await fs.createReadStream('data.csv')
            .pipe(csv())
            .on('data', (data: any) => {
                const nrCpfCnpjLength = data.nrCpfCnpj.length
                var nrCpfCnpjValido: boolean | string = nrCpfCnpjLength > 11 ? validaCNPJ(data.nrCpfCnpj) : validaCPF(data.nrCpfCnpj);

                if (!nrCpfCnpjValido && nrCpfCnpjLength > 11) {
                    nrCpfCnpjValido = "CNPJ Invalido"
                }
                else if (!nrCpfCnpjValido && nrCpfCnpjLength <= 11) {
                    nrCpfCnpjValido = "CPF Invalido"
                }

                const valorCerto: boolean = (parseFloat(data.vlTotal) / parseFloat(data.qtPrestacoes)).toFixed(2) == data.vlPresta ? true : false;                

                results.push({
                    ...data,
                    vlTotal: parseFloat(data.vlTotal).toLocaleString('pt-Br', { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    vlPresta: parseFloat(data.vlPresta).toLocaleString('pt-Br', { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    vlMora: parseFloat(data.vlMora).toLocaleString('pt-Br', { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    dtContrato: parseDate(data.dtContrato),
                    dtVctPre: parseDate(data.dtVctPre),
                    nrCpfCnpjValido: nrCpfCnpjValido,
                    valorCerto: valorCerto,
                    id: i
                })
                i++;
            })
            .on('end', () => {                
                res.status(200).json(results)
            });

    }
}

// ajusta a data
function parseDate(date: string) {
    if(!/^(\d){8}$/.test(date)) return "invalid date";
    var y = parseInt(date.substr(0,4));
    var m = parseInt(date.substr(4,2)) - 1 ;
    var d = parseInt(date.substr(6,2)) ;
    return new Date(y,m,d);
}

// Valida CPF
function validaCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    if (
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" ||
        cpf == "01234567890") {
        return false;
    }
    let add: number = 0;
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev: number = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
        rev = 0;
    }
    if (rev != parseInt(cpf.charAt(9))) {
        return false;
    }
    add = 0;
    for (let i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
        rev = 0;
    }
    if (rev != parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
}

// Valida CNPJ
function validaCNPJ(CNPJ: string) {
    CNPJ = CNPJ.replace(/[^\d]+/g, '');
    let b: number = 0;
    let a: any[] = [];
    var c = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 12; i++) {
        a[i] = CNPJ.charAt(i);
        b += a[i] * c[i + 1];
    }
    let x = b % 11;
    if (x < 2) {
        a[12] = 0
    } else {
        a[12] = 11 - x
    }
    b = 0;
    for (let y = 0; y < 13; y++) {
        b += (a[y] * c[y]);
    }
    if ((x = b % 11) < 2) { a[13] = 0; } else { a[13] = 11 - x; }
    if ((CNPJ.charAt(12) != a[12]) || (CNPJ.charAt(13) != a[13])) {
        return false;
    }
    if (CNPJ == '00000000000000') {
        return false;
    }
    return true;
}
