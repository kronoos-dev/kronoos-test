import Cpf from "../../validators/Cpf.validator";

describe("Cpf", () => {
    it("should return true for a valid CPF", () => {
        const validCpf = "123.456.789-09";
        const cpf = new Cpf(validCpf);
        const isValid = cpf.isValid();

        expect(isValid).toBe(true);
    });

    it("should return false for an invalid CPF", () => {
        const invalidCpf = "111.111.111-11";
        const cpf = new Cpf(invalidCpf);
        const isValid = cpf.isValid();

        expect(isValid).toBe(false);
    });

    it("should handle CPF without formatting", () => {
        const validCpfWithoutFormatting = "12345678909";
        const cpf = new Cpf(validCpfWithoutFormatting);
        const isValid = cpf.isValid();

        expect(isValid).toBe(true);
    });

    it("should return false for a CPF with incorrect length", () => {
        const cpfWithIncorrectLength = "123.45";
        const cpf = new Cpf(cpfWithIncorrectLength);
        const isValid = cpf.isValid();

        expect(isValid).toBe(false);
    });
});
