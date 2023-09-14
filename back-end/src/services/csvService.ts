import csvParser from "csv-parser";
import { Readable } from "stream";

export const processCSV = (csvBuffer: Buffer) => {
  return new Promise<any[]>((resolve, reject) => {
    try {
      if (!csvBuffer) {
        throw new Error("O buffer do CSV está vazio.");
      }

      const csvStream = new Readable();
      csvStream.push(csvBuffer);
      csvStream.push(null);

      const csvData: any[] = [];

      csvStream
        .pipe(csvParser())
        .on("data", (row: any) => {
          csvData.push(row);
        })
        .on("end", () => {
          resolve(csvData);
        })
        .on("error", (error: any) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
