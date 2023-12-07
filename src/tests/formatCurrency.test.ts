const { formatCurrency } = require("../index");

describe("formatCurrency function", () => {
  test("converts float to brazilian real format", () => {
    const input = "20021321.1";
    const expected = "R$ 20.021.321,10";
    expect(formatCurrency(input).replace(/\u00A0/g, " ")).toBe(
      expected.replace(/\u00A0/g, " ")
    );
  });
});
