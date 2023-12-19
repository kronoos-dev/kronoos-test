import { isValidCPF } from './cpf';

describe('CPF Validator', () => {
	test('invalid values', () => {
		expect(isValidCPF(null)).toBeFalsy();
		expect(isValidCPF(undefined)).toBeFalsy();
		expect(isValidCPF('')).toBeFalsy();
		expect(isValidCPF('123')).toBeFalsy();
		expect(isValidCPF('123.123.123.123')).toBeFalsy();
	});

	test('blacklisted', () => {
		expect(isValidCPF('1'.repeat(11))).toBeFalsy();
		expect(isValidCPF('2'.repeat(11))).toBeFalsy();
		expect(isValidCPF('9'.repeat(11))).toBeFalsy();
		expect(isValidCPF('9'.repeat(11))).toBeFalsy();
		expect(isValidCPF('000.000.000-00')).toBeFalsy();
	});

	test('invalid', () => {
		expect(isValidCPF('78996780291')).toBeFalsy();
		expect(isValidCPF('06588307200')).toBeFalsy();
		expect(isValidCPF('00938204612')).toBeFalsy();
		expect(isValidCPF('12717173299')).toBeFalsy();
		expect(isValidCPF('05276392678')).toBeFalsy();
	});

	test('valid', () => {
		expect(isValidCPF('78996780219')).toBeTruthy();
		expect(isValidCPF('06588307241')).toBeTruthy();
		expect(isValidCPF('00938204610')).toBeTruthy();
		expect(isValidCPF('12717173285')).toBeTruthy();
		expect(isValidCPF('05276392650')).toBeTruthy();
	});

	test('invalid, with pontuation', () => {
		expect(isValidCPF('789.967.802-91')).toBeFalsy();
		expect(isValidCPF('065.883.072-00')).toBeFalsy();
		expect(isValidCPF('009.382.046-12')).toBeFalsy();
		expect(isValidCPF('127.171.732-99')).toBeFalsy();
		expect(isValidCPF('052.763.926-78')).toBeFalsy();
	});
});
