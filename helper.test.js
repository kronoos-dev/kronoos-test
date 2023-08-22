const { csvCurrencyFormat, csvDateFormat, isValidTotal, isValidCnpj, isValidCpf, csvParse } = require("./helper");

describe('Helper', () => {
    describe('csvCurrencyFormat', () => {
        it('returns a formated number to BRL', () => {
            expect(csvCurrencyFormat(10).replace(/[^0-9]/g, '')).toBe('1000');
        });
        it('returns zero for any non number', () => {
            expect(csvCurrencyFormat(null)).toBe(0);
            expect(csvCurrencyFormat('')).toBe(0);
        });
    });
    describe('csvDateFormat', () => {
        it('returns a new Date from a date format YYYYMMDD', () => {
            expect(csvDateFormat('20121212').toISOString()).toBe((new Date('2012-12-12')).toISOString());
        });
        it('returns null when the string did not have eigh characters', () => {
            expect(csvDateFormat('2012121')).toBe(null);
        });
    });
    describe('isValidTotal', () => {
        it('returns true when the total is equal', () => {
            expect(isValidTotal('2', '2', '1')).toBe(true);
        });
        it('returns false when the total is not equal', () => {
            expect(isValidTotal('2', '2', '2')).toBe(false);
        });
    });
    describe('isValidCpf or isValidCnpj', () => {
        it('returns true when is a valid CPF', () => {
            expect(isValidCpf('822.266.130-21')).toBe(true);
        });
        it('returns false when is a valid CNPJ', () => {
            expect(isValidCnpj('81.237.919/0001-03')).toBe(true);
        });
    });
    describe('csvParse', () => {
        it('returns file not found', async () => {
            try {
                await csvParse('./data.cs');
            } catch ( error ) {
                expect(error).toBe('File not found');
            }
        });
    });
});
