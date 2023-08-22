import fs from "fs";
import csv from "csv-parser";

export class LoadCSV {
  static loadFile<T>(path: string): Promise<T[]> {
    return new Promise((resolve) => {
      const results: T[] = [];

      fs.createReadStream("data.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          resolve(results);
        });
    });
  }
}
