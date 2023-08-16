const { cnpj, cpf } = require('cpf-cnpj-validator')

module.exports = {
    formatToDateType: (value) => {
        const year = value.slice(0,4)
        const month = value.slice(4,6)
        const day = value.slice(6,8)
        return new Date(year, month - 1, day)
    },
    cpfCnpValidator: function(value) {
        if (!value || value.length !== 11 && value.length !== 14) return false 
        if (value.length == 11) return cpf.isValid(value)
        if (value.length == 14) return cnpj.isValid(value)
    },
    compareTotalValueWithInstallments: function({vlTotal, vlPresta, qtPrestacoes}) {
        const prestacoesCalculadas = Number(vlTotal)/Number(qtPrestacoes)
        return prestacoesCalculadas.toFixed(2) == Number(vlPresta).toFixed(2)
    }
}

