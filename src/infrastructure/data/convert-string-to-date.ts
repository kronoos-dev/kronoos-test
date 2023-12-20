const convertStringToDate = (dateString: string): Date => {
  const year = Number(dateString.slice(0, 4))
  const month = Number(dateString.slice(4, 6))
  const day = Number(dateString.slice(6, 8))

  return new Date(year, month - 1, day);
}

export default convertStringToDate
