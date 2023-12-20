const convertStringNumberToBRL = (stringNumber: string) => {
    const convertedNumber = Number(stringNumber)
    const options = {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }
    const formatNumber = new Intl.NumberFormat('pt-BR', options)
    return formatNumber.format(convertedNumber)
}

export default convertStringNumberToBRL