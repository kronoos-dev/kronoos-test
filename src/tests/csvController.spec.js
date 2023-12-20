// tests/csvController.spec.js
describe('csvController', () => {
    const csvController = require('../src/controllers/csvController');
  
    it('should process CSV file', async () => {
      const req = { file: { path: 'path/to/test.csv' } };
      const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
        json: (data) => ({ data }),
      };
  
      spyOn(csvService, 'readCSV').and.returnValue(/* your mock data */);
  
      await csvController.processCSV(req, res);
      
      expect(csvService.readCSV).toHaveBeenCalledWith(req.file.path);
      // Add more expectations based on your implementation
    });
  });
  