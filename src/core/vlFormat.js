//Convert number to BRL currency format
//Ex: 1000.00 => R$ 1.000,00

const vlFormat = vl => {
  //Check if is a valid string
  if (!/^\d+(\.\d{1,2})?$/.test(vl)) return false

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  return formatter.format(vl)
}

module.exports = vlFormat
