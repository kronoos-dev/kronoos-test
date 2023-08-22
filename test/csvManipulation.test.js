import fs from "fs";
import csvParser from "csv-parser";
import { processCSVFile } from "../src/csvManipulation";
jest.mock("fs");
jest.mock("csv-parser");

describe("processCSVFile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully process a CSV file and return data array", async () => {
    const mockDataArray = [{ column1: "value1", column2: "value2" }];
    const mockReadStream = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn((event, callback) => {
        if (event === "data") {
          callback({ column1: "value1", column2: "value2" });
        } else if (event === "end") {
          callback();
        }
        return mockReadStream;
      }),
    };

    fs.createReadStream.mockReturnValue(mockReadStream);
    csvParser.mockReturnValue(mockReadStream);

    const filePath = "./data.csv";
    const result = await processCSVFile(filePath);

    expect(result).toEqual(mockDataArray);
    expect(fs.createReadStream).toHaveBeenCalledWith(filePath);
    expect(csvParser).toHaveBeenCalled();
    expect(mockReadStream.pipe).toHaveBeenCalledWith(csvParser());
    expect(mockReadStream.on).toHaveBeenCalledWith(
      "data",
      expect.any(Function)
    );
    expect(mockReadStream.on).toHaveBeenCalledWith("end", expect.any(Function));
  });

  it("should reject with an error if there is an error processing the CSV file", async () => {
    const mockError = new Error("CSV processing error");
    const mockReadStream = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn((event, callback) => {
        if (event === "error") {
          callback(mockError);
        }
        return mockReadStream;
      }),
    };

    fs.createReadStream.mockReturnValue(mockReadStream);
    csvParser.mockReturnValue(mockReadStream);

    const filePath = "../data.csv";
    await expect(processCSVFile(filePath)).rejects.toThrowError(mockError);

    expect(fs.createReadStream).toHaveBeenCalledWith(filePath);
    expect(csvParser).toHaveBeenCalled();
    expect(mockReadStream.pipe).toHaveBeenCalledWith(mockReadStream);
    expect(mockReadStream.on).toHaveBeenCalledWith(
      "error",
      expect.any(Function)
    );
  });
});
