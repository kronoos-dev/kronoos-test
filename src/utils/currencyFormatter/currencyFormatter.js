const currencyFormatter = (number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);

module.exports = {
  currencyFormatter,
};
