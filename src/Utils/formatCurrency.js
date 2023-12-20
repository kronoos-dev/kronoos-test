const { format: formatCurrency } = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  const formatarValores = (dados) => {
    // Formatando valores monetários
    dados.vlTotal = formatCurrency(Number(dados.vlTotal));
    dados.vlPresta = formatCurrency(Number(dados.vlPresta));
    dados.vlMora = formatCurrency(Number(dados.vlMora));
    dados.vlMulta = formatCurrency(Number(dados.vlMulta));
    dados.vlOutAcr = formatCurrency(Number(dados.vlOutAcr));
    dados.vlIof = formatCurrency(Number(dados.vlIof));
    dados.vlDescon = formatCurrency(Number(dados.vlDescon));
    dados.vlAtual = formatCurrency(Number(dados.vlAtual));
  
    // Dividindo vlTotal pela quantidade de prestações
    const valorPrestacaoCalculado = dados.vlTotal / Number(dados.qtPrestacoes);
    // Verificando se o resultado é igual a vlPresta
    if (valorPrestacaoCalculado !== Number(dados.vlPresta)) {
      console.error('Erro: Cálculo de prestação inconsistente.');
    }
  
    // Convertendo dtContrato e dtVctPre para objetos Date
    dados.dtContrato = formatarData(dados.dtContrato);
    dados.dtVctPre = formatarData(dados.dtVctPre);
  
    return dados;
  };
  
  const formatarData = (dataString) => {
    return new Date(dataString.substring(0, 4), dataString.substring(4, 6) - 1, dataString.substring(6, 8));
  };
  
  // Exemplo de uso
  const dadosFormatados = formatarValores({
    // ... Seus dados aqui
  });
  
  console.log(dadosFormatados);
  