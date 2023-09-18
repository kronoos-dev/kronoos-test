
const formater = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

function convertToBRL(value){
    return formater.format(value);
}



module.exports = {convertToBRL}
