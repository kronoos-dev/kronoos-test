import { stringToDate } from "../src/utils/date/date"; 

describe('stringToDate', () => {
    test('should convert valid string to Date object', () => {
        const validDateString = '20211206';
        const expectedDate = new Date('2021-12-06');

        const result = stringToDate(validDateString);

        expect(result).toEqual(expectedDate);
    });

    test('should not handle different date formats', () => {
        const dateStringWithDashes = '2021-12-06';
        const dateStringWithSlashes = '2021/12/06';

        const resultDashes = stringToDate(dateStringWithDashes);
        const resultSlashes = stringToDate(dateStringWithSlashes);

        expect(resultDashes).toEqual(false);
        expect(resultSlashes).toEqual(false);
    });

    test('should return false for invalid date string', () => {
        const invalidDateString = 'invalid-date';

        const result = stringToDate(invalidDateString);

        expect(result).toBe(false);
    });

});