import Cnpj from "../../validators/Cnpj.validator";

describe("Cnpj", () => {
    it("should return true for a valid CNPJ", () => {
        const validCnpj = "12.345.678/0001-09";
        const cnpj = new Cnpj(validCnpj);
        const isValid = cnpj.isValid();

        expect(isValid).toBe(true);
    });

    it("should return false for an invalid CNPJ", () => {
        const invalidCnpj = "11.111.111/1111-11";
        const cnpj = new Cnpj(invalidCnpj);
        const isValid = cnpj.isValid();

        expect(isValid).toBe(false);
    });

    it("should handle CNPJ without formatting", () => {
        const validCnpjWithoutFormatting = "12345678000109";
        const cnpj = new Cnpj(validCnpjWithoutFormatting);
        const isValid = cnpj.isValid();

        expect(isValid).toBe(true);
    });

    it("should return false for a CNPJ with incorrect length", () => {
        const cnpjWithIncorrectLength = "123.45";
        const cnpj = new Cnpj(cnpjWithIncorrectLength);
        const isValid = cnpj.isValid();

        expect(isValid).toBe(false);
    });
});
