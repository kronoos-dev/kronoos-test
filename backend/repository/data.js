const CsvRepository = require('./csvRepository');

// Crie uma instância do CsvRepository com o caminho para o arquivo CSV
const csvRepo = new CsvRepository('../datateste.csv');

// Chame o método para ler os dados do CSV
csvRepo.readCsvData()
  .then((data) => {
    // Os dados do CSV estão disponíveis aqui
    console.log(data);
  })
  .catch((error) => {
    console.error('Erro ao ler o arquivo CSV:', error);
  });
