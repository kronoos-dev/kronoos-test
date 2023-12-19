const csv = require('csv-parser');
const fs = require('fs');

const { formatCurrency } = require('./utils/currency');
const { isValidCNPJ } = require('./utils/cnpj');
const { isValidCPF } = require('./utils/cpf');
const { YYYYMMDDToDate } = require('./utils/date');

const results = [];
const errors = [];

function isValidCPForCNPJ(value) {
	return isValidCPF(value) || isValidCNPJ(value);
}

fs.createReadStream('./data.csv')
	.pipe(csv())
	.on('data', (data) => {
		const calculatedValue = data.vlTotal / data.qtPrestacoes;
		const roundedValue = Math.round(calculatedValue * 100) / 100;

		if (roundedValue !== data.vlPresta) {
			errors.push({
				...data,
				reason: 'vlPresta is not equal to vlTotal / qtPrestacoes',
			});
		}

		if (!isValidCPForCNPJ(data.nrCpfCnpj)) {
			errors.push({
				...data,
				reason: 'nrCpfCnpj is not valid',
			});
		}

		data.vlTotal = formatCurrency(data.vlTotal);
		data.vlPresta = formatCurrency(data.vlPresta);
		data.vlMora = formatCurrency(data.vlMora);
		data.vlMulta = formatCurrency(data.vlMulta);
		data.vlOutAcr = formatCurrency(data.vlOutAcr);
		data.vlIof = formatCurrency(data.vlIof);
		data.vlDescon = formatCurrency(data.vlDescon);
		data.vlAtual = formatCurrency(data.vlAtual);

		data.dtContrato = YYYYMMDDToDate(data.dtContrato);
		data.dtVctPre = YYYYMMDDToDate(data.dtVctPre);

		results.push(data);
	})
	.on('end', () => {
		console.log('🟩 CSV file successfully processed');
		console.log('🛑 Errors found:', errors.length);
	});
