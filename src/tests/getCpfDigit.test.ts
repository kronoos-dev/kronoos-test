const { getCpfDigit } = require("../index");

describe("getCpfDigit function", () => {
  test("returns a digit 0 ", () => {
    const input = [4, 1, 6, 4, 3, 1, 8, 8, 8, 0, 1];
    const expected = 0;
    expect(getCpfDigit(input, 10, 9)).toBe(expected);
  });

  test("returns another digit that isn't 0", () => {
    const input = [4, 1, 6, 4, 3, 1, 8, 8, 8, 0, 1];
    const expected = 1;
    expect(getCpfDigit(input, 11, 10)).toBe(expected);
  });
});
