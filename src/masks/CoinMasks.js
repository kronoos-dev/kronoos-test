class CoinMasks {
    constructor(locale, options, value) {
        this.locale = locale;
        this.options = options;
        this.value = value;
    }

    transform() {
        return Intl.NumberFormat(this.locale, this.options).format(this.value);
    }
}

export default CoinMasks;
