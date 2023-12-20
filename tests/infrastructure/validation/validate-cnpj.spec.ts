import validateCNPJ from "../../../src/infrastructure/validation/validate-cnpj";

describe('validateCNPJ', () => {
  it('should return true for a valid CNPJ', () => {
      const validCNPJ = '62.250.135/0001-62';
      const result = validateCNPJ(validCNPJ);
      expect(result).toBe(true);
  });

  it('should return false for an invalid CNPJ with incorrect first digit', () => {
      const invalidCNPJ = '12.345.678/0001-91';
      const result = validateCNPJ(invalidCNPJ);
      expect(result).toBe(false);
  });

  it("should return false for a value with more than 14 chars", () => {
    const sampleCPF = "62250135/0001-6244";
    const result = validateCNPJ(sampleCPF);
    expect(result).toBe(false);
  });

  it("should return false for a value with less than 14 chars", () => {
    const sampleCPF = "62250135/-62";
    const result = validateCNPJ(sampleCPF);
    expect(result).toBe(false);
  });

  it('should return false for a CNPJ with repeated digits', () => {
      const invalidCNPJ = '11.111.111/1111-11';
      const result = validateCNPJ(invalidCNPJ);
      expect(result).toBe(false);
  });

  it('should handle CNPJ with different formats and return true', () => {
      const validCNPJs = ['62.250.135000162', '62250135000162', '62250135/0001-62'];
      validCNPJs.forEach((cnpj) => {
          const result = validateCNPJ(cnpj);
          expect(result).toBe(true);
      });
  });
});
