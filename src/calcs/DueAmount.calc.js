class DueAmount {
    constructor(totalAmount, numInstallments) {
        this.totalAmount = parseFloat(totalAmount);
        this.numInstallments = parseInt(numInstallments);
    }

    static calculate() {
        if (this.numInstallments < 1) {
            this.numInstallments = 1;
        }
        return this.totalAmount / this.numInstallments;
    }
}

export default DueAmount;
