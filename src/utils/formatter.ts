import { parseISO, format } from 'date-fns'

const priceBRFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
export const priceFormatter = (amount: number) => {
  return priceBRFormatter.format(amount)
}

export const dateFormatter = (date: string) => {
  const dateConverted = parseISO(date)

  return format(dateConverted, 'dd/MM/yyyy')
}
