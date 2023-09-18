const intl = require('intl');

function formatRealCurrency(number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number)
}

function cpfORCNPJ(number) {
    if (number.length <= 11) {
        return 'CPF'
    } else {
        return 'CNPJ'
    }
}

function validationTotalValue (vlTotal, qtPrest, vlPresta) {
    // Esta requiremento ficou um pouco confuso porém creio que vou deixar especificado
    // com console log, pois sempre o valor da prestação é maior que valor da divisão total 
    // Creio que ou eu não tenha entendido algum erro no requirimento.
    console.log(parseFloat(vlPresta), "Valor da Prestação");
    console.log(parseFloat(vlTotal), "Valor Total");
    console.log(qtPrest, "Quantidade")
 
    const valorTotalDivididoPorParcelas = parseFloat(vlTotal) / parseInt(qtPrest);
    console.log(valorTotalDivididoPorParcelas, 'Divisão dp valor total pelas parcelas');

    return 
}

function dataConvert(DATA) {
    const ano = Number(DATA.substring(0, 4));
    const mes = Number(DATA.substring(4, 6)) -1;
    const dia = Number(DATA.substring(6, 8));

    const data = new Date(ano, mes, dia);

    return data
}

module.exports = {
    formatRealCurrency,
    dataConvert,
    validationTotalValue,
    cpfORCNPJ
}