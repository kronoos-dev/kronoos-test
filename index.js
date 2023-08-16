const csv = require('csv-parser')
const fs = require('fs');
const { cpfCnpValidator, formatToDateType, compareTotalValueWithInstallments } = require('./utils');
const results = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {
    /*
    Faço as validações de cpf antes para quando for fazer as formatações fazer nos dados já filtrados reduzindo o tempo de processamento dá para testar 
    usando o 'time node index.js' para isso voce pode colocar as linhas 13 e 14 no final do arquivo (antes do results.push(data)) e comparar o tempo de execução
    */
    data.nrCpfCnpj = cpfCnpValidator(data.nrCpfCnpj) ? data.nrCpfCnpj : 'valor inválido'
    if (data.nrCpfCnpj === 'valor inválido') return

    /*
    preferi essa abordagem para ainda ter um output de dados pois pelo que parece nenhuma parcela esta correta
    */
    data.correctInstallments = compareTotalValueWithInstallments(data)

    /*
    Percebi que os campos para serem formatados possuiam o padrao de iniciarem o vl, sendo assim, decidi fazer uma regEx 
    para identificar os campos que precisavam ser alterados ao inves de manualmente setar um por um 
    */
    const Reg = /\b(vl)[a-zA-Z]*\b/
    const keys = Object.getOwnPropertyNames(data)

    const keysToApplyNumberFormat = keys.map(el => {
        if(el.match(Reg)) return el
    }).filter(el => el)

    keysToApplyNumberFormat.map(key => {
        data[key] = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data[key])
    })

    /*
    Por fim faço a formatação de datas no fomato YYYYMMDD para o Date do js
    */
    data.dtContrato = formatToDateType(data.dtContrato)
    data.dtVctPre = formatToDateType(data.dtVctPre)

    results.push(data)
    })
  .on('end', () => {
    console.log(results)
  });

