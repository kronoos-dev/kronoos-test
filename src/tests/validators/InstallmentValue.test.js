import InstallmentValue from "../../validators/InstallmentValue.validator.js";

describe("InstallmentValue", () => {
    it("should return true for a valid installment value", () => {
        const installmentValue = 100.0;
        const calculateInstallmentValue = 100.0;
        const installment = new InstallmentValue(
            installmentValue,
            calculateInstallmentValue
        );
        const isValid = installment.isValid();

        expect(isValid).toBe(true);
    });

    it("should return false for an invalid installment value", () => {
        const installmentValue = 100.0;
        const calculateInstallmentValue = 150.0;
        const installment = new InstallmentValue(
            installmentValue,
            calculateInstallmentValue
        );
        const isValid = installment.isValid();

        expect(isValid).toBe(false);
    });

    it("should return false for non-numeric values", () => {
        const installmentValue = "abc"; // Um valor não numérico
        const calculateInstallmentValue = 100.0;
        const installment = new InstallmentValue(
            installmentValue,
            calculateInstallmentValue
        );
        const isValid = installment.isValid();

        expect(isValid).toBe(false);
    });
});
