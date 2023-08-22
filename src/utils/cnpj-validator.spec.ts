import { cnpjValidator } from "./cnpj-validator";

describe("CNPJ Validator", () => {
  it("should return false if CNPJ is empty", () => {
    expect(cnpjValidator()).toBe(false);
  });

  it("should return false if CNPJ is equal to 00000000000000", () => {
    expect(cnpjValidator("00000000000000")).toBe(false);
  });

  it("should return false if CNPJ is the same digits", () => {
    expect(cnpjValidator("11111111111111")).toBe(false);
  });

  it("should return false with invalid length", () => {
    expect(cnpjValidator("1234")).toBe(false);
  });

  it("should return false if CNPJ is invalid", () => {
    expect(cnpjValidator("12345678901234")).toBe(false);
  });

  it("should return true if CNPJ is valid", () => {
    expect(cnpjValidator("54301596000199")).toBe(true);
  });
});
