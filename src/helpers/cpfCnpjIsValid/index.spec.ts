import { expect, test } from "vitest";
import { cpfCnpjIsValid } from ".";

const testCases = [
  { input: '12345678909', expected: false },        // CPF inválido
  { input: '11122233344', expected: false },       // CPF inválido
  { input: '123.456.789-09', expected: false },    // CPF inválido (formatado)
  { input: '112233445566', expected: false },       // CPF inválido
  { input: '11.122.333/0001-99', expected: false }, // CNPJ inválido
  { input: '11.222.333/4444-55', expected: false }, // CNPJ inválido
  { input: '12345678901234', expected: false },    // CPF inválido
  { input: '123.456.789-09X', expected: false },   // CPF inválido (com caracteres inválidos)
  { input: '98765432100', expected: true },         // CPF válido
];


testCases.forEach(({ input, expected }) => {
  test(`cpfCnpjIsValid(${input}) deve retornar ${expected}`, () => {
    const result = cpfCnpjIsValid(input);
    console.log(input, result, expected);

    expect(result).toBe(expected);
  });
});
