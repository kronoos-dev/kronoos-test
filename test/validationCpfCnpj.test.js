import { validateCpfCnpj } from "../src/validationCpfCnpj.js";

describe("validateAndFilterCurrencyData", () => {
  it("filters out rows with invalid CPF/CNPJ", () => {
    const testData = [
      { nrCpfCnpj: "123.456.789-09" },
      { nrCpfCnpj: "12.345.678/0001-90" },
      { nrCpfCnpj: "12.345.678/0001-00" },
      { nrCpfCnpj: "abc" },
    ];

    const validatedData = validateCpfCnpj(testData);

    expect(validatedData).toHaveLength(3);
    expect(validatedData).toEqual([
      {
        nrCpfCnpj: "123.456.789-09",
      },
      {
        nrCpfCnpj: "12.345.678/0001-90",
      },
      {
        nrCpfCnpj: "12.345.678/0001-00",
      },
    ]);
  });
});
