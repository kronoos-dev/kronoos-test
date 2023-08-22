
import { validNrCpfCnpj, CSVRead, validatePrestationCalculation, brlFormatter, convertToDate } from "./utils.js"

 
const transformData = (results) => results.map(item => {
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
        vlPrestaInfo: isValid ? 'Cálculos de prestações consistentes.' : 'Cálculos de prestações inconsistentes.',
        dtContrato: convertToDate(dtContrato),
        dtVctPre: convertToDate(dtVctPre)
    };
})




const run = async () => {
    try {

        const results = [];


        await CSVRead(
            (data) => results.push(data),
            () => {

                const formatedResults = transformData(results);

                console.log(formatedResults);

            }
        )


    } catch (e) {
        console.error(e)
    }

}


run()