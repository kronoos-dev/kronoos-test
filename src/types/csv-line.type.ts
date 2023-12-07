import { z } from 'zod'
import { format as number2Currency } from '../utils/number-2-currency'
import { parse } from 'date-fns'

const numberTransformer = (value: string) => Number(value)
const currencyTransformer = (value: number) => number2Currency(value)
const dateTransformer = (dateString: string) => parse(dateString, 'yyyyMMdd', new Date());

export const CSVLineSchema = z.object({
    nrCpfCnpj: z.string(),
    dsProduto: z.string(),
    dsCarteira: z.string(),
    tpPresta: z.string(),
    nrInst: z.string(),
    nrAgencia: z.string(),
    nrContrato: z.string(),
    cdCarteira: z.string(),
    nrProposta: z.string(),
    nrSeqPre: z.string(),
    idSitVen: z.string().default(''),
    idSituac: z.string().default(''),
    nmClient: z.string().default(''),
    cdProduto: z.string().default(''),
    cdClient: z.string().default(''),
    dtVctPre: z.string().transform(dateTransformer),
    dtContrato: z.string().transform(dateTransformer),
    qtPrestacoes: z.string().transform(numberTransformer),
    nrPresta: z.string().transform(numberTransformer),
    vlTotal: z.string().transform(numberTransformer).transform(currencyTransformer),
    vlPresta: z.string().transform(numberTransformer).transform(currencyTransformer),
    vlMora: z.string().transform(numberTransformer).transform(currencyTransformer),
    vlMulta: z.string().transform(numberTransformer).transform(currencyTransformer),
    vlOutAcr: z.string().transform(numberTransformer).transform(currencyTransformer),
    vlIof: z.string().transform(numberTransformer).transform(currencyTransformer),
    vlDescon: z.string().transform(numberTransformer).transform(currencyTransformer),
    vlAtual: z.string().transform(numberTransformer).transform(currencyTransformer),
})

export type CSVLine = z.infer<typeof CSVLineSchema> & {
    id: number
    documentValid: boolean
    installmentValueValid: boolean
}