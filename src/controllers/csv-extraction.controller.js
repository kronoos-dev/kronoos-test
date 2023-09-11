import CsvExtractionService from '../services/csv-extraction.service.js';
import currencyFormatter from '../utils/currency-formatter.js';
import toFixed from '../utils/fixed-number.js';
import dateFormatter from '../utils/date-formatter.js';

class CsvExtractionController {
  async execute(req, res) {
    const offset = req.query.offset || 1;
    const limit = req.query.limit || 5;

    const startIndex = (Number(offset) - 1) * Number(limit) || 0;

    const endIndex = Number(offset) * Number(limit) || 5;

    const csv_service = new CsvExtractionService();

    const result = await csv_service.execute().then(data => {
      const new_array_data = [];

      data.map(currentValue => {
        new_array_data.push({
          ...currentValue,
          vlTotal: currencyFormatter.format(
            toFixed(currentValue['vlTotal'], 2),
          ),
          vlPresta: currencyFormatter.format(
            toFixed(currentValue['vlPresta'], 2),
          ),
          vlMora: currencyFormatter.format(toFixed(currentValue['vlMora'], 2)),
          vlMulta: currencyFormatter.format(
            toFixed(currentValue['vlMulta'], 2),
          ),
          vlAtual: currencyFormatter.format(
            toFixed(currentValue['vlAtual'], 2),
          ),
          vlDescon: currencyFormatter.format(
            toFixed(currentValue['vlDescon'], 2),
          ),
          vlIof: currencyFormatter.format(toFixed(currentValue['vlIof'], 2)),
          vlOutAcr: currencyFormatter.format(
            toFixed(currentValue['vlOutAcr'], 2),
          ),
          dtContrato: dateFormatter(currentValue['dtContrato']),
          dtVctPre: dateFormatter(currentValue['dtVctPre']),
        });
      });

      return new_array_data;
    });

    return res.json({
      totalPages: Math.ceil(result.length / Number(limit)),
      currentPage: parseInt(String(offset), 10),
      data: result.slice(startIndex, endIndex),
    });
  }
}

export default new CsvExtractionController();
