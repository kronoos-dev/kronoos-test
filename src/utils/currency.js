const numberFormat = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
	minimumFractionDigits: 2,
});

function formatCurrency(value) {
	const parsedValue = Number(value);
	if (isNaN(value) || value === null) return '';

	return numberFormat.format(parsedValue);
}

module.exports = { formatCurrency };
