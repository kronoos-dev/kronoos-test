import { formatCurrency } from './currency';

describe('numberFormat', () => {
	test('should correctly format integer values', () => {
		expect(formatCurrency(123)).toBe('R$ 123,00');
	});

	test('should correctly format float values', () => {
		expect(formatCurrency(123.45)).toBe('R$ 123,45');
	});

	test('should correctly format zero', () => {
		expect(formatCurrency(0)).toBe('R$ 0,00');
	});

	test('should correctly format negative values', () => {
		expect(formatCurrency(-123.45)).toBe('-R$ 123,45');
	});

	test('should throw an error for non-numeric inputs', () => {
		expect(formatCurrency('abc')).toBe('');
		expect(formatCurrency(null)).toBe('');
		expect(formatCurrency(undefined)).toBe('');
	});
});
