const Intl = require('intl');

const convertToBRL = (value) => {
	const converter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
	return converter.format(value);
};

const convertToDate = (dt) => {
	const year = dt.substring(0,4);
	const month = dt.substring(4,6);
	const day = dt.substring(6,8);
	return new Date(year, month-1, day);
};

module.exports = {
	convertToBRL,
	convertToDate,
};
