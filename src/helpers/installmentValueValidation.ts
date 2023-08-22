import { CurrencyConverter } from "./currencyConverter"

export class InstallmentValueValidation {
  
  validate (total, amountInstallments, valueInstallments) {
    const currencyConverter =  new CurrencyConverter()
    const correctValueInstallments = Number(total) / Number(amountInstallments)

    if(correctValueInstallments === valueInstallments) return currencyConverter.convert(valueInstallments)

    
    return currencyConverter.convert(correctValueInstallments)
  }
}