import { convertToDate } from "../date";

describe("convertToDate", () => {
  it("should convert a valid date string to a Date object", () => {
    const dateString = "20230823";
    const date = convertToDate(dateString);
    expect(date).toBeInstanceOf(Date);
    expect(date.toISOString()).toBe("2023-08-23T00:00:00.000Z");
  });
});