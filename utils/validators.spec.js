const validators  = require('./validators');

describe('Validator tests', () => {
	describe('hasValidPrestacoes', () => {
		it.each([
			[{ vlTotal: '10', qtPrestacoes: '2', vlPresta: '5' }, true],
			[{ vlTotal: '83720.19', qtPrestacoes: '5', vlPresta: '17524.03' }, false],
		])('should check if has valid value for vlPresta hasValidPrestacoes(%s) = %o', (data, expectedResult) => {
			const result = validators.hasValidPrestacoes(data);
			expect(result).toEqual(expectedResult);
		});
	});

	describe('isValidCPF', () => {
		it.each([
			['52998224725', true],
			['529', false],
			['75710245011', true],
			['56997587046', true],
			['17123582004', true],
			['17123582014', false],
			['00000000000', false],
			['11111111111', false],
		])('should check if is valid CPF isValidCPF(%o) = %o', (data, expectedResult) => {
			const result = validators.isValidCPF(data);
			expect(result).toEqual(expectedResult);
		});
	});

	describe('isValidCNPJ', () => {
		it.each([
			['50881840000189', true],
			['11111111111111', false],
			['00000000000000', false],
			['5088', false],
			['60379888000147', true],
			['953050644799', false],
		])('should check if is valid CNPJ isValidCNPJ(%o) = %o', (data, expectedResult) => {
			const result = validators.isValidCNPJ(data);
			expect(result).toEqual(expectedResult);
		});
	});
});
