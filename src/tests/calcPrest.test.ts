const { calcPrest } = require("../index");

describe("calcPrest function", () => {
  test("returns value of the remaining installments ", () => {
    const input = 5000;
    const expected = 2500;
    expect(calcPrest(input, 2)).toBe(expected);
  });
});
