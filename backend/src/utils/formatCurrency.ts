export function formatCurrency(value: string): string {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) {
    throw new Error("Invalid value");
  }
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(numberValue);
}
