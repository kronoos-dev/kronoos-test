const { formatCurrencyValues, cpfCnpj, verifyVlTotal, convertToDate } = require("./kronoos-modules.js")
const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream("./data.csv")
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    results.map(entry => {   
      // Format currency values and insert into object for the following keys: 
      //  'vlTotal', 'vlPresta', 'vlMora', 'vlMulta', 'vlAtual'
      formatCurrencyValues(entry)
      // Return 'true' if Cpf/Cnpj is valid, 'false' if not valid
      cpfCnpj(entry)
      // Return 'true' if vlTotal divided by qtPrestacoes is equal to vlPresta
      verifyVlTotal(entry)
      // Create Date objects for 'dtContrato' and 'dtVctPre'
      convertToDate(entry['dtContrato'])
      convertToDate(entry['dtVctPre'])
    })
    console.log(results.slice(0, 25))
})

