const formatDateToISO = dateString => {
  if (!dateString) throw new Error('Data inválida')
  if (dateString.length < 8) throw new Error('Data inválida')

  try {
    const year = parseInt(dateString.substring(0, 4), 10)
    const month = parseInt(dateString.substring(4, 6), 10) - 1
    const day = parseInt(dateString.substring(6, 8), 10)
    return new Date(year, month, day)
  } catch (error) {
    return error.message
  }
}

export default formatDateToISO
