const {format} = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
});

export const moneyFormat = (money: number) => {
    return format(money)
}



  