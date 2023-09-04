class InstallmentValue {
    constructor(installmentValue, calculatedInstallmentValue) {
        this.installmentValue = parseFloat(installmentValue);
        this.calculatedInstallmentValue = parseFloat(
            calculatedInstallmentValue
        );
    }

    isValid() {
        if (this.installmentValue !== this.calculatedInstallmentValue) {
            return false;
        }
        return true;
    }
}

export default InstallmentValue;
