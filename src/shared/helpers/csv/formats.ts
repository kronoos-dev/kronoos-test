/* eslint-disable no-restricted-globals */
interface dataArrayConverted {
  [key: string]: string | undefined
}

export function formatedValuesMoney(dataCsvConverted: dataArrayConverted[]): dataArrayConverted[] {
  const camposVl = Object.keys(dataCsvConverted[0]).filter((campo) => campo.startsWith('vl'))

  const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return dataCsvConverted.map((data) => {
    const newData: dataArrayConverted = {}

    camposVl.forEach((field) => {
      const valorString = data[field]
      if (valorString !== undefined) {
        const valorNumerico = parseFloat(valorString.replace(',', '.'))
        if (!isNaN(valorNumerico)) {
          newData[field] = formatadorMoeda.format(valorNumerico)
        }
      }
    })

    return newData
  })
}
