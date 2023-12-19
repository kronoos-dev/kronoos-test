import fs from "fs";
import csvParser from "csv-parser";

export function parseCSV(filePath: string): Promise<object[]> {
  return new Promise((resolve, reject) => {
    const results: object[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
