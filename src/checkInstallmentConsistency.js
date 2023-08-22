export function checkInstallmentConsistency(dataArray) {
  const consistentData = dataArray.filter((row) => {
    const vlTotal = parseFloat(row.vlTotal.replace(/[^0-9.-]/g, ""));
    const vlPresta = parseFloat(row.vlPresta.replace(/[^0-9.-]/g, ""));
    const qtPrestacoes = parseInt(row.qtPrestacoes, 10);

    const calculatedVlPresta = vlTotal / qtPrestacoes;

    return Math.abs(calculatedVlPresta - vlPresta) < 1;
  });

  return consistentData;
}
