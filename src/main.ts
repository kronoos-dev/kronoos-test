
import {createReadStream, writeFileSync} from "node:fs"
import csv from "csv-parser"
import { Contrato, ContratoProps } from "./domain/Contrato"

type TResult = {
    nrContrato: number
    dtContratoFormat: Date 
    vlTotalFormatBR: string
    vlMoraFormatBR: string 
    vlPrestaFormatBR: string  
    valideVlPrestaOK: boolean 
    valideNrCpfCnpj: boolean 
}

(()=> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: TResult[] = []
    let countVlPrestaOk: number = 0, countCpfCnpjValid: number = 0

    createReadStream("data.csv")
        .pipe(csv())
        .on("data", (row: ContratoProps)=> {
            const contrato = new Contrato(row)

            // obter a data do contrato formatada
            const { dtContratoFormat } = contrato

            // valores formatados para real (R$)
            const { vlTotalFormatBR, vlPrestaFormatBR, vlMoraFormatBR } = contrato

            // valida CPF e CNPJ
            const { valideNrCpfCnpj } = contrato
            if (valideNrCpfCnpj) countCpfCnpjValid++

            // valida CPF e CNPJ
            const { valideVlPrestaOK } = contrato
            if (valideVlPrestaOK) countVlPrestaOk++

            // obter o numero do contrato
            const { nrContrato } = contrato
            
            const chunk : TResult= {
                nrContrato,
                dtContratoFormat, 
                vlTotalFormatBR,
                vlMoraFormatBR, 
                vlPrestaFormatBR,  
                valideVlPrestaOK, 
                valideNrCpfCnpj
            }

            result.push(chunk)
        })
        .on("end", ()=> {
            // Para finalizar, decidi salvar o resultado em um arquivo JSON.
            // Nesse caso, não precisar ser stream, por que escreveremos tudo sempre de uma vez.
            writeFileSync("output.json", JSON.stringify(result, null, 2))
            console.log(`${result.length} contratos processados`)
            console.log(`${countCpfCnpjValid} CPF|CNPJ validos`)
            console.log(`${countVlPrestaOk} valor de prestação estão corretos`)
        })
})()