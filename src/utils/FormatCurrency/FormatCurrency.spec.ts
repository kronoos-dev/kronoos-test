import { FormatCurrency } from "./FormatCurrency";

describe("FormatCurrency", () => {
  describe("ToBRL", () => {
    it("should format number to BRL currency", () => {
      const values = [
        {
          before: 0,
          after: "R$\u00A00,00",
        },
        {
          before: 1,
          after: "R$\u00A01,00",
        },
        {
          before: 1.5,
          after: "R$\u00A01,50",
        },
        {
          before: 1.55,
          after: "R$\u00A01,55",
        },
        {
          before: 1.555,
          after: "R$\u00A01,56",
        },
        {
          before: 1.554,
          after: "R$\u00A01,55",
        },
        {
          before: 1.5555,
          after: "R$\u00A01,56",
        },
        {
          before: "1.5555",
          after: "R$\u00A01,56",
        },
        {
          before: "123.",
          after: "R$\u00A0123,00",
        },
        {
          before: "123.1",
          after: "R$\u00A0123,10",
        },
        {
          before: "123.12",
          after: "R$\u00A0123,12",
        },
        {
          before: "123.123",
          after: "R$\u00A0123,12",
        },
        {
          before: "123.125",
          after: "R$\u00A0123,13",
        },
        {
          before: "123.124",
          after: "R$\u00A0123,12",
        },
        {
          before: "123.126",
          after: "R$\u00A0123,13",
        },
        {
          before: "123,126",
          after: "R$\u00A0123,13",
        },
        {
          before: "123,12",
          after: "R$\u00A0123,12",
        },
        {
          before: "123,1",
          after: "R$\u00A0123,10",
        },
        {
          before: "123,0",
          after: "R$\u00A0123,00",
        },
        {
          before: "123,00",
          after: "R$\u00A0123,00",
        },
        {
          before: "123,000",
          after: "R$\u00A0123,00",
        },
        {
          before: "123,",
          after: "R$\u00A0123,00",
        },
      ];

      const invalidValues = [
        "abc",
        null,
        "1,000.00",
        "1.000,00",
        "$10.00",
        "R$10.00",
        "R$\u00A010.00",
        "R$\u00A010,00",
      ];

      for (const value of values) {
        const formattedValue = FormatCurrency.ToBRL(value.before);
        expect(formattedValue).toBe(value.after);
      }

      for (const value of invalidValues) {
        expect(() => {
          const res = FormatCurrency.ToBRL(value as string);
          console.log("value", res);
        }).toThrowError();
      }
    });
  });
});
