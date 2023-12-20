import convertStringToDate from "../../../src/infrastructure/data/convert-string-to-date";

describe("convertStringToDate", ()=> {
    it("should method toDateString works correctly", ()=> {
        const dateConverted = convertStringToDate("19911103")
        expect(dateConverted.toDateString()).toBe(new Date(1991, 10, 3).toDateString())
    })
    test('should correctly parse YYYYMMDD format - My Brith Date =D', () => {
		const date = convertStringToDate('19911103');

		expect(date.getFullYear()).toBe(1991);
		expect(date.getMonth()).toBe(10);
		expect(date.getDate()).toBe(3);
	});
})