import { validateCpfCnpj } from "../src/utils/validator/validateCpfCnpj";

describe('validateCpfCnpj', () => {
    test('should return valid CPF', () => {
        const validCPF = '026.937.250-46';
        const expectedValidCPF = '02693725046';

        const result = validateCpfCnpj(validCPF);

        expect(result).toBe(expectedValidCPF);
    });

    test('should return "CPF Inválido" for invalid CPF', () => {
        const invalidCPF = '123.456.789-01';

        const result = validateCpfCnpj(invalidCPF);

        expect(result).toBe('CPF Inválido');
    });

    test('should return valid CNPJ', () => {
        const validCNPJ = '27.777.330/0001-44';
        const expectedValidCNPJ = '27777330000144';

        const result = validateCpfCnpj(validCNPJ);

        expect(result).toBe(expectedValidCNPJ);
    });

    test('should return "CNPJ Inválido" for invalid CNPJ', () => {
        const invalidCNPJ = '12.345.678/0001-01';

        const result = validateCpfCnpj(invalidCNPJ);

        expect(result).toBe('CNPJ Inválido');
    });

    test('should return "Documento (123)" for invalid length', () => {
        const invalidLength = '123';

        const result = validateCpfCnpj(invalidLength);

        expect(result).toBe('Documento (123) inválido');
    });
});
