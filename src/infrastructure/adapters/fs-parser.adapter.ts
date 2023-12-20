import FileProcessorPort from "../../core/ports/file-processor.port";
import csvParse from "csv-parser";
import fs from "fs";
import { CsvDataDto } from "../interfaces/dto/csv-data.dto";
import CSVParserError from "../../errors/csv-processor.error";

class FsParserAdapter extends FileProcessorPort {
    process(data: fs.ReadStream): Promise<CsvDataDto[]> {
        return new Promise((resolve, reject) => {
            const results: CsvDataDto[] = [];
            data
                .pipe(csvParse())
                .on("data", (data) => results.push(data))
                .on("end", () => {
                    resolve(results);
                })
                .on("error", (error) => {
                    reject(new CSVParserError('Erro ao processar o CSV', error));
                });
        });
    }
}

export default FsParserAdapter;
