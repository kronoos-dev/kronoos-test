import DueAmount from "../../calcs/DueAmount.calc.js";

describe("DueAmount", () => {
    it("should calculate with valid installments", () => {
        const dueAmount = new DueAmount(1000, 5);
        expect(dueAmount.calculate()).toBe(200);
    });

    it("should calculate with installments less than 1", () => {
        const dueAmount = new DueAmount(1000, -2);
        expect(dueAmount.calculate()).toBe(1000);
    });

    it("should calculate with installments is 0", () => {
        const dueAmount = new DueAmount(1000, 0);
        expect(dueAmount.calculate()).toBe(1000);
    });

    it("should calculate with installments is a float", () => {
        const dueAmount = new DueAmount(1000, 2.5);
        expect(dueAmount.calculate()).toBe(500);
    });
});
