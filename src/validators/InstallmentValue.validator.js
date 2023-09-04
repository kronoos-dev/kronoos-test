class InstallmentValue {
    constructor(installmentValue, calculatedInstallmentValue) {
        this.installmentValue = parseFloat(installmentValue);
        this.calculatedInstallmentValue = parseFloat(
            calculatedInstallmentValue
        );
    }

    isValid() {
        console.log(this.installmentValue, this.calculatedInstallmentValue);
        if (this.installmentValue !== this.calculatedInstallmentValue) {
            return false;
        }
        return true;
    }
}

export default InstallmentValue;
