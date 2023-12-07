const floatToCurrency = (value:number, currencyCode : string = 'BRL' ) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode,
    }).format(value);
  }

export { floatToCurrency };