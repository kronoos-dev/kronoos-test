import ToDate from "../../masks/ToDate.mask.js";

describe("ToDate", () => {
    it("should transform a valid date string to a JavaScript Date object", () => {
        const dateString = "20230904"; // A data válida '04/09/2023'
        const toDate = new ToDate(dateString);
        const transformedDate = toDate.transform();

        // Verifique se a data formatada corresponde à data esperada.
        expect(transformedDate).toBe("04/09/2023");
    });

    it("should return the original value for an invalid date string", () => {
        const invalidDateString = "invalid-date";
        const toDate = new ToDate(invalidDateString);
        const transformedValue = toDate.transform();

        // Verifique se o valor transformado é igual ao valor original para datas inválidas.
        expect(transformedValue).toBe(invalidDateString);
    });
});
