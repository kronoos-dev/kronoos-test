// Depdendencies
import { ParseCsv } from '../../domain/usecases'
import {
  formatBRLCurrency,
  formatDate,
  formatCnpjOrCpf,
  isValidCnpjOrCpf
} from '../../presentation/utils'

// Main handler
export class ParseCsvHandler implements ParseCsv {
  constructor () {}

  async parse (data: ParseCsv.Params): Promise<{
    formattedData: any[]
  }> {
    // Formatting fields
    const validatedList = data.csvData.map(item => {
      const expectedPrestaVl = Number(item.vlTotal) / Number(item.qtPrestacoes)
      const isPrestaValueCorrect = formatBRLCurrency(expectedPrestaVl) === formatBRLCurrency(item.vlPresta)

      // Final object
      return {
        ...item,
        vlTotal: formatBRLCurrency(item.vlTotal),
        vlPresta: formatBRLCurrency(item.vlPresta),
        isPrestaValueCorrect,
        vlPrestaCorrected: formatBRLCurrency(expectedPrestaVl),
        vlMora: formatBRLCurrency(item.vlMora),
        vlMulta: formatBRLCurrency(item.vlMulta),
        vlOutAcr: formatBRLCurrency(item.vlOutAcr),
        vlIof: formatBRLCurrency(item.vlIof),
        vlDescon: formatBRLCurrency(item.vlDescon),
        vlAtual: formatBRLCurrency(item.vlAtual),
        dtContrato: formatDate(item.dtContrato),
        dtVctPre: formatDate(item.dtVctPre),
        nrCpfCnpjFormatedFlag: formatCnpjOrCpf(item.nrCpfCnpj),
        nrCpfCnpjIsValidFlag: isValidCnpjOrCpf(item.nrCpfCnpj)
      }
    })

    // Returning validated list
    return { formattedData: validatedList }
  }
}
