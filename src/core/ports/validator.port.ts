import {CsvDataDto} from "../../infrastructure/interfaces/dto/csv-data.dto";

abstract class ValidatorPort {
    abstract validateCpfCnpj(cpfCnpj: string): Promise<void>;
    abstract validateDate(date: string): Promise<string>;
    abstract validateInstallment(total: string, installment: string, installmentAmount: string, cpfCnpj: string): Promise<void>;
}

export default ValidatorPort;