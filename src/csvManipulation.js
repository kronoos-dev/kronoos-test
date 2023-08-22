import fs from "fs";
import csvParser from "csv-parser";

export function processCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const dataArray = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        dataArray.push(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed.");
        resolve(dataArray);
      })
      .on("error", (error) => {
        console.error("Error processing CSV file:", error);
        reject(error);
      });
  });
}
