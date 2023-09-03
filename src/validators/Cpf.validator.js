import Validators from "./Validators.js";

class Cpf extends Validators {
    constructor(value) {
        super(value, 11);
    }

    isValid() {
        return super.isValid();
    }
}
export default Cpf;
