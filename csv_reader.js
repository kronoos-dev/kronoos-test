const csv = require('csv-parser');
const fs = require('fs');
const { validationTotalValue, cpfORCNPJ, dataConvert, formatRealCurrency } = require('./lib');

const resultCNPJ = [];
const resultCPF = [];

fs.createReadStream('data.csv').pipe(csv()).on('data', (data) => {
  
    validationTotalValue(data.vlTotal, data.qtPrestacoes, data.vlPresta) 
    
    const isCPF = cpfORCNPJ(data.nrCpfCnpj)
    
    data.dtContrato = dataConvert(data.dtContrato);
    data.dtVctPre = dataConvert(data.dtVctPre);
    data.vlTotal = formatRealCurrency(data.vlTotal);
    data.vlPresta = formatRealCurrency(data.vlPresta);
    data.vlMora = formatRealCurrency(data.vlMora);
    data.vlMulta = formatRealCurrency(data.vlMulta);
    data.vlAtual = formatRealCurrency(data.vlAtual);
    data.vlOutAcr = formatRealCurrency(data.vlOutAcr);
    data.vlIof = formatRealCurrency(data.vlIof);


    console.log(data)
    if(isCPF === 'CNPJ') {
        resultCNPJ.push(data)
    } else {
        resultCPF.push(data)
    }
    
}).on('end', () => {
    console.log('End of Program')
    console.log(resultCPF, resultCNPJ);
})