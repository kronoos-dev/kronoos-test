import CsvExtractionService from '../services/csv-extraction.service.js';

class CsvExtractionController {
  async receive_file(req, res) {
    const csv_service = new CsvExtractionService();

    return res.json({
      data: [...(await csv_service.execute())].slice(0, 10),
    });
  }
}

export default new CsvExtractionController();
