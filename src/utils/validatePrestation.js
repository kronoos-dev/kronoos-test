const validatePrestation = (vlTotal, qtPrestacoes, vlPresta) => {
    const calculatedValue = vlTotal / qtPrestacoes;
    // arredonando o valor para não ter erro de calculo
    const roundedCalculatedValue = Math.round(calculatedValue * 100) / 100;
    const roundedVlPresta = Math.round(vlPresta * 100) / 100;
    if (roundedCalculatedValue === roundedVlPresta) {
        return vlPresta
    } else {
        return 'Valor inconsistente'
    }
 
}

module.exports = validatePrestation;

 