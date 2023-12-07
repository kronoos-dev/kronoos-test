const isCPF = (cpf:string) => {

    if (typeof cpf !== 'string') return true;

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    let cpfSplit = cpf.split('');
    const validator = cpfSplit
        .filter((digit, index, array) => index >= array.length - 2 && digit)
        .map(el => +el);

    const toValidate = (pop: number): number[] => {
        return cpfSplit
            .filter((digit, index, array) => index < array.length - pop && digit)
            .map((el) => +el);
    };

    // Algoritmo de validação do CPF
    const rest = (count: number, pop: number): number => {
        return (
            ((toValidate(pop).reduce(
                (soma:number, el:number, i:number) => soma + el * (count - i),
                0
            ) * 10) % 11) % 10
        );
    };

    return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}
const isCNPJ = (cnpj:string) => {
    const numericCNPJ = cnpj.replace(/\D/g, '');

    if (numericCNPJ.length !== 14) {
        return false;
    }

    if (/^(\d)\1+$/.test(numericCNPJ)) {
        return false;
    }

    // Algoritmo de validação do CNPJ
    let size = numericCNPJ.length - 2;
    let numbers = numericCNPJ.substring(0, size);
    const digits = numericCNPJ.substring(size);
    let sum = 0;
    let position = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * position--;
        if (position < 2) {
            position = 9;
        }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(0))) {
        return false;
    }

    size = size + 1;
    numbers = numericCNPJ.substring(0, size);
    sum = 0;
    position = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * position--;
        if (position < 2) {
            position = 9;
        }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    return result === parseInt(digits.charAt(1));
}

const validateCpfCnpj =(document:string)=>{
    
    document = document.replace(/[^\d]+/g, '');
    
    if (document.length === 11) {
        return isCPF(document) ? document : 'CPF Inválido';
    }
    if (document.length === 14) {
        return isCNPJ(document) ? document : 'CNPJ Inválido';
    }
    return `Documento (${document}) inválido`
}

export {
    validateCpfCnpj   
}