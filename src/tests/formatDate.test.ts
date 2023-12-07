const { formatDate } = require("../index");

describe("formatDate function", () => {
  test("converts YYYYMMDD to pt-br format", () => {
    const inputDate = "20230118";
    const expectedDate = "18/01/2023";
    expect(formatDate(inputDate)).toBe(expectedDate);
  });
});
