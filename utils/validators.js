const hasDistinctDigits = (str) => {
	return new Set(str).size > 1;
};

const isValidCPF = (cpf) => {
	if (!cpf || cpf.length !== 11 || !hasDistinctDigits(cpf)) {
		return false;
	}
	let sum = 0;
	for (let i=0;i<=8;i++) {
		sum += parseInt(cpf[i]) * (10-i);
	}
	const calculatedFirstDigit = (sum*10)%11;
	if (!(calculatedFirstDigit == 10 && cpf[9] == 0) && calculatedFirstDigit != cpf[9]) {
		return false;
	}
	sum = 0;
	for (let i=0;i<=9;i++) {
		sum += parseInt(cpf[i]) * (11-i);
	}
	const calculatedSecondDigit = (sum*10)%11;
	if (!(calculatedSecondDigit == 10 && cpf[10] == 0) && calculatedSecondDigit != cpf[10]) {
		return false;
	}
	return true;
};

const isValidCNPJ = (cnpj) => {
	if (!cnpj || cnpj.length !== 14 || !hasDistinctDigits(cnpj)) {
		return false;
	}
	let size = cnpj.length-2;
	let numbers = cnpj.substring(0, size);
	const digits = cnpj.substring(size);
	let position = size - 7;
	let sum = 0;
	for (let i = size; i >= 1; i--) {
		sum += numbers.charAt(size - i) * position--;
		if (position < 2) {
			position = 9;
		}
	}
	let calculatedResult = sum % 11 < 2 ? 0 : 11 - sum % 11;
	if (calculatedResult != digits.charAt(0)) return false;
	size = size + 1;
	numbers = cnpj.substring(0, size);
	sum = 0;
	position = size - 7;
	for (let i = size; i >= 1; i--) {
		sum += numbers.charAt(size - i) * position--;
		if (position < 2) position = 9;
	}
	calculatedResult = sum % 11 < 2 ? 0 : 11 - sum % 11;
	if (calculatedResult != digits.charAt(1)) return false;
	return true;
};

const hasValidPrestacoes = ({ vlTotal, qtPrestacoes, vlPresta }) => {
	const total = Number(vlTotal);
	const prestacoes = Number(qtPrestacoes);
	const calculatedPresta = total / prestacoes;
	return calculatedPresta.toFixed(2) === Number(vlPresta).toFixed(2);
};

module.exports = {
	isValidCPF,
	isValidCNPJ,
	hasValidPrestacoes,
};
