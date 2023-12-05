const formatDate = (dataString) => {
    const ano = dataString.substr(0, 4);
    const mes = dataString.substr(4, 2) - 1;
    const dia = dataString.substr(6, 2);
    const dataFormatada = new Date(ano, mes, dia);
    return dataFormatada;
  };

  module.exports = { formatDate };