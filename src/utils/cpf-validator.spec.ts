import { cpfValidator } from "./cpf-validator";

describe("CPF Validator", () => {
  it("should return false if CPF is empty", () => {
    expect(cpfValidator()).toBe(false);
  });

  it("should return false if CPF is equal to 00000000000", () => {
    expect(cpfValidator("00000000000")).toBe(false);
  });

  it("should return false if CPF is the sames digits", () => {
    expect(cpfValidator("11111111111")).toBe(false);
  });

  it("should return false with invalid length", () => {
    expect(cpfValidator("1234")).toBe(false);
  });

  it("should return false if CPF is invalid", () => {
    expect(cpfValidator("12345678901")).toBe(false);
  });

  it("should return true if CPF is valid", () => {
    expect(cpfValidator("86446422784")).toBe(true);
  });
});
