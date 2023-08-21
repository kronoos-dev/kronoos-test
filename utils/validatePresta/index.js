const validatePresta = (vlTotal, vlPresta, qtPrestacoes) => {
  const calculatedPresta = vlTotal / qtPrestacoes;
  return calculatedPresta === vlPresta;
};

module.exports = { validatePresta };