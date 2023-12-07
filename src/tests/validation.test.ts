const { validation } = require("../index");

describe("validation function", () => {
  test("returns document status as VALIDO for a CPF", () => {
    const input = [4, 1, 6, 4, 3, 1, 8, 8, 8, 0, 1];
    const expected = "VALIDO";
    expect(validation(input)).toBe(expected);
  });

  test("returns document status as INVALIDO for a CPF due to it's digits not matching", () => {
    const input = [4, 1, 6, 4, 3, 1, 8, 8, 3, 3, 3];
    const expected = "INVALIDO";
    expect(validation(input)).toBe(expected);
  });

  test("returns document status as INVALIDO due to it's length not matching CPF nor CNPJ", () => {
    const input = [4, 1, 6, 4, 3, 1, 8, 8, 8, 0, 1, 1];
    const expected = "INVALIDO";
    expect(validation(input)).toBe(expected);
  });

  test("returns document status as VALIDO for a CNPJ", () => {
    const input = [6, 7, 3, 7, 5, 8, 9, 9, 0, 0, 0, 1, 0, 6];
    const expected = "VALIDO";
    expect(validation(input)).toBe(expected);
  });

  test("returns document status as INVALIDO for a CNPJ due to it's digits not matching", () => {
    const input = [6, 7, 3, 7, 5, 8, 9, 9, 0, 0, 0, 1, 6, 6];
    const expected = "INVALIDO";
    expect(validation(input)).toBe(expected);
  });
});
