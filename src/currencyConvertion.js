export function formatMonetaryValues(dataArray) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const formattedData = dataArray.map((row) => {
    return {
      ...row,
      vlTotal: formatter.format(parseFloat(row.vlTotal)),
      vlPresta: formatter.format(parseFloat(row.vlPresta)),
      vlMora: formatter.format(parseFloat(row.vlMora)),
    };
  });

  return formattedData;
}
