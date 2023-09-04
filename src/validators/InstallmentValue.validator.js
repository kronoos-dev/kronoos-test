class InstallmentValue {
    constructor(installmentValue, calculateInstallmentValue) {
        this.InstallmentValue = parseFloat(installmentValue);
        this.calculateInstallmentValue = parseFloat(calculateInstallmentValue);
    }

    isValid() {
        if (this.installmentValue !== this.calculateInstallmentValue) {
            return false;
        }
        return true;
    }
}

export default InstallmentValue;
