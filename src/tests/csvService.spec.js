// tests/csvService.spec.js
describe('csvService', () => {
    const csvService = require('../src/services/csvService');
  
    it('should read CSV file', async () => {
      const filePath = 'path/to/test.csv';
      const data = await csvService.readCSV(filePath);
      expect(data).toEqual(/* your expected data */);
    });
  });
  