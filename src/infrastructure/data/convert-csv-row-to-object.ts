import { Customer } from "../../domain/models/customer.model";
import CustomerDto from "../../presentation/dtos/customer.dto";
import intallmentsValidation from "../validation/installments-validation";
import validateNrCpfCnpj from "../validation/validate-nr-cpf-cnpj";
import convertStringNumberToBRL from "./convert-string-number-to-brl";
import convertStringToDate from "./convert-string-to-date";

const convertCsvRowToObject = (customer: Customer): CustomerDto => {
    const convertionCustomerObject = Object.assign({
        ...customer,
        nrInst: Number(customer.nrInst),
        cdClient: Number(customer.cdClient),
        nrAgencia: Number(customer.nrAgencia),
        nrCpfCnpj: Number(customer.nrCpfCnpj),
        nrContrato: Number(customer.nrContrato),
        dtContrato: convertStringToDate(customer.dtContrato),
        qtPrestacoes: Number(customer.qtPrestacoes),
        vlTotal: convertStringNumberToBRL(customer.vlTotal),
        cdProduto: Number(customer.cdProduto),
        cdCarteira: Number(customer.cdCarteira),
        nrProposta: Number(customer.nrProposta),
        nrPresta: Number(customer.nrPresta),
        nrSeqPre: Number(customer.nrSeqPre),
        dtVctPre: convertStringToDate(customer.dtVctPre),
        vlPresta: convertStringNumberToBRL(customer.vlPresta),
        vlMora: convertStringNumberToBRL(customer.vlMora),
        vlMulta: convertStringNumberToBRL(customer.vlMulta),
        vlOutAcr: convertStringNumberToBRL(customer.vlOutAcr),
        vlIof: convertStringNumberToBRL(customer.vlIof),
        vlDescon: convertStringNumberToBRL(customer.vlDescon),
        vlAtual: convertStringNumberToBRL(customer.vlAtual),
        hasValidTotalAndInstallment: intallmentsValidation(customer.vlTotal, customer.qtPrestacoes, customer.vlPresta),
        isValidNrCpfCnpj: validateNrCpfCnpj(customer.nrCpfCnpj)
    })
    return new CustomerDto(convertionCustomerObject)
}

export default convertCsvRowToObject
