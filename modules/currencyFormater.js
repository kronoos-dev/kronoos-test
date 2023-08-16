const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatCurrency(data) {
  const fieldsToFormat = [
    "vlTotal",
    "vlPresta",
    "vlMora",
    "vlMulta",
    "vlOutAcr",
    "vlIof",
    "vlDescon",
    "vlAtual",
  ];
  data.forEach((row) => {
    fieldsToFormat.forEach((field) => {
      if (!row[field]) {
      }
      row[field] = brlFormatter.format(
        row[field])
    });
  });
}

module.exports = { formatCurrency };
