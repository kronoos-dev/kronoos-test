
import { validNrCpfCnpj, CSVRead, validatePrestationCalculation, convertToDate } from "./utils.js"
 
const run = async () => {
    try {

        const results = [];
        const brlFormatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
 
        await CSVRead(
            (data) => results.push(data),
            () => {

                const formatedResults = results.map(item => {
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
                });
 
                console.log(formatedResults);

            }
        )


    } catch (e) {
        console.error(e)
    }

}


run()