const intallmentsValidation = (totalString: string, installmentsString: string, installmentValueString: string) =>{
    if(totalString && installmentsString && installmentValueString) {
        const total = Number(totalString);
        const installments = Number(installmentsString);
        const installmentValue = Number(installmentValueString);
        const installmentNumber = Number(Number(total / installments).toFixed(2));

        return installmentNumber === installmentValue;
    } else {
        return false;
    }
}

export default intallmentsValidation