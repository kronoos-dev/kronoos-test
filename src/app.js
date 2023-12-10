import fs from "fs";
import { parse } from "csv-parse"
import { dataMapper } from "./data-mapper.js";

const csvData = [];

console.log("Reading and mapping CSV file...");
const reader = fs.createReadStream("./data.csv", { encoding: 'UTF-8' })
  .pipe(parse({ delimiter: ",", columns: true, ltrim: true }));

reader.on("data", (row) => {
    csvData.push(dataMapper(row));
  })
  .on("error", (error) => {
    console.log(error.message);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
    console.log(csvData);
  });



