const {
  checkPrestations,
  checkTypeNrCpfOrCnpj,
} = require("./financialProcessingService");
const {
  validateCPF,
  validateCNPJ,
  identifyDocumentType,
} = require("../utils/cpfCnpjValidator");

describe("checkPrestations", () => {
  it("should return true for valid prestations", () => {
    expect(checkPrestations(100, 5, 20)).toBe(true); // 100 / 5 = 20
    expect(checkPrestations(150, 3, 50)).toBe(true); // 150 / 3 = 50
    expect(checkPrestations(99.99, 10, 9.999)).toBe(true); // 99.99 / 10 = 9.999
  });

  it("should return false if any value is null or undefined", () => {
    expect(checkPrestations(null, 5, 20)).toBe(false);
    expect(checkPrestations(100, null, 20)).toBe(false);
    expect(checkPrestations(100, 5, null)).toBe(false);
    expect(checkPrestations(undefined, 5, 20)).toBe(false);
    expect(checkPrestations(100, undefined, 20)).toBe(false);
    expect(checkPrestations(100, 5, undefined)).toBe(false);
  });

  it("should return false if prestations do not match", () => {
    expect(checkPrestations(100, 5, 19)).toBe(false); // 100 / 5 = 20, not 19
    expect(checkPrestations(150, 3, 49)).toBe(false); // 150 / 3 = 50, not 49
  });
});

jest.mock("../utils/cpfCnpjValidator", () => ({
  validateCPF: jest.fn(),
  validateCNPJ: jest.fn(),
  identifyDocumentType: jest.fn(),
}));

describe("checkTypeNrCpfOrCnpj", () => {
  it("should return true for a valid CPF", () => {
    identifyDocumentType.mockReturnValue("CPF");
    validateCPF.mockReturnValue(true);
    expect(checkTypeNrCpfOrCnpj("12345678901")).toBe(true);
  });

  it("should return true for a valid CNPJ", () => {
    identifyDocumentType.mockReturnValue("CNPJ");
    validateCNPJ.mockReturnValue(true);
    expect(checkTypeNrCpfOrCnpj("12345678901234")).toBe(true);
  });

  it("should return false for an invalid or unknown document", () => {
    identifyDocumentType.mockReturnValue("");
    expect(checkTypeNrCpfOrCnpj("123456")).toBe(false);
  });
});
