import { installmentCalculator } from "../../services/installmentCalculator";

describe("installmentCalculator", () => {
  it("should calculate the installment value correctly", () => {
    const amount = 1000;
    const installments = 12;
    const expectedInstallmentValue = 83.33;

    const result = installmentCalculator(amount, installments);

    expect(result).toBe(expectedInstallmentValue);
  });

  it("should return 0 if the initial value is 0", () => {
    const amount = 0;
    const installments = 6;
    const expectedInstallmentValue = 0;

    const result = installmentCalculator(amount, installments);

    expect(result).toBe(expectedInstallmentValue);
  });

  it("should throw an error if the installments quantity is equal or less than 0", () => {
    const amount = 1000;
    const installments = 0;

    expect(() => installmentCalculator(amount, installments)).toThrow();

    const installments2 = -1;

    expect(() => installmentCalculator(amount, installments2)).toThrow();
  });

  it("should throw an error if the installments quantity is not an integer", () => {
    const amount = 1000;
    const installments = 1.5;

    expect(() => installmentCalculator(amount, installments)).toThrow();
  });

  it("should be aware of floating point precision", () => {
    const amount = 0.1;
    const installments = 3;
    const expectedInstallmentValue = 0.03;

    const result = installmentCalculator(amount, installments);

    expect(result).toBe(expectedInstallmentValue);
  });

  // it("should return a installment value that, if multiplied by the installments quantity, is equal to the amount", () => {
  //   const amount = 123.45;
  //   const installments = 2;

  //   const result = installmentCalculator(amount, installments);
  //   console.log("result", result);

  //   expect(result * installments).toBe(amount);
  // });
});
