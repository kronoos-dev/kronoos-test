export const formatBRLCurrency = (currency: string | number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  .format(typeof currency === 'string' ? Number(currency) : currency)