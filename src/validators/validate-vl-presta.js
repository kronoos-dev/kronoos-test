
export const validateVlPresta = ({ vlTotal, qtPrestacoes, vlPresta }) => {
  try {
    const vlTotalNumber = Math.round(vlTotal * 100) / 100;
    const qtPrestacoesNumber = Number(qtPrestacoes);
    const vlPrestaNumber = Math.round(vlPresta * 100) / 100;

    const vlPrestaCalc = vlTotalNumber / qtPrestacoesNumber;
    const vlPrestaRounded = Math.round(vlPrestaCalc * 100) / 100;
    
    if (vlPrestaRounded !== vlPrestaNumber) {
      return { field: 'vlPresta', error: 'O valor da prestação está incorreto' };
    }
  } catch (error) {
    return { field: 'vlPresta', error: error.message };
  }
}
