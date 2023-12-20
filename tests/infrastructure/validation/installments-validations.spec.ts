import intallmentsValidation from "../../../src/infrastructure/validation/installments-validation";

describe('intallmentsValidation', () => {
    it('should return true for valid input values', () => {
        const result = intallmentsValidation('1000', '5', '200');
        expect(result).toBe(true);
    });

    it('should return false if any input value is missing', () => {
        const result = intallmentsValidation('1000', '5', '');
        expect(result).toBe(false);
    });

    it('should return false for invalid total value', () => {
        const result = intallmentsValidation('abc', '5', '200');
        expect(result).toBe(false);
    });

    it('should return false for invalid installments value', () => {
        const result = intallmentsValidation('1000', 'abc', '200');
        expect(result).toBe(false);
    });

    it('should return false for invalid installment value', () => {
        const result = intallmentsValidation('1000', '5', 'xyz');
        expect(result).toBe(false);
    });

    it('should return false for incorrect installment calculation', () => {
        const result = intallmentsValidation('1000', '5', '201');
        expect(result).toBe(false);
    });

    it('should return false for all empty input values', () => {
        const result = intallmentsValidation('', '', '');
        expect(result).toBe(false);
    });

    it('should handle decimal values and return true', () => {
        const result = intallmentsValidation('1000.50', '5', '200.1');
        expect(result).toBe(true);
    });

    it('should should return false if number of installment is not a integer', () => {
        const result = intallmentsValidation('1000.50', '5.5', '182.75');
        expect(result).toBe(false);
    });
});
