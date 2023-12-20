import validateCPF from "../../../src/infrastructure/validation/validate-cpf";

describe("validateCPF", () => {
  it("should return true for a valid CPF", () => {
    const sampleCPF = "123.456.789-09";
    const result = validateCPF(sampleCPF);
    expect(result).toBe(true);
  });

  it("should return false for an invalid CPF", () => {
    const sampleCPF = "111.222.333-44";
    const result = validateCPF(sampleCPF);
    expect(result).toBe(false);
  });

  it("should handle CPF with different formats and return true", () => {
    const validCPFs = ["123.456.789-09", "12345678909", "123456.789-09"];
    validCPFs.forEach((cpf) => {
      const result = validateCPF(cpf);
      expect(result).toBe(true);
    });
  });

  it("should return false for a value with more than 11 chars", () => {
    const sampleCPF = "123.456.789-091";
    const result = validateCPF(sampleCPF);
    expect(result).toBe(false);
  });

  it("should return false for a value with less than 11 chars", () => {
    const sampleCPF = "123.456.789-0";
    const result = validateCPF(sampleCPF);
    expect(result).toBe(false);
  });

  it("should return false for a CPF with repeated digits", () => {
    const invalidCPF = "111.111.111-11";
    const result = validateCPF(invalidCPF);
    expect(result).toBe(false);
  });

  it("should return false for a CPF with an incorrect first digit", () => {
    const invalidCPF = "123.456.789-08";
    const result = validateCPF(invalidCPF);
    expect(result).toBe(false);
  });
});
