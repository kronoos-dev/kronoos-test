import DocumentValidators from "./DocumentValidators.js";

class Cnpj extends DocumentValidators {
    constructor(value) {
        super(value, 14);
    }

    isValid() {
        return super.isValid();
    }
}
export default Cnpj;
