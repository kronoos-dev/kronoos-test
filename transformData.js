
import { validNrCpfCnpj, CSVRead, validatePrestationCalculation, brlFormatter, convertToDate } from "./utils.js"

 
export const transformData = (results) => results.map(item => {
    const { vlTotal, vlPresta, vlMora, nrCpfCnpj, qtPrestacoes, dtContrato, dtVctPre, ...rest } = item,
        isValid = validatePrestationCalculation(vlTotal, qtPrestacoes, vlPresta);

    return {
        ...rest,
        validCpfCnpj: {
            ...validNrCpfCnpj(`${nrCpfCnpj}`)
        },
        vlTotal: brlFormatter.format(vlTotal),
        vlPresta: brlFormatter.format(vlPresta),
        vlMora: brlFormatter.format(vlMora),
        vlPrestaConsistentes: isValid ? true : false,
        dtContrato: convertToDate(dtContrato),
        dtVctPre: convertToDate(dtVctPre)
    };
})

