// service.spec.js

const { readCSV } = require('./../../data.csv');

describe('CSV Service', function () {
  it('should read CSV file correctly', async function () {
    const caminhoArquivo = 'path/to/your/csv/file.csv';
    const result = await readCSV(caminhoArquivo);

    // Add your assertion based on the expected result
    expect(result).toEqual(/* expected result */);
  });
});
