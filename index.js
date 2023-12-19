const csv = require('csv-parser');
const fs = require('fs');
const { converters, validators } = require('./utils');

const validateDocument = ({ nrCpfCnpj }) => {
	if (validators.isValidCPF(nrCpfCnpj)) {
		return { tpDocumento: 'CPF' };
	}
	if (validators.isValidCNPJ(nrCpfCnpj)) {
		return { tpDocumento: 'CNPJ' };
	}
	return { tpDocumento: 'Documento Invalido' };
};

const run = (file = 'data.csv') => {
	const results = [];
	const resultFilePath = './result.json';
	console.log(`Started processing of ${file}...`);
	fs.createReadStream(file)
		.pipe(csv())
		.on('data', (data) => {
			const prestacaoValida = validators.hasValidPrestacoes(data);
			results.push({
				...data,
				...validateDocument(data),
				vlTotal: converters.convertToBRL(data.vlTotal),
				vlPresta: converters.convertToBRL(data.vlPresta),
				vlMora: converters.convertToBRL(data.vlMora),
				dtVctPre: converters.convertToDate(data.dtVctPre),
				dtContrato: converters.convertToDate(data.dtContrato),
				prestacaoValida,
			});
		})
		.on('end', () => {
			console.log(`Finished processing. Saving JSON to file...`);
			fs.writeFileSync(resultFilePath, JSON.stringify(results, null, 2));
			console.log(`Finished processing ${file} saved JSON array to ${resultFilePath}`);
		});
};

run();
