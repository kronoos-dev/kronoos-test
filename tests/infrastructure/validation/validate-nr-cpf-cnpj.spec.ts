import validateNrCpfCnpj from "../../../src/infrastructure/validation/validate-nr-cpf-cnpj";

describe("validateNrCpfCnpj function with points", () => {
  test("Should return is a valid CPF", () => {
    expect(validateNrCpfCnpj("866.833.010-18")).toBe(true);
  });

  test("should return is a invalid CPF", () => {
    expect(validateNrCpfCnpj("866.833.010-17")).toBe(false);
  });
  test("should return is a valid CNPJ", () => {
    expect(validateNrCpfCnpj("62.250.135/0001-62")).toBe(true);
  });

  test("should return is a invalid CNPJ", () => {
    expect(validateNrCpfCnpj("62.250.135/1111-62")).toBe(false);
  });
});

describe("validateNrCpfCnpj function without points", () => {
    test("Should return is a valid CPF", () => {
        expect(validateNrCpfCnpj("86683301018")).toBe(true);
      });
    
      test("should return is a invalid CPF", () => {
        expect(validateNrCpfCnpj("86683301017")).toBe(false);
      });
      test("should return is a valid CNPJ", () => {
        expect(validateNrCpfCnpj("62250135000162")).toBe(true);
      });
    
      test("should return is a invalid CNPJ", () => {
        expect(validateNrCpfCnpj("62250135111162")).toBe(false);
      });
});


describe("validateNrCpfCnpj function invalid values", () => {
    test("Should return is a invalid CPF", () => {
        expect(validateNrCpfCnpj("XABLAU")).toBe(false);
      });
    
      test("should return is a invalid CPF", () => {
        expect(validateNrCpfCnpj("866")).toBe(false);
      });
});
