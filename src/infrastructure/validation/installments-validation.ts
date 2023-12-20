const intallmentsValidation = (totalString: string, installmentsString: string, installmentValueString: string) =>{
    const total = Number(totalString);
    const installments = Number(installmentsString);
    const installmentValue = Number(installmentValueString);
    if(!Number.isInteger(installments)) {
        return false
    }
    if(totalString && installmentsString && installmentValueString) {
        const installmentNumber = Number(Number(total / installments).toFixed(2));

        return installmentNumber === installmentValue;
    } else {
        return false;
    }
}

export default intallmentsValidation