import DateValidator from "../validators/Date.validator.js";

class ToDate {
    constructor(value) {
        this.value = value.toString();
        this.day = NaN;
        this.month = NaN;
        this.year = NaN;
        this.date = this.init();
    }

    setYear() {
        this.year = parseInt(this.value.substring(0, 4), 10);
    }

    setMonth() {
        this.month = parseInt(this.value.substring(4, 6), 10) - 1;
    }

    setDay() {
        this.day = parseInt(this.value.substring(6, 8), 10);
    }

    init() {
        if (!new DateValidator(this.value).isValid()) {
            return this.value;
        }
        this.setYear();
        this.setMonth();
        this.setDay();

        return new Date(this.year, this.month, this.day);
    }

    transform() {
        return Intl.DateTimeFormat("pt-BR").format(this.date);
    }
}

export default ToDate;
