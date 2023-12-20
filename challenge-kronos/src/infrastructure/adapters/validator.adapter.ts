import ValidatorPort from "../../core/ports/validator.port";
import {cpf, cnpj} from 'cpf-cnpj-validator';
import ValidatorError from "../../errors/validator.error";

class ValidatorAdapter extends ValidatorPort {
    async validate(data: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async validateCpfCnpj(cpfCnpj: string): Promise<void> {
        try {
            if (!cpfCnpj) {
                throw new ValidatorError(`CPF/CNPJ: ${cpfCnpj} não fornecido`);
            }

            const cleanCpfCnpj = cpfCnpj.replace(/\D/g, '');

            if (cleanCpfCnpj.length === 11) {
                if (!cpf.isValid(cleanCpfCnpj)) {
                    throw new ValidatorError(`CPF: ${cpfCnpj} inválido`);
                }
            } else if (cleanCpfCnpj.length === 14) {
                if (!cnpj.isValid(cleanCpfCnpj)) {
                    throw new ValidatorError(`CNPJ: ${cpfCnpj} inválido`);
                }
            } else {
                throw new ValidatorError(`CPF/CNPJ: ${cpfCnpj} com tamanho inválido`);
            }

        } catch (error) {
            throw error;
        }
    }

    validateDate(date: string): Promise<string> {
        return Promise.resolve("");
    }


    async validateInstallment(total: string, installment: string, installmentAmount: string, cpfCnpj: string): Promise<void> {
        try {
            const totalValue = parseFloat(total);
            const installmentValue = parseFloat(installment);
            const installmentCount = parseInt(installmentAmount, 10);

            if (isNaN(totalValue) || isNaN(installmentValue) || isNaN(installmentCount)) {
                throw new ValidatorError(`Valores inválidos para validação de prestações,  CpfCnpj: ${cpfCnpj}`);
            }

            const expectedInstallmentValue = totalValue / installmentCount;

            if (installmentValue !== expectedInstallmentValue) {
                throw new ValidatorError(`Valor de prestação inconsistente com o total e a quantidade de prestações, CpfCnpj: ${cpfCnpj}`);
            }

        } catch (error) {
            throw error;
        }
    }

    validateValue(value: string): Promise<string> {
        return Promise.resolve("");
    }

}

export default ValidatorAdapter;