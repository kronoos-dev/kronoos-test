const fs = require('fs');
const csv = require('csv-parser');

const readCSVFile = (filePath, callback) => {
  const data = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      callback(data);
    });
};

module.exports = { readCSVFile}