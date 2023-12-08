import { test, expect } from 'vitest'
import { convertMoney } from '.';

const cleanString = (str: string) => str.replace(/[^\w\s]/gi, '').replace(/\s/g, '');

const testCases = [
  { input: '100', expected: 'R$ 100,00' },
  { input: '50.25', expected: 'R$ 50,25' },
  { input: '123456.789', expected: 'R$ 123.456,79' },
  { input: '0.75', expected: 'R$ 0,75' },
  { input: '1234', expected: 'R$ 1.234,00' },
  { input: '789.12', expected: 'R$ 789,12' },
  { input: '0', expected: 'R$ 0,00' },
  { input: '987654.32', expected: 'R$ 987.654,32' },
  { input: '0.12345', expected: 'R$ 0,12' },
];

testCases.forEach(({ input, expected }) => {
  test(`convertMoney(${input}) deve retornar ${expected}`, () => {
    const result = convertMoney(input);
    expect(cleanString(result)).toEqual(cleanString(expected));
  });
});