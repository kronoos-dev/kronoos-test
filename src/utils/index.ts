export function calculateInstallments(total: number, amount: number): number {
  return amount < 1 ? 1 : total / amount;
}
