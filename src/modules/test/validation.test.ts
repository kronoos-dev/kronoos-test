import { validateCpfCnpj } from "../validation";

describe("Validation Utility Functions", () => {
  describe("validateCpfCnpj", () => {
    it("should return true for a valid CPF", () => {
      const validCPF = "093.382.350-92";
      const result = validateCpfCnpj(validCPF);
      expect(result).toBe(true);
    });

    it("should return true for a valid CNPJ", () => {
      const validCNPJ = "75.725.433/0001-03";
      const result = validateCpfCnpj(validCNPJ);
      expect(result).toBe(true);
    });

    it("should return false for an invalid value", () => {
      const invalidValue = "12345";
      const result = validateCpfCnpj(invalidValue);
      expect(result).toBe(false);
    });
  });
});
