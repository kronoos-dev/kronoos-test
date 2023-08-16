const { expect } = require("chai");
const { currencyFormatter } = require("./currencyFormatter");

describe("Currency Formatter", () => {
  it("should format a number as Brazilian currency", () => {
    const number = 1234.56;
    const formattedNumber = currencyFormatter(number);

    expect(formattedNumber).to.equal("R$ 1.234,56");
  });
});
