const { getCnpjDigit } = require("../index");

describe("getCnpjDigit function", () => {
  test("returns a digit 0", () => {
    const input = [6, 7, 3, 7, 5, 8, 9, 9, 0, 0, 0, 1, 0, 6];
    const expected = 0;
    expect(getCnpjDigit(input, 12)).toBe(expected);
  });

  test("returns a digit that isn't 0", () => {
    const input = [6, 7, 3, 7, 5, 8, 9, 9, 0, 0, 0, 1, 0, 6];
    const expected = 6;
    expect(getCnpjDigit(input, 13)).toBe(expected);
  });
});
