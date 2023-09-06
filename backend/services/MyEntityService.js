const CsvRepository = require('../repository/csvRepository');

class MyEntityService {
  constructor(filePath) {
    this.csvRepo = new CsvRepository(filePath);
  }

  async getEntities(page = 1, limit = 100) {
    try {
      const allData = await this.csvRepo.readCsvData();
      // Calcule o índice de início e fim para a página desejada
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      // Recorte os resultados para a página atual
      const entities = allData.slice(startIndex, endIndex);

      return entities;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MyEntityService;
