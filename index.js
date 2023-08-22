import * as fs from 'fs';
import csv from 'csv-parser'
import Intl  from 'intl'

const validateDigitFromSum = (validSum, validDig) => {
    const divisionRemainder = validSum % 11;
    const expectedDig = divisionRemainder < 2 ? 0 : 11 - divisionRemainder;
    return expectedDig === validDig;
}

const validateVlPresta = (vlTotal, qtPrestacoes, vlPresta) => {
    const expectedVlPresta = Math.round(Number(vlTotal)/Number(qtPrestacoes)*100)/100;
    return expectedVlPresta === Number(vlPresta);
}

const validateCpfCnpj = (documentNumber) => {
    if(documentNumber.length === 11){
        // CPF
        const numArray = documentNumber.split('').map((el) => Number(el));
        const validationDigit2 = numArray.pop();
        const validationDigit1 = numArray.pop();
        numArray.reverse();
        let validSum = 0;
        for(let i=0; i< numArray.length; i++){
            validSum += numArray[i] * (i+2);
        }
        if(!validateDigitFromSum(validSum, validationDigit1)){
            // FALHOU A PRIMEIRA VALIDAÇÃO - esse return poderia estar ao final do código por motivos 
            // de clareza, mas apenas por eficiencia é melhor que fique aqui, pois remove validações desnecessárias
             return false
        } 

        numArray.reverse().push(validationDigit1)
        numArray.reverse();
        validSum = 0;
        for(let i=0; i< numArray.length; i++){
            validSum += numArray[i] * (i+2);
        }
        if(!validateDigitFromSum(validSum, validationDigit2)){
            return false
        }
        return true
    } else if(documentNumber.length === 14) {
        // CNPJ
        const numArray = documentNumber.split('').map((el) => Number(el));
        const validationDigit2 = numArray.pop();
        const validationDigit1 = numArray.pop();
        const multipliers = [5,4,3,2,9,8,7,6,5,4,3,2];
        let validationSum = 0;
        for(let i=0; i < numArray.length; i++){
            validationSum += numArray[i] * multipliers[i];
        }
        if(!validateDigitFromSum(validationSum, validationDigit1)){
            // FALHOU A PRIMEIRA VALIDAÇÃO - esse return poderia estar ao final do código por motivos 
            // de clareza, mas apenas por eficiencia é melhor que fique aqui, pois remove validações desnecessárias
             return false
        }
        numArray.push(validationDigit1);
        multipliers.reverse().push(6);
        multipliers.reverse();
        validationSum = 0;
        for(let i=0; i < numArray.length; i++){
            validationSum += numArray[i] * multipliers[i];
        }
        if(!validateDigitFromSum(validationSum, validationDigit2)){
            return false
        }
        return true
    }
    return false
}

const fomatBRL = (currencyValue) =>{
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currencyValue)
}

const formatDate = (dateString) => {
    const dateStringArr = dateString.split('');
    const y = dateStringArr.slice(0,4);
    const m = dateStringArr.slice(4,6);
    const d = dateStringArr.slice(6,8);

    const year = Number(y.join(''));
    const month = Number(m.join('')) - 1;
    const day = Number(d.join(''));
    return new Date(year, month, day);
}

const parseCSV = (filePath) => {
    return new Promise((res,rej)=>{
        const csvData= [];
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data)=> {
            const {nrCpfCnpj, vlTotal, qtPrestacoes, vlPresta, vlMora, vlMulta, vlAtual, dtContrato, dtVctPre} = data;
            const validDocument = validateCpfCnpj(nrCpfCnpj);
            const validVlPresta = validateVlPresta(vlTotal,qtPrestacoes,vlPresta);
            const formattedData = {
                ...data,
                dtContrato: formatDate(dtContrato),
                dtContrato: formatDate(dtVctPre),
                vlTotal: fomatBRL(vlTotal),
                vlPresta: fomatBRL(vlPresta),
                vlMora: fomatBRL(vlMora),
                vlMulta: fomatBRL(vlMulta),
                vlAtual: fomatBRL(vlAtual),
            } 
            csvData.push(formattedData);
        })
        .on('end', ()=>{
            res(csvData)
        })
        .on('error', (err)=>{
            rej(err)
        })
    })
}
