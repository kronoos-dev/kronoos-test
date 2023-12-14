// Manipulação de Dados de CSV e Conversão para Array
const fs = require('fs');
const csv = require('csv-parser');
const { cpf, cnpj } = require('cpf-cnpj-validator');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const results = [];

const numberFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {
    // Conversão de Dados para Moeda Real Brasileira
    data.vlTotal = numberFormat.format(data.vlTotal);
    data.vlPresta = numberFormat.format(data.vlPresta);
    data.vlMora = numberFormat.format(data.vlMora);
    
    // Validação de CPF ou CNPJ
    if (cpf.isValid(data.nrCpfCnpj)) {
      data.nrCpfCnpjValid = 'CPF válido';
    } else if (cnpj.isValid(data.nrCpfCnpj)) {
      data.nrCpfCnpjValid = 'CNPJ válido';
    } else {
      data.nrCpfCnpjValid = 'Inválido';
    }

    // Validação de Valor Total e Prestações
    const vlTotal = Number(data.vlTotal.replace(/[^\d.-]/g, ''));
    const qtPrestacoes = Number(data.qtPrestacoes);
    const vlPresta = Number(data.vlPresta.replace(/[^\d.-]/g, ''));

    const calculatedValue = vlTotal / qtPrestacoes;
    const roundedCalculatedValue = Math.round(calculatedValue * 100) / 100;

    if (roundedCalculatedValue !== vlPresta) {
        data.vlPrestaValid = false;
    }else{
        data.vlPrestaValid = true;
    }

    
    // Conversão de Datas para o Tipo Date
    const yearContrato = data.dtContrato.slice(0, 4);
    const monthContrato = data.dtContrato.slice(4, 6);
    const dayContrato = data.dtContrato.slice(6, 8);
    data.dtContrato = new Date(yearContrato, monthContrato - 1, dayContrato);

    const yearVctPre = data.dtVctPre.slice(0, 4);
    const monthVctPre = data.dtVctPre.slice(4, 6);
    const dayVctPre = data.dtVctPre.slice(6, 8);
    data.dtVctPre = new Date(yearVctPre, monthVctPre - 1, dayVctPre);
  
    results.push(data);
  })
  .on('end', () => {

    // Salvar resultados em um arquivo JSON
    const jsonData = JSON.stringify(results, null, 2);

    fs.writeFile('output.json', jsonData, 'utf8', (error) => {
      if (error) {
        console.error('Erro ao criar arquivo JSON:', error);
      } else {
        console.log('Arquivo JSON com os resultados criado com sucesso em output.json');
      }
    });

    
    // Criar arquivo CSV com os resultados 
    const csvWriter = createCsvWriter({
        path: 'output.csv',
        header: Object.keys(results[0]).map((key) => ({ id: key, title: key })),
      });
      
      csvWriter.writeRecords(results)
        .then(() => console.log('Arquivo CSV com os resultados criado com sucesso em output.csv'))
        .catch((error) => console.error('Erro ao criar arquivo CSV:', error));
  });