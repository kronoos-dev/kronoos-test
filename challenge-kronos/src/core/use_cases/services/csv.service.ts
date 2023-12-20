import FsAdapter from "../../../infrastructure/adapters/fs.adapter";
import FsParserAdapter from "../../../infrastructure/adapters/fs-parser.adapter";
import ValidatorAdapter from "../../../infrastructure/adapters/validator.adapter";
import ValidatorError from "../../../errors/validator.error";
import CSVParserError from "../../../errors/csv-processor.error";
import CSVReadError from "../../../errors/csv-reader.error";
import ConversorAdapter from "../../../infrastructure/adapters/conversor.adapter";
import {CsvDataDto} from "../../../infrastructure/interfaces/dto/csv-data.dto";

class CsvService {
    constructor(
        private readonly fsAdapter: FsAdapter,
        private readonly fsParserAdapter: FsParserAdapter,
        private readonly validatorAdapter: ValidatorAdapter,
        private readonly conversorAdapter: ConversorAdapter,
    ) {
    }

    async read(file: Express.Multer.File): Promise<CsvDataDto[]> {
        try {
            const data = await this.fsAdapter.read(file);
            const items = await this.fsParserAdapter.process(data);

            for (const item of items) {
                await this.validatorAdapter.validateCpfCnpj(item.nrCpfCnpj);
                await this.validatorAdapter.validateInstallment(item.vlTotal, item.vlPresta, item.qtPrestacoes, item.nrCpfCnpj);

                item.dtContrato = await this.conversorAdapter.convertDate(item.dtContrato.toString());
                item.dtVctPre = await this.conversorAdapter.convertDate(item.dtVctPre.toString());

                item.vlTotal = await this.conversorAdapter.convertValue(item.vlTotal);
                item.vlPresta = await this.conversorAdapter.convertValue(item.vlPresta);

                item.vlMora = await this.conversorAdapter.convertValue(item.vlMora);
                item.vlMulta = await this.conversorAdapter.convertValue(item.vlMulta);
                item.vlAtual = await this.conversorAdapter.convertValue(item.vlAtual);

            }

            return items;
        } catch (error) {
            throw error;
        }
    }
}

export default CsvService;