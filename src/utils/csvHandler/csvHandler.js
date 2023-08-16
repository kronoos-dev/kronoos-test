const fs = require("fs");
const csv = require("csv-parser");

const csvHandler = (file) => {
  const results = [];

  return fs
    .createReadStream(file)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => results);
};

module.exports = {
  csvHandler,
};
