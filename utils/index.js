import moment from "moment";
import Intl from "intl";

function validTotalPrestacoes(vlTotal, qtdPrestacoes, vlPresta) {
    if(vlTotal && qtdPrestacoes && vlPresta) {
        vlTotal = Number(vlTotal);
        qtdPrestacoes = Number(qtdPrestacoes);
        vlPresta = Number(vlPresta);
        const resultPresta = Number(Number(vlTotal / qtdPrestacoes).toFixed(2));

        return resultPresta === vlPresta;
    } else {
        return false;
    }
}

function strToDate(dateStr) {
    if(dateStr.length !== 8) return dateStr;

    const date = moment(dateStr, 'YYYYMMDD').toDate();
    return date;
}

function convertToCurrency(row) {
    const formCurrency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    })
    row.vlTotal = row?.vlTotal ? formCurrency.format(row.vlTotal) : '';
    row.vlPresta = row?.vlPresta ? formCurrency.format(row.vlPresta) : '';
    row.vlMora = row?.vlMora ? formCurrency.format(row.vlMora) : '';
    row.vlAtual = row?.vlAtual ? formCurrency.format(row.vlAtual) : '';
    row.vlMulta = row?.vlMulta ? formCurrency.format(row.vlMulta) : '';
    row.vlOutAcr = row?.vlOutAcr ? formCurrency.format(row.vlOutAcr) : '';
    row.vlIof = row?.vlIof ? formCurrency.format(row.vlIof) : '';
    row.vlDescon = row?.vlDescon ? formCurrency.format(row.vlDescon) : '';

    return row;
}

function checkCPFCNPJ(cpfCnpj) {
    const onlyDigits = cpfCnpj.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (onlyDigits.length === 11) {
        return validateCPF(onlyDigits);
    } else if (onlyDigits.length === 14) {
        return validateCNPJ(onlyDigits);
    } else {
        return false; // Retornar falso se não for nem CPF nem CNPJ válido
    }
}

function validateCPF(cpf) {
    const cpfRegex = /^\d{11}$/;
    return cpfRegex.test(cpf);
}

function validateCNPJ(cnpj) {
    const cnpjRegex = /^\d{14}$/;
    return cnpjRegex.test(cnpj);
}

export default {
    validTotalPrestacoes,
    strToDate,
    convertToCurrency,
    checkCPFCNPJ,
    validateCPF,
    validateCNPJ
};