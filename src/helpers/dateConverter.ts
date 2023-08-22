export class DateConverter {
  convert (date) {
    const year = parseInt(date.slice(0, 4))
    const month = parseInt(date.slice(4, 6))
    const day = parseInt(date.slice(6, 8))

    if(!year || !month || !day) return false

    if (month < 1 || month > 12) return false

    return new Date(year, month, day)
  }
}