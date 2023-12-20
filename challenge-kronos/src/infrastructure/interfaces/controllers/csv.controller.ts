import CsvService from "../../../core/use_cases/services/csv.service";
import { Request, Response, NextFunction } from "express";
import ValidatorError from "../../../errors/validator.error";
import CSVParserError from "../../../errors/csv-processor.error";
import CSVReadError from "../../../errors/csv-reader.error";


class CsvController {
    constructor(private readonly csvService: CsvService) {}

    async read(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { file } = req;
            if (!file) {
                return res.status(400).send('No file uploaded.');
            }

            const data = await this.csvService.read(file);
            return res.send(data);
        } catch (error) {
            if (error instanceof ValidatorError || error instanceof CSVParserError || error instanceof CSVReadError) {
                return res.status(400).send(error.message);
            }

            return res.status(500).send('Internal server error');
        }
    }
}

export default CsvController;
