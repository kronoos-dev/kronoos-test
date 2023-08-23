export const calculateInstallment = (
  totalAmount: string,
  qtdInstallmentAmount: string,
  installmentAmount: string,
) => {
  const installment = (
    Number(totalAmount) / Number(qtdInstallmentAmount)
  ).toFixed(2)

  return Number(installment) === Number(installmentAmount)
}
