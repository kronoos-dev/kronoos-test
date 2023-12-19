const validadeCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = 11 - (sum % 11);
    let firstDigit = rest === 10 || rest === 11 ? 0 : rest;

    if (firstDigit !== parseInt(cpf.charAt(9))) {
        return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = 11 - (sum % 11);
    let secondDigit = rest === 10 || rest === 11 ? 0 : rest;

    if (secondDigit !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

export default CPFValidation