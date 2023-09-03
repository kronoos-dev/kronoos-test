class Masks {
    constructor(locale, options, value) {
        this.locale = locale;
        this.options = options;
        this.value = value;
    }

    transform() {
        if (typeof this.value !== "number") {
            return this.value;
        }

        return Intl.NumberFormat(this.locale, this.options).format(this.value);
    }
}

export default Masks;
