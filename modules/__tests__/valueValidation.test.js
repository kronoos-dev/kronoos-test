const { validateValues } = require("../valueValidation.js");

test.only("Validates values correctly", () => {
  const data = [
    { vlTotal: "1000.00", vlPresta: "200.00", qtPrestacoes: 5  },
    { vlTotal: "500.00", vlPresta: "100.00", qtPrestacoes: 5 },
    { vlTotal: "560.36", vlPresta: "112.07", qtPrestacoes: 5 },
  ];

  validateValues(data);

  expect(data[0].vlPresta).toBe(
    parseFloat(data[0].vlTotal / data[0].qtPrestacoes).toFixed(2)
  );
  expect(data[1].vlPresta).toBe(
    parseFloat(data[1].vlTotal / data[1].qtPrestacoes).toFixed(2)
  );
});
