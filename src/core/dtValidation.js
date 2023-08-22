//Convert string to Date
//YYYYMMDD -> Date

const dtValidation = dt => {
  if (!/^\d{8}$/.test(dt)) return false

  //Extract year, month and day
  const year = parseInt(dt.slice(0, 4))
  const month = parseInt(dt.slice(4, 6))
  const day = parseInt(dt.slice(6, 8))

  if (isNaN(year) || isNaN(month) || isNaN(day)) return false

  if (month < 1 || month > 12) return false

  //Check if day is valid in the month
  const daysInMonth = new Date(year, month, 0).getDate()

  if (day < 1 || day > daysInMonth) return false

  return new Date(year, month - 1, day)
}

module.exports = dtValidation
