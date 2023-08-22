import { CNPJValidatorAdapter } from "./CNPJValidatorAdapter";

describe("CNPJValidatorAdapter", () => {
  describe("isValid", () => {
    it("should return true if CNPJ is valid", () => {
      const values = [
        "28-831-254/0001-70",
        "28-831-254/0001.70",
        "28.831.2540001-70",
        "28+831+254/0001+70",
        "28.831.2540001-70",
        "28.831.254/0001-70",
        "46.237.010/0001-46",
        "70.486.026/0001-77",
        "24.509.260/0001-55",
        "93.690.624/0001-69",
        "40615246000192",
        "39776915000129",
        "08144825000191",
        "30812383000163",
        "03403812000176",
      ];

      for (const value of values) {
        const isValid = CNPJValidatorAdapter.isValid(value);
        expect(isValid).toBe(true);
      }
    });
    it("should return false if CNPJ is invalid", () => {
      const invalidValues = [
        "28-831-254/0001-71",
        "28-831-254/0001.71",
        "28.831.2540001-71",
        "28+831+254/0001+71",
        "28.831.2540001-71",
        "28.831.254/0001-71",
        "46.237.010/0001-47",
        "70.486.026/0001-78",
        "24.509.260/0001-56",
        "93.690.624/0001-60",
        "40615246000193",
        "39776915000120",
        "08144825000192",
        "30812383000164",
        "03403812000177",
      ];

      for (const value of invalidValues) {
        const isValid = CNPJValidatorAdapter.isValid(value);
        expect(isValid).toBe(false);
      }
    });
  });
});
