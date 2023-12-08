export function parseDate(date: string): Date {
  const year = Number(date.substring(0, 4))
  const month = Number(date.substring(4, 6)) - 1
  const day = Number(date.substring(6, 8))

  const result = new Date(year, month, day)

  return result
}