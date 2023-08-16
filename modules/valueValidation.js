function validateValues(data) {
  data.forEach((row,index) => {
    if (row.vlPresta !== 0 && row.qtPrestacoes * row.vlPresta !== row.vlTotal) {
      console.log(
        `Erro na linha ${index + 1}: valor das prestações inconsistente`
      );
    }
  });
}

module.exports = { validateValues };
