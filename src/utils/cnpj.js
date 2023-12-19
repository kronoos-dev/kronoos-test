const BLACKLIST = [
	'00000000000000',
	'11111111111111',
	'22222222222222',
	'33333333333333',
	'44444444444444',
	'55555555555555',
	'66666666666666',
	'77777777777777',
	'88888888888888',
	'99999999999999',
];

function verifierDigit(value) {
	let multiplier = 2;
	const mod =
		value
			.split('')
			.reverse()
			.reduce((prev, cur) => {
				prev += Number.parseInt(cur) * multiplier;
				multiplier = multiplier === 9 ? 2 : multiplier + 1;
				return prev;
			}, 0) % 11;

	return mod < 2 ? 0 : 11 - mod;
}

function verifierDigits(value) {
	let digits = value.slice(0, 12);
	digits += verifierDigit(digits);
	digits += verifierDigit(digits);
	return digits.slice(12, 14);
}

function isValidCNPJ(value) {
	// validate type
	if (!value || typeof value !== 'string') return false;

	if (value.length !== 14) return false;

	// validate blacklisted values
	if (BLACKLIST.includes(value)) return false;

	// validate verifier digits
	const verifier = verifierDigits(value);
	return verifier === value.slice(12, 14);
}

module.exports = { isValidCNPJ };
