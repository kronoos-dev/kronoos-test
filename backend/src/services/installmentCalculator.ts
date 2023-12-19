export function installmentCalculator(
  amount: number,
  installments: number,
): number {
  if (installments <= 0) {
    throw new Error("A quantidade de parcelas deve ser maior que zero.");
  }

  if (installments % 1 !== 0) {
    throw new Error("A quantidade de parcelas deve ser um número inteiro.");
  }

  if (amount <= 0) return 0;

  const integerAmount = Math.floor(amount * 100);
  const installmentValue = Math.floor(integerAmount / installments);
  return installmentValue / 100;
}
