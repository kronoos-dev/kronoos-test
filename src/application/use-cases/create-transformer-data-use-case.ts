import currency from "currency.js";
import { CurrencyFormatting } from "../utils/currency-formatting";
import { DateFormatting } from "../utils/date-formatting";
import { FileTransformerRepository } from "../repositories/file-transformer-repository";
import { IdentiyFormmating } from "../utils/identity-formatting";
import { AllContractClient } from "../repositories/types/client-contract-type";


export class CreateTransformerDataUseCase{
  constructor(private fileTransformerRepository: FileTransformerRepository){}

  async execute(data: any): Promise<AllContractClient[]>{
    
    const readFileCsv = await this.fileTransformerRepository.transformFromCsvToArray(data)
    if(readFileCsv instanceof Error) throw new Error('Failed read')
     const output = readFileCsv.map((contract) => {
      const vlTotal = CurrencyFormatting.formatToBRL(contract.vlTotal)
      const vlPresta = CurrencyFormatting.formatToBRL(contract.vlPresta)
      const vlMora = CurrencyFormatting.formatToBRL(contract.vlMora)
      const vlAtual = CurrencyFormatting.formatToBRL(contract.vlAtual)
      const vlDescon = CurrencyFormatting.formatToBRL(contract.vlDescon)
      const vlIof = CurrencyFormatting.formatToBRL(contract.vlIof)
      const vlOutAcr = CurrencyFormatting.formatToBRL(contract.vlOutAcr)
      const vlMulta = CurrencyFormatting.formatToBRL(contract.vlMulta)
      const dtContrato = DateFormatting.transformFromStringToDate(contract.dtContrato as string) as Date
      const dtVctPre = DateFormatting.transformFromStringToDate(contract.dtVctPre as string) as Date
      const recalVlPresta = CurrencyFormatting.formatToBRL(CurrencyFormatting.divide(contract.vlTotal,contract.qtPrestacoes).toString())
      const sitCalcPresta = currency(parseFloat(contract.vlPresta)).value !== CurrencyFormatting.divide(contract.vlTotal,contract.qtPrestacoes) ? 'Valor da prestação está incorreto' : 'Valor da prestação está correto'
      const diffEntrePresta = CurrencyFormatting.formatToBRL(currency(parseFloat(contract.vlPresta)).subtract(CurrencyFormatting.divide(contract.vlTotal,contract.qtPrestacoes)).toString())
      const nrCpfCnpj = IdentiyFormmating.checkAndTransform(contract.nrCpfCnpj)
      const nrCpfCnpjValid = IdentiyFormmating.checkValid(contract.nrCpfCnpj)
      return {
        ...contract,
        vlTotal,
        vlPresta,
        vlMora,
        vlAtual,
        vlDescon,
        vlIof,
        vlOutAcr,
        vlMulta,
        dtContrato,
        dtVctPre,
        recalVlPresta,
        diffEntrePresta,
        sitCalcPresta,
        nrCpfCnpj,
        nrCpfCnpjValid
      } as AllContractClient
    })
    return output
  }
}