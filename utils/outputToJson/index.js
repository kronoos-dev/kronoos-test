const fs = require('fs');

const outputToJson = (processedData) => {
  const jsonData = JSON.stringify(processedData, null, 2);

  fs.writeFileSync('outputData.json', jsonData, 'utf-8');
  
  console.log('Data has been converted and saved to output.json');
}

module.exports = {
  outputToJson
}
