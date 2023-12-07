const { calcCheck } = require("../index");

describe("calcCheck function", () => {
  test("returns VALIDO ", () => {
    const input = 5000;
    const expected = "VALIDO";
    expect(calcCheck(input, 5000)).toBe(expected);
  });

  test("returns INVALIDO", () => {
    const input = 5000;
    const expected = "INVALIDO";
    expect(calcCheck(input, 3000)).toBe(expected);
  });
});
