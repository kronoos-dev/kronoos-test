import CsvExtractionService from '../services/csv-extraction.service.js';

class CsvExtractionController {
  async receive_file(req, res) {
    const offset = req.query.offset || 1;
    const limit = req.query.limit || 5;

    const startIndex = (Number(offset) - 1) * Number(limit) || 0;

    const endIndex = Number(offset) * Number(limit) || 5;

    const csv_service = new CsvExtractionService();

    const result = await csv_service.execute();

    return res.json({
      totalPages: Math.ceil(result.length / Number(limit)),
      currentPage: parseInt(String(offset), 10),
      data: result.slice(startIndex, endIndex),
    });
  }
}

export default new CsvExtractionController();
