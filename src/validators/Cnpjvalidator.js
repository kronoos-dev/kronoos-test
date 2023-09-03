import Validators from "./Validators.js";

class Cnpj extends Validators {
    constructor(value) {
        super(value, 14);
    }

    isValid() {
        return super.isValid();
    }
}
export default Cnpj;
