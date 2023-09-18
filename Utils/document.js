const {cpf, cnpj} = require('cpf-cnpj-validator');

function validateRegistrationNumber(regristration){
    if(cpf.isValid(regristration) || cnpj.isValid(regristration))
        return regristration;

    return 'INVALID DOCUMENT';
}

module.exports = {validateRegistrationNumber}