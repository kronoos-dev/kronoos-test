const fs = require('fs');
const { outputToJson } = require('.');

jest.mock('fs');

describe('outputToJson', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should write processed data to JSON file and log a success message', () => {
    const processedData = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    const jsonData = JSON.stringify(processedData, null, 2);

    fs.writeFileSync.mockImplementationOnce((path, data, encoding) => {
      expect(path).toBe('outputData.json');
      expect(data).toBe(jsonData);
      expect(encoding).toBe('utf-8');
    });

    console.log = jest.fn();

    outputToJson(processedData);

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Data has been converted and saved to output.json');
  });
});