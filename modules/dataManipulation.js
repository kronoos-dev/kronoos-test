const fs = require("fs");
const csv = require("csv-parser");

function processData(callback) {
  const data = [];

  fs.createReadStream("data.csv")
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      callback(data);
    });
}

module.exports = { processData };
