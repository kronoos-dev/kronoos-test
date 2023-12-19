const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  
  function formatCurrency(data) {
    // Iteradando os valores monetários
    data.forEach((item) => {
      item.vlTotal = formatter.format(item.vlTotal);
      item.vlPresta = formatter.format(item.vlPresta);
      item.vlMora = formatter.format(item.vlMora);
      item.vlMulta = formatter.format(item.vlMulta);
      item.vlOutAcr = formatter.format(item.vlOutAcr);
      item.vlIof = formatter.format(item.vlIof);
      item.vlDescon = formatter.format(item.vlDescon);
      item.vlAtual = formatter.format(item.vlAtual);
    });
  }
  
  module.exports = {
    formatCurrency,
  };
  