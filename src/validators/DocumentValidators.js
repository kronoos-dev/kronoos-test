class DocumentValidators {
    constructor(value, rule) {
        this.value = value.toString();
        this.rule = rule;
        this.sanitize();
    }

    sanitize() {
        const regex = /[^0-9]/g;
        this.value = this.value.replace(regex, "");
    }

    isLengthValid() {
        if (this.value.length !== this.rule) {
            return false;
        }
        return true;
    }

    isNotRepeted() {
        const regex = /^(\d)\1+$/;
        if (regex.test(this.value)) {
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

export default DocumentValidators;
