const { numSplitter } = require("../index");

describe("numSplitter function", () => {
  test("converts String into array of numbers", () => {
    const input = "20230118";
    const expected = [2, 0, 2, 3, 0, 1, 1, 8];
    expect(numSplitter(input)).toStrictEqual(expected);
  });
});
