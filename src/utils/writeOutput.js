const fs = require('fs')

const writeOutput = async (outputPath, output) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(outputPath, JSON.stringify(output, null, 2), 'utf8', err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

module.exports = writeOutput
