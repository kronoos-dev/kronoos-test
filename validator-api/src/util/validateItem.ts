import cpfCpnjIsValid from "./cpfCpnjIsValid";
import {formatDate}
    from "./formatDate";
import {formatCurrency} from "./formatCurrency";
export const validateItem = (key, item) => {
    switch (key) {
        case 'nrCpfCnpj': {
            const isEmpty = item[key].length < 1
            if(isEmpty){
                return emptyField()
            }
            const hasError = !cpfCpnjIsValid(item[key])
            return {
                value: item[key],
                hasError,
                message: hasError ? 'Documento inválido' : ''
            }
        }
        case 'vlTotal': {
            const isEmpty = item[key].length < 1
            if(isEmpty){
                return emptyField()
            }
            const hasError = totalValidation(item)
            return {
                value: formatCurrency(item[key]),
                hasError,
                message: hasError ? 'Valor incorreto' :''
            }
        }
        case 'qtPrestacoes': {
            const isEmpty = item[key].length < 1
            if(isEmpty){
                return emptyField()
            }
            const hasError = Number(item[key]) <= 0
            return {
                value: item[key],
                hasError,
                message: hasError ? 'Parcela precisa ser maior que 1' : ''
            }
        }
        case 'dtContrato': {
            const isEmpty = item[key].length < 1
            if(isEmpty){
                return emptyField()
            }
            const hasError = !formatDate(item[key])
            return {
                value: hasError? item[key]: formatDate(item[key]),
                hasError,
                message: hasError ? 'Data inválida' : ''
            }
        }
        case 'dtVctPre': {
            const isEmpty = item[key].length < 1
            if(isEmpty){
                return emptyField()
            }
            const hasError = !formatDate(item[key])
            return {
                value: hasError? item[key]: formatDate(item[key]),
                hasError,
                message: hasError ? 'Data inválida' : ''
            }
        }
        case 'vlPresta': {
            return currencyField(key,item);
        }
        case 'vlMulta': {
            return currencyField(key,item);
        }
        case 'vlMora': {
            return currencyField(key,item);
        }
        case 'vlIof': {
            return currencyField(key,item);
        }
        case 'vlDescon': {
            return currencyField(key,item);
        }
        case 'vlAtual': {
            return currencyField(key,item);
        }
        case 'vlOutAcr': {
            return currencyField(key,item);
        }
        default: {
            return defaultField(key, item);
        }
    }
}

const emptyField = () => {
    return {
        value: '',
        hasError: true,
        message: 'Campo vázio'
    }
}

const currencyField = (key, item) => {
    return {
        value: formatCurrency(item[key]),
        hasError: false,
        message: ''
    }
}


const defaultField = (key, item) => {
    return {
        value: item[key],
        hasError: false,
        message: ''
    }
}

const totalValidation = (item) => {
   return Number(item.vlTotal) !== (Number(item.vlPresta) * Number(item.qtPrestacoes.value))
}