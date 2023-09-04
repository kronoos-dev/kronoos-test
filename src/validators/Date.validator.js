class DateValidator {
    constructor(value) {
        this.value = value.toString();
        this.day = NaN;
        this.month = NaN;
        this.year = NaN;
        this.sanitize();
        this.setYear();
        this.setMonth();
        this.setDay();
    }

    setYear() {
        this.year = parseInt(this.value.substring(0, 4), 10);
    }

    setMonth() {
        this.month = parseInt(this.value.substring(4, 6), 10);
    }

    setDay() {
        this.day = parseInt(this.value.substring(6, 8), 10);
    }

    isMonthValid() {
        if (this.month < 1 || this.month > 12) {
            return false;
        }
        return true;
    }

    isDayValid() {
        if (
            this.day < 1 ||
            this.day > new Date(this.year, this.month, 0).getDate()
        ) {
            return false;
        }
        return true;
    }

    sanitize() {
        const regex = /[^0-9]/g;
        this.value = this.value.replace(regex, "");
    }

    isLengthValid() {
        if (this.value.length !== 8) {
            return false;
        }
        return true;
    }

    isValid() {
        if (
            !this.isLengthValid() ||
            !this.isDayValid() ||
            !this.isMonthValid()
        ) {
            return false;
        }
        return true;
    }
}

export default DateValidator;
