import { convertToDate } from "./convertToDate";

describe("ConvertToDate", ()=> {
    it("should return the date in Brazilian format", ()=> {
        const dateConverted = convertToDate("20221227")
        // Assert
        expect(dateConverted.toDateString()).toBe(new Date(2022, 11, 27).toDateString())
    })
})