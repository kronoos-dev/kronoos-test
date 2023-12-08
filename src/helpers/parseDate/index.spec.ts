import { expect, test } from "vitest";
import { parseDate } from ".";

const testCases = [
  { input: '20211208', expected: new Date(2021, 11, 8) },
  { input: '20220315', expected: new Date(2022, 2, 15) },
  { input: '20200101', expected: new Date(2020, 0, 1) },
  { input: '20230520', expected: new Date(2023, 4, 20) },
  { input: '20240630', expected: new Date(2024, 5, 30) },
  { input: '20250712', expected: new Date(2025, 6, 12) },
  { input: '20270922', expected: new Date(2027, 8, 22) },
  { input: '20281010', expected: new Date(2028, 9, 10) },
  { input: '20291127', expected: new Date(2029, 10, 27) },
];

testCases.forEach(({ input, expected }) => {
  test(`parseDate(${input}) deve retornar ${expected}`, () => {
    const result = parseDate(input);
    expect(result).toEqual(expected);
  });
});
