const { cpf, cnpj } = require('cpf-cnpj-validator');

const verifyCpfCnpj = (value) => {
    const number = value.replace(/\D/g, '');

    if (cpf.isValid(number)) {
        return {
            numero: value,
            numeroFormatado: number,
            tipo: 'cpf',
            valido: true
        }
    }

    if (cnpj.isValid(number)) {
        return {
            numero: value,
            numeroFormatado: number,
            tipo: 'cnpj',
            valido: true
        }
    }

    return {
        numero: value,
        numeroFormatado: number,
        tipo: 'inválido',
        valido: false
    }
}

module.exports = { verifyCpfCnpj };