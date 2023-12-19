import { formatCurrency } from "../../utils/formatCurrency";

describe("formatCurrency", () => {
  const values = [
    "0.0001",
    "0.01",
    "0.1",
    "1",
    "10",
    "100",
    "1000",
    "10000",
    "100000",
    "1000000",
    "0.123456789",
    "0.987654321",
    "123456789.123456789",
    "987654321.987654321",
  ];

  test.each(values)(
    "should return value in Brazilian currency format",
    (value) => {
      const formattedValue = formatCurrency(value);
      expect(formattedValue).toMatch(/^R\$\s\d{1,3}(\.\d{3})*,\d{2}$/);
    },
  );

  test("should validate if a string can`t be formatted", () => {
    const value = "invalid value";
    expect(() => formatCurrency(value)).toThrow();
  });
});
