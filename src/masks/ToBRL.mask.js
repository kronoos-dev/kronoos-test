import Masks from "./Masks.js";

class ToBRL extends Masks {
    constructor(value) {
        super("pt-BR", { style: "currency", currency: "BRL" }, value);
    }

    transform() {
        return super.transform();
    }
}

export default ToBRL;
