export const isInstallmentValid = (
  totalValue: number, 
  installments: number, 
  installmentValue: number
): boolean => {
  return (totalValue / installments) === installmentValue;
}