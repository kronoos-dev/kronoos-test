const BLACKLIST = [
	'00000000000',
	'11111111111',
	'22222222222',
	'33333333333',
	'44444444444',
	'55555555555',
	'66666666666',
	'77777777777',
	'88888888888',
	'99999999999',
	'12345678909',
];

function verifierDigit(value) {
	const mod =
		value
			.split('')
			.slice(value.length - 9, value.length)
			.reduce((prev, cur, i) => prev + Number.parseInt(cur, 10) * (10 - i), 0) %
		11;
	return mod < 2 ? 0 : 11 - mod;
}

function verifierDigits(value) {
	let digits = value.slice(0, 9);
	digits += verifierDigit(digits);
	digits += verifierDigit(digits);
	return digits.slice(9, 11);
}

function isValidCPF(value) {
	if (!value || typeof value !== 'string') return false;

	if (value.length !== 11) return false;

	// validate blacklisted values
	if (BLACKLIST.includes(value)) return false;

	// validate verifier digits
	const verifier = verifierDigits(value);
	return verifier === value.slice(9, 11);
}

module.exports = { isValidCPF };
