import { parseDateString } from "../../utils/parseDateString";

describe("parseDateString", () => {
  it("should parse a valid date string", () => {
    const dateString = "20220101";
    const expectedDate = new Date(2022, 0, 1);
    const parsedDate = parseDateString(dateString);
    expect(parsedDate).toEqual(expectedDate);
  });

  it("should throw an error for an invalid date string", () => {
    const dateString = "20221301";
    expect(() => parseDateString(dateString)).toThrow();
  });

  it("should throw an error for an empty date string", () => {
    const dateString = "";
    expect(() => parseDateString(dateString)).toThrow();
  });

  it("should throw an error for a date string with invalid length", () => {
    const dateString = "202201010";
    expect(() => parseDateString(dateString)).toThrow();
  });

  it("should throw an error for a date string with some non-numeric caracter", () => {
    const dateString = "2022a101";
    expect(() => parseDateString(dateString)).toThrow();
  });
});
