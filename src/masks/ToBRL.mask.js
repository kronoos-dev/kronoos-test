import CoinMasks from "./CoinMasks.js";

class ToBRL extends CoinMasks {
    constructor(value) {
        super(
            "pt-BR",
            { style: "currency", currency: "BRL" },
            parseFloat(value)
        );
    }

    transform() {
        return super.transform();
    }
}

export default ToBRL;
