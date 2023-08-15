const fs = require('fs');
const csv = require('csv-parser');
const util = require('util');
const { validateCpf, validateCnpj, formatCpfCnpj } = require('./cpf-cnpj-validation');

const data = [];

fs.createReadStream('./data/data.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    function convertToDate(dateStr) {
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6) - 1;
      const day = dateStr.substring(6, 8);
      return new Date(year, month, day);
    }

    function formatCurrency(value) {
      return formatter.format(parseFloat(value.replace(',', '.')));
    }

    const validatedData = data.map((row) => {
      const formattedVlTotal = formatCurrency(row.vlTotal);
      const formattedVlPresta = formatCurrency(row.vlPresta);
      const formattedVlMora = formatCurrency(row.vlMora);
      const formattedVlMulta = formatCurrency(row.vlMulta);
      const formattedVlOutAcr = formatCurrency(row.vlOutAcr);
      const formattedVlIof = formatCurrency(row.vlIof);
      const formattedVlDescon = formatCurrency(row.vlDescon);
      const formattedVlAtual = formatCurrency(row.vlAtual);

      const numberOfInstallments = parseInt(row.qtPrestacoes);
      const totalValue = parseFloat(row.vlTotal.replace(',', '.'));
      const installmentValue = parseFloat(row.vlPresta.replace(',', '.'));
      const calculatedValue = totalValue / numberOfInstallments;
      const isValidValue = Math.abs(calculatedValue - installmentValue) < 0.01;

      const formattedCpfCnpj = formatCpfCnpj(row.nrCpfCnpj);
      const isCpfOrCnpjValid = validateCpf(row.nrCpfCnpj) || validateCnpj(row.nrCpfCnpj);

      const contractDate = convertToDate(row.dtContrato);
      const dueDate = convertToDate(row.dtVctPre);

      return {
        ...row,
        vlTotal: formattedVlTotal,
        vlPresta: formattedVlPresta,
        vlMora: formattedVlMora,
        vlMulta: formattedVlMulta,
        vlOutAcr: formattedVlOutAcr,
        vlIof: formattedVlIof,
        vlDescon: formattedVlDescon,
        vlAtual: formattedVlAtual,
        isValidValue,
        formattedCpfCnpj,
        isCpfOrCnpjValid,
        contractDate,
        dueDate
      };
    });

    fs.writeFileSync('./output.json', JSON.stringify(validatedData, null, 2));

    console.log(util.inspect(validatedData, { depth: null, maxArrayLength: null }));
  });
