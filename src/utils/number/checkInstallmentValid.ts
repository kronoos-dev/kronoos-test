const checkInstallmentValid = (total:number, numberOfInstallments:number, installmentValueToCheck:number) => {
    if(total<=0 || numberOfInstallments<=0 || installmentValueToCheck<=0){
        return false
    }
    return total / numberOfInstallments === installmentValueToCheck
  }

export { checkInstallmentValid };