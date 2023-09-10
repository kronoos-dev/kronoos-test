const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2, // Número mínimo de casas decimais
  maximumFractionDigits: 2, // Número máximo de casas decimais
});

export default currencyFormatter;
