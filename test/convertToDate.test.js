import { convertToDate } from "../src/convertToDate";

describe("Date Conversion Tests", () => {
  test('Convert "YYYYMMDD" format to Date', () => {
    const dateString = "20230822";
    const expectedDate = new Date(Date.UTC(2023, 7, 22));

    const convertedDate = convertToDate(dateString);
    expect(convertedDate).toEqual(expectedDate);
  });

  test("Convert date fields in array", () => {
    const inconsistentInstallments = [
      { dtContrato: "20230822", dtVctPre: "20230915" },
      { dtContrato: "20230710", dtVctPre: "20231020" },
    ];

    const expectedConvertedInstallments = [
      {
        dtContrato: new Date(Date.UTC(2023, 7, 22)),
        dtVctPre: new Date(Date.UTC(2023, 8, 15)),
      },
      {
        dtContrato: new Date(Date.UTC(2023, 6, 10)),
        dtVctPre: new Date(Date.UTC(2023, 9, 20)),
      },
    ];

    inconsistentInstallments.forEach((row, index) => {
      row.dtContrato = convertToDate(row.dtContrato);
      row.dtVctPre = convertToDate(row.dtVctPre);
      expect(row).toEqual(expectedConvertedInstallments[index]);
    });
  });
});
