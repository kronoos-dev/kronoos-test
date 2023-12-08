export function convertMoney(value: string): string {
  if (!value) throw new Error('value is mandatory')

  const parsedValue = Number(value)

  const result = new Intl.NumberFormat('pt-BR',
    {
      style: 'currency', currency: 'BRL'
    }).format(parsedValue)

  return result
}