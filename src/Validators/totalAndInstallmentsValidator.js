function formatCurrencyValue(value) {
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return 'R$ ' + parts.join(',');
  }
  
  function validateTotalAndInstallments(data) {
    // Iterando sobre os dados e validando o valor total e prestações
    data.forEach((item) => {
      // Parse para float e replace para remover caracteres não numéricos
      const vlTotal = parseFloat(item.vlTotal.replace(/[^\d,]/g, '').replace(',', '.'));
  
      const qtPrestacoes = parseFloat(item.qtPrestacoes);
  
      if (!isNaN(vlTotal) && !isNaN(qtPrestacoes) && qtPrestacoes !== 0) {
        const valorPrestacaoCalculado = vlTotal / qtPrestacoes;
  
        // Formatando para o formato brasileiro
        const correctValue = formatCurrencyValue(valorPrestacaoCalculado.toFixed(2));
        const isValid = valorPrestacaoCalculado === parseFloat(item.vlPresta.replace(/[^\d.,]/g, '').replace(',', '.'))
  
        item.vlPresta = (`${item.vlPresta} é ${isValid? "válido!": "inválido, o valor correto é:"} ${isValid? "": correctValue}`)

      } else {
        // Se houver algum problema com os dados, 
        item.vlPresta = "dados inválidos"
      }
    });
  }
  
  module.exports = {
    validateTotalAndInstallments,
  };
  