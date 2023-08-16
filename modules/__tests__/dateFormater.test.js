const { formatDates } = require("../dateFormater.js");

test("Formats dates correctly", () => {
  const data = [
    { dtContrato: "20210815", dtVctPre: "20211231" },
    { dtContrato: "20220101", dtVctPre: "20220315" },
  ];

  formatDates(data);

  expect(data[0].dtContrato instanceof Date).toBe(true);
  expect(data[0].dtVctPre instanceof Date).toBe(true);
  expect(data[1].dtContrato instanceof Date).toBe(true);
  expect(data[1].dtVctPre instanceof Date).toBe(true);
});
