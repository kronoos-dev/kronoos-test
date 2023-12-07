import { checkInstallmentValid } from "../src/utils/number/checkInstallmentValid";

describe('checkInstallmentValid', () => {
    test('should return true for valid installment', () => {
        const total = 1000;
        const numberOfInstallments = 5;
        const installmentValueToCheck = 200;

        const result = checkInstallmentValid(total, numberOfInstallments, installmentValueToCheck);

        expect(result).toBe(true);
    });

    test('should return false for invalid installment', () => {
        const total = 1000;
        const numberOfInstallments = 5;
        const installmentValueToCheck = 201; // Not equal to total / numberOfInstallments

        const result = checkInstallmentValid(total, numberOfInstallments, installmentValueToCheck);

        expect(result).toBe(false);
    });

    test('should handle zero as installment value', () => {
        const total = 1000;
        const numberOfInstallments = 5;
        const installmentValueToCheck = 0;

        const result = checkInstallmentValid(total, numberOfInstallments, installmentValueToCheck);

        expect(result).toBe(false);
    });

    test('should handle zero as total', () => {
        const total = 0;
        const numberOfInstallments = 5;
        const installmentValueToCheck = 0;

        const result = checkInstallmentValid(total, numberOfInstallments, installmentValueToCheck);

        expect(result).toBe(false);
    });
});