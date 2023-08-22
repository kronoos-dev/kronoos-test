import csvParser from "csv-parser";
import * as fs from "fs";

export default function importCsv(path: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const data: any[] = [];

    fs.createReadStream(path)
      .pipe(csvParser())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
