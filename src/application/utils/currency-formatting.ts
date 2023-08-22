import currency from 'currency.js'

export class CurrencyFormatting {
  static formatToBRL(value: string){
    const convertValueToNumber = parseFloat(value)
    return new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(convertValueToNumber)
  }

  static divide(value: string, qtdDivide: string){
    return currency(parseFloat(value)).divide(parseInt(qtdDivide)).value
  }
}