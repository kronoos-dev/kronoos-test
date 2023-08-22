import Intl from 'intl'

export class CurrencyConverter {

  convert(value): string {
    const valueFormatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    return valueFormatter.format(value)
  }
}