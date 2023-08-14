const formatNumber = (number)  => {
    const numberFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return numberFormatter.format(number);
}

module.exports = formatNumber;