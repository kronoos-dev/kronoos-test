import { isValidCNPJ } from './cnpj';

describe('CNPJ Validator', () => {
	test('invalid values', () => {
		expect(isValidCNPJ(null)).toBeFalsy();
		expect(isValidCNPJ(undefined)).toBeFalsy();
		expect(isValidCNPJ('')).toBeFalsy();
		expect(isValidCNPJ('123')).toBeFalsy();
		expect(isValidCNPJ('123.123.123.123')).toBeFalsy();
	});

	test('blacklisted', () => {
		expect(isValidCNPJ('1'.repeat(14))).toBeFalsy();
		expect(isValidCNPJ('2'.repeat(14))).toBeFalsy();
		expect(isValidCNPJ('9'.repeat(14))).toBeFalsy();
		expect(isValidCNPJ('9'.repeat(14))).toBeFalsy();
		expect(isValidCNPJ('00.000.000/0000-00')).toBeFalsy();
	});

	test('invalid', () => {
		expect(isValidCNPJ('48743685000129')).toBeFalsy();
		expect(isValidCNPJ('22456861000100')).toBeFalsy();
		expect(isValidCNPJ('28486581000112')).toBeFalsy();
		expect(isValidCNPJ('32801142000143')).toBeFalsy();
		expect(isValidCNPJ('02864601000180')).toBeFalsy();
		expect(isValidCNPJ('07751675000199')).toBeFalsy();
	});

	test('valid', () => {
		expect(isValidCNPJ('48743685000192')).toBeTruthy();
		expect(isValidCNPJ('22456861000111')).toBeTruthy();
		expect(isValidCNPJ('28486581000132')).toBeTruthy();
		expect(isValidCNPJ('32801142000144')).toBeTruthy();
		expect(isValidCNPJ('02864601000178')).toBeTruthy();
		expect(isValidCNPJ('07751675000111')).toBeTruthy();
	});

	test('invalid, with pontuation', () => {
		expect(isValidCNPJ('48.743.685/0001-29')).toBeFalsy();
		expect(isValidCNPJ('22.456.861/0001-00')).toBeFalsy();
		expect(isValidCNPJ('28.486.581/0001-12')).toBeFalsy();
		expect(isValidCNPJ('32.801.142/0001-43')).toBeFalsy();
		expect(isValidCNPJ('02.864.601/0001-80')).toBeFalsy();
		expect(isValidCNPJ('07.751.675/0001-99')).toBeFalsy();
	});
});
