const {
  validateCPF,
  validateCNPJ,
  identifyDocumentType,
} = require('./cpfCnpjValidator');

// Inicializar o Jest
const { describe, test, expect } = require("@jest/globals");

describe("validateCPF", () => {
  test("should return true for a valid CPF", () => {
    expect(validateCPF("123.456.789-09")).toBe(true);
  });

  test("should return false for an invalid CPF", () => {
    expect(validateCPF("123.456.789-00")).toBe(false);
  });
});

describe("validateCNPJ", () => {

  test("should return false for an invalid CNPJ", () => {
    expect(validateCNPJ("12.345.678/0001-62")).toBe(false);
  });
});

describe("identifyDocumentType", () => {
  test("should identify CPF", () => {
    expect(identifyDocumentType("123.456.789-09")).toBe("CPF");
  });

  test("should identify CNPJ", () => {
    expect(identifyDocumentType("12.345.678/0001-61")).toBe("CNPJ");
  });

  test("should return an empty string for an unrecognized format", () => {
    expect(identifyDocumentType("123")).toBe("");
  });
});
