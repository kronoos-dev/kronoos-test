const CPF_LENGTH = 11;
const CNPJ_LENGTH = 14;

export const validateCpfCnpj = (docNumber) => {
    const numericOnly = docNumber.replace(/\D/g,''); // remove all non numeric characters
    if (numericOnly.length === CPF_LENGTH) {
        return validateCpf(numericOnly);
    }
    if (numericOnly.length === CNPJ_LENGTH) {
        return validateCnpj(numericOnly);
    }
    return false
}

export const validatePrest = (data) => {
    const roundDown = Math.floor(Number(data.vlTotal) * 100 / Number(data.qtPrestacoes)) / 100;
    const roundUp = Math.ceil(Number(data.vlTotal) * 100 / Number(data.qtPrestacoes)) / 100;
    if (Number(data.vlPresta) === roundUp || Number(data.vlPresta) === roundDown){
        return true;
    }
    return false;
}

export const dateFromString = (date) => {
    const year = Number(date.substring(0, 4));
    const month = Number(date.substring(4, 6));
    const day = Number(date.substring(6, 8));

    return new Date(Date.UTC(year, month, day));
}

export const calculatePrestValue = (data) => {
    return Math.ceil(Number(data.vlTotal) * 100 / Number(data.qtPrestacoes)) / 100;
}

export const numberToCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value))
}

const validateCpf = (docNumber) => {
    let total = 0;
    let rest = 0;

    if (docNumber === "00000000000"){
        return false
    }

    for (let i = 0; i < 9; i++){
        const digit = Number(docNumber.charAt(i));
        total += digit * (CPF_LENGTH - i -1);
    }

    rest = total * 10 % CPF_LENGTH;
    rest = rest === 10 ? 0 : rest;

    if (rest !== Number(docNumber.charAt(9))) {
        return false;
    }

    total = 0;

    for (let i = 0; i < 10; i++){
        const digit = Number(docNumber.charAt(i));
        total += digit * (CPF_LENGTH - i);
    }

    rest = total * 10 % CPF_LENGTH;
    rest = rest === 10 ? 0 : rest;

    if (rest !== Number(docNumber.charAt(10))) {
        return false;
    }

    return true;
}

const validateCnpj = (docNumber) => {
    if (invalidCnpjs.includes(docNumber)) {
        return false;
    }

    let total = 0;
    let rest = 0;
    let mult = 5;
    let verify = 0;

    for (let i = 0; i < 12; i++) {
        total += docNumber.charAt(i) * mult;
        mult--;
        if (mult < 2){
            mult = 9;
        }
    }

    rest = total % 11;
    verify = rest < 2 ? 0 : 11 - rest;

    if (verify !== Number(docNumber.charAt(CNPJ_LENGTH - 2))){
        console.log('FALSE, ESPERAVA: ', verify, docNumber.charAt(CNPJ_LENGTH - 2))
        return false;
    }
         
    total = 0;
    mult = 6;
    rest = 0;
    verify = 0;

    for (let i = 0; i < 13; i++) {
        total += docNumber.charAt(i) * mult;
        mult--;
        if (mult < 2){
            mult = 9;
        }
    }

    rest = total % 11;
    verify = rest < 2 ? 0 : 11 - rest;

    if (verify !== Number(docNumber.charAt(CNPJ_LENGTH - 1))){
        console.log('FALSE2, ESPERAVA: ', verify, docNumber.charAt(CNPJ_LENGTH - 2))
        return false;
    }
           
    return true;
}

const invalidCnpjs = [
    "00000000000000",
    "11111111111111",
    "22222222222222",
    "33333333333333",
    "44444444444444",
    "55555555555555",
    "66666666666666",
    "77777777777777",
    "88888888888888",
    "99999999999999",
]