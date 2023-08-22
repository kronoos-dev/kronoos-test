import { formatMonetaryValues } from "../src/currencyConvertion";

describe("formatMonetaryValues", () => {
  it("should format monetary values correctly", () => {
    const dataArray = [
      { vlTotal: "1234.56", vlPresta: "789.12", vlMora: "56.78" },
      { vlTotal: "4567.89", vlPresta: "123.45", vlMora: "0.00" },
    ];

    const expectedFormattedData = [
      {
        vlTotal: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        }).format(parseFloat("1234.56")),
        vlPresta: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        }).format(parseFloat("789.12")),
        vlMora: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        }).format(parseFloat("56.78")),
      },
      {
        vlTotal: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        }).format(parseFloat("4567.89")),
        vlPresta: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        }).format(parseFloat("123.45")),
        vlMora: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        }).format(parseFloat("0.00")),
      },
    ];

    const formattedData = formatMonetaryValues(dataArray);
    expect(formattedData).toStrictEqual(expectedFormattedData);
  });
});
