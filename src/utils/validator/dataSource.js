const fs = require('fs');

const verifyIfFileExists = (pathToFile) => {
  if (!fs.existsSync(pathToFile)) {
    throw new Error(`O arquivo de data source não existe! Verifique se está no diretório especificado: ${pathToFile}`);
  }
}

module.exports = { verifyIfFileExists };
