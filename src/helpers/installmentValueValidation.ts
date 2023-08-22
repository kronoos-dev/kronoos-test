export class InstallmentValueValidation {
  validate (total, amountInstallments, valueInstallments) {
    const correctValueInstallments = Number(total) / Number(amountInstallments)

    if(correctValueInstallments === valueInstallments) return valueInstallments

    return correctValueInstallments
  }
}