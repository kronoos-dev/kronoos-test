import { validateCpfCnpj } from "../../services/cpfCnpjValidation";

describe("validateCpfCnpj", () => {
  const validCpfs = [
    "744.556.190-03",
    "289.141.760-70",
    "605.495.010-02",
    "74455619003",
    "28914176070",
    "60549501002",
  ];
  const validCnpjs = [
    "09.706.304/0001-43",
    "18.316.936/0001-91",
    "39.754.517/0001-01",
    "09706304000143",
    "18316936000191",
    "39754517000101",
  ];

  const invalidCpfs = ["123.456.789-01", "987.654.321-09", "000.000.000-00"];
  const invalidCnpjs = [
    "12.345.678/0001-91",
    "98.765.432/0001-09",
    "00.000.000/0000-00",
  ];

  test.each(validCpfs)("should return true for a valid CPF", (cpf) => {
    const result = validateCpfCnpj(cpf);
    expect(result).toBe(true);
  });

  test.each(validCnpjs)("should return true for a valid CNPJ", (cnpj) => {
    const result = validateCpfCnpj(cnpj);
    expect(result).toBe(true);
  });

  test.each(invalidCpfs)("should return false for an invalid CPF", (cpf) => {
    const result = validateCpfCnpj(cpf);
    expect(result).toBe(false);
  });

  test.each(invalidCnpjs)("should return false for an invalid CNPJ", (cnpj) => {
    const result = validateCpfCnpj(cnpj);
    expect(result).toBe(false);
  });
});
