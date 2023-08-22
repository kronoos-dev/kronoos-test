import { CPFValidatorAdapter } from "./CPFValidatorAdapter";

describe("CPFValidatorAdapter", () => {
  describe("isValid", () => {
    it("should return true if cpf is valid", () => {
      const values = [
        "111.444.777-35",
        "11144477735",
        "111.44477735",
        "111444.77735",
        "111444777-35",
        "111.444.77735",
        "111.444777-35",
        "111.444.777-35",
        "111-444-777_35",
        "59670418003",
        "27850552091",
        "07131362000",
        "635.533.270-73",
        "977.076.420-58",
        "151.418.040-54",
        "995.947.280-94",
      ];

      for (const value of values) {
        const isValid = CPFValidatorAdapter.isValid(value);
        expect(isValid).toBe(true);
      }
    });
    it("should return false if cpf is invalid", () => {
      const invalidValues = [
        "111.444.777-36",
        "11144477736",
        "111.44477736",
        "111444.77736",
        "111444777-36",
        "111.444.77736",
        "111.444777-36",
        "111.444.777-36",
        "987-654-321_23",
        "59670418004",
        "27850552092",
        "07131362001",
        "635.533.270-74",
        "977.076.420-59",
        "151.418.040-55",
        "995.947.280-95",
      ];

      for (const value of invalidValues) {
        const isValid = CPFValidatorAdapter.isValid(value);
        expect(isValid).toBe(false);
      }
    });
  });
});
