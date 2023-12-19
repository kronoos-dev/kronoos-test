const converter = require('./converters');

describe('Converter tests', () => {
	describe('convertToBRL', () => {
		it.each([
			['123456', 'R$123.456,00'],
			['0', 'R$0,00'],
			['1.01', 'R$1,01'],
			['83720.19', 'R$83.720,19'],
			['38418.9', 'R$38.418,90'],
			['5690', 'R$5.690,00'],
			['38418.909', 'R$38.418,91'],
		])('should convert correctly to BRL convertToBRL(%o) = %o', (data, expectedResult) => {
			const result = converter.convertToBRL(data);
			expect(result).toEqual(expectedResult);
		});
	});

	describe('convertToDate', () => {
		it.each([
			['20220406', new Date(2022, 3, 6)],
			['20230430', new Date(2023, 3, 30)],
			['20241114', new Date(2024, 10, 14)],
		])('should convert correctly to BRL convertToDate(%o) = %o', (data, expectedResult) => {
			const result = converter.convertToDate(data);
			expect(result).toEqual(expectedResult);
		});
	});
});
