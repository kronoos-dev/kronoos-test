import DocumentValidators from "./DocumentValidators.js";

class Cpf extends DocumentValidators {
    constructor(value) {
        super(value, 11);
    }

    isValid() {
        return super.isValid();
    }
}
export default Cpf;
