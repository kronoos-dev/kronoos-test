import { getCsvData } from '../src';

getCsvData('./data/data.csv', {
  formatCurrency: true,
  formatCpfCnpj: true,
  syncInstallments: true,
})
  .then(csv => {
    console.log('csv', csv);
  })
  .catch(error => {
    console.log('Error', error);
  });
