import { YYYYMMDDToDate } from './date';

describe('getDate', () => {
	test('should correctly parse YYYYMMDD format', () => {
		const date = YYYYMMDDToDate('20221231');

		expect(date.getFullYear()).toBe(2022);
		expect(date.getMonth()).toBe(11); // Months are 0-indexed in JavaScript Date
		expect(date.getDate()).toBe(31);
	});

	test('should handle month and day less than 10', () => {
		const date = YYYYMMDDToDate('20220101');

		expect(date.getFullYear()).toBe(2022);
		expect(date.getMonth()).toBe(0);
		expect(date.getDate()).toBe(1);
	});
});
