const fs = require('fs');

class CsvRepository {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async readCsvData() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }

        const rows = data.split('\n');
        const headers = rows[0].split(',');
        const result = [];

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].split(',');
          const obj = {};

          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = row[j];
          }
          result.push(obj);
        }

        resolve(result);
      });
    });
  }
}

module.exports = CsvRepository;