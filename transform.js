
import { validNrCpfCnpj, CSVRead, validatePrestationCalculation, brlFormatter, convertToDate } from "./utils.js"

export const transformData = (results) => results.map(item => {
    const { vlTotal, vlPresta, vlMora, nrCpfCnpj, qtPrestacoes, dtContrato, dtVctPre, ...rest } = item,
        prestationCalculation = validatePrestationCalculation(vlTotal, qtPrestacoes);
 
    return {
        ...rest,
        validCpfCnpj: {
            ...validNrCpfCnpj(`${nrCpfCnpj}`)
        },
        nrCpfCnpj,
        qtPrestacoes,
        vlTotalOrigin: vlTotal,
        vlTotal: brlFormatter.format(vlTotal),
        vlPresta: brlFormatter.format(vlPresta),
        vlMora: brlFormatter.format(vlMora), 
        vlPrestationCalculation: brlFormatter.format(prestationCalculation),
        dtContrato: convertToDate(dtContrato),
        dtVctPre: convertToDate(dtVctPre)
    };
})

