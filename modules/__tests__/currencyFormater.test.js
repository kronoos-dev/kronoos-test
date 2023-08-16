const { formatCurrency } = require("../currencyFormater");

test("Formats currency correctly", () => {
  const data = [
    {
      vlTotal: "1000.00",
      vlPresta: "200.00",
      vlMora: "50.00",
      vlMulta: "30.00",
      vlOutAcr: "10.00",
      vlIof: "5.00",
      vlDescon: "100.00",
      vlAtual: "1200.00",
    },
  ];

  formatCurrency(data);

  const expectedFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  expect(data[0].vlTotal).toBe(expectedFormat.format(1000.0));
  expect(data[0].vlPresta).toBe(expectedFormat.format(200.0));
  expect(data[0].vlMora).toBe(expectedFormat.format(50.0));
  expect(data[0].vlMulta).toBe(expectedFormat.format(30.0));
  expect(data[0].vlOutAcr).toBe(expectedFormat.format(10.0));
  expect(data[0].vlIof).toBe(expectedFormat.format(5.0));
  expect(data[0].vlDescon).toBe(expectedFormat.format(100.0));
  expect(data[0].vlAtual).toBe(expectedFormat.format(1200.0));
});
