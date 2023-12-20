// src/domain/services/csvService.js
const fs = require('fs');
const csv = require('csv-parser');

async function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', (error) => reject(error));
  });
};

// Function to convert CSV to JSON
const convertCsvToJson = async (csvFilePath) => {
  const results = [];

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data)
        console.log(results);
      })
      .on('end', () => {
        resolve(JSON.stringify(results));
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

module.exports = { readCSV,
  convertCsvToJson };