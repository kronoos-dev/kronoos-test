import validateCNPJ from "./validate-cnpj";
import validateCPF from "./validate-cpf";

const validateNrCpfCnpj = (nrCpfCnpj: string) => {
    const stripedNumber = nrCpfCnpj.replace(/[^\d]/g, '');
    if (stripedNumber.length === 11) {
        return validateCPF(stripedNumber);
    } else if (stripedNumber.length === 14) {
        return validateCNPJ(stripedNumber);
    } else {
        return false;
    }

}

export default validateNrCpfCnpj