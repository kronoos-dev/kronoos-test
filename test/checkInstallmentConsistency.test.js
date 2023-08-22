import { checkInstallmentConsistency } from "../src/checkInstallmentConsistency.js";

describe("checkInstallmentConsistency", () => {
  it("returns an array of consistent data", () => {
    const dataArray = [
      { vlTotal: "100.00", vlPresta: "25.00", qtPrestacoes: "4" },
      { vlTotal: "150.00", vlPresta: "37.50", qtPrestacoes: "4" },
    ];

    const result = checkInstallmentConsistency(dataArray);

    expect(result).toEqual(dataArray);
  });

  it("filters out inconsistent data", () => {
    const dataArray = [
      { vlTotal: "100.00", vlPresta: "30.00", qtPrestacoes: "4" },
      { vlTotal: "150.00", vlPresta: "37.50", qtPrestacoes: "4" },
    ];

    const result = checkInstallmentConsistency(dataArray);

    expect(result).toEqual([
      { vlTotal: "150.00", vlPresta: "37.50", qtPrestacoes: "4" },
    ]);
  });
});
