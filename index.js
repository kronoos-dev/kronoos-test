const csv = require('csv-parser')
const fs = require('fs')
const currency = require('./Utils/currency');
const documentation = require('./Utils/document');
const date = require('./Utils/date');
const results = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {
    results.push(ConvertData(data))
  })
  .on('end', () => {
    console.log(results);
});

function ConvertData(data){
    return {
        ...data,
        nrCpfCnpj: documentation.validateRegistrationNumber(data.nrCpfCnpj),
        vlTotal: currency.convertToBRL(data.vlTotal),
        vlPresta: currency.convertToBRL(data.vlPresta),
        vlMora: currency.convertToBRL(data.vlMora),
        prestacoesValidas: VerifyParcels(data.vlTotal, data.qtPrestacoes, data.vlPresta),
        dtContrato: date.convertDate(data.dtContrato),
        dtVctPre: date.convertDate(data.dtVctPre)
    }
}

function VerifyParcels(total, parcels, parcelValue){
   return total / parcels === parcelValue;
}