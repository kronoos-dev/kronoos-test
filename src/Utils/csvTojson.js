const csvtojson = require('csvtojson');

const csvToJson = async (csvFilePath) => {
  const jsonArray = await csvtojson().fromFile(csvFilePath);
  return jsonArray;
};

module.exports = { csvToJson };
