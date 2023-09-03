class Validators {
    constructor(value, rule) {
        this.value = value.toString();
        this.rule = rule;
        this.sanitize();
    }

    sanitize() {
        this.value = this.value.replace(/[^0-9]/g, "");
    }

    isLengthValid() {
        if (this.value.length !== this.rule) {
            return false;
        }
        return true;
    }

    isNotRepeted() {
        if (/^(\d)\1+$/.test(this.value)) {
            return false;
        }
        return true;
    }

    isValid() {
        if (this.isLengthValid() && this.isNotRepeted()) {
            return true;
        }
        return false;
    }
}

export default Validators;
