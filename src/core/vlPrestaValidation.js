const vlPrestaValidation = (vlPresta, qtPrestacoes, vlTotal) => {
  if (
    !/^\d+$/.test(vlPresta) ||
    !/^\d+$/.test(qtPrestacoes) ||
    !/^\d+$/.test(vlTotal)
  )
    return false

  const vlPrestaNum = Number(vlPresta)
  const qtPrestacoesNum = Number(qtPrestacoes)
  const vlTotalNum = Number(vlTotal)

  if (vlTotalNum / qtPrestacoesNum == vlPrestaNum) return vlTotal

  return false
}

module.exports = vlPrestaValidation
