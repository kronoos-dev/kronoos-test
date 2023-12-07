import { CSVLine, CSVLineSchema } from "./types/csv-line.type"
import { csv2Json } from "./utils/csv-2-json"
import { resolve } from 'path'
import { documentValidator } from "./validators/document-validator"
import { isInstallmentValueValid } from "./validators/installment-value.validator"
import fs from 'fs'

const main = async () => {
    const filePath = resolve(__dirname, 'misc', 'data.csv')
    const rows = await csv2Json<CSVLine>(filePath)
    const result = rows.map(row => {
        return {
            ...CSVLineSchema.parse(row), 
            documentoValido: documentValidator(row.nrCpfCnpj).isValid,
            vlPrestaValido: isInstallmentValueValid({ 
                installments: Number(row.nrInst), 
                installmentValue: Number(row.vlPresta), 
                total: Number(row.vlTotal)
            })
        }
    })

    console.log('Resultado -> ', result)
    fs.writeFileSync('result.json', JSON.stringify(result))
}

main()