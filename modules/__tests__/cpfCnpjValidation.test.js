const { validateCPForCNPJ } = require("../cpfCnpjValidation");

test("Validates CPF and CNPJ correctly", () => {
  expect(validateCPForCNPJ("57064086026")).toBe(true); // Valid CPF
  expect(validateCPForCNPJ("12345678900")).toBe(false); // Invalid CPF
  expect(validateCPForCNPJ("23463615000150")).toBe(true); // Valid CNPJ
  expect(validateCPForCNPJ("11222333000180")).toBe(false); // Invalid CNPJ
});
