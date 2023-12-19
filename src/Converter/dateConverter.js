function convertDates(data) {
    // Iterando data 
    data.forEach((item) => {
      // Convertendo dtContrato
      const dtContrato = new Date(item.dtContrato.substring(0, 4), item.dtContrato.substring(4, 6) - 1, item.dtContrato.substring(6, 8));
      item.dtContrato = formatDate(dtContrato);
  
      // Convertendo dtVctPre
      const dtVctPre = new Date(item.dtVctPre.substring(0, 4), item.dtVctPre.substring(4, 6) - 1, item.dtVctPre.substring(6, 8));
      item.dtVctPre = formatDate(dtVctPre);
  
    });
  }
  
  // Formatando para "DD/MM/YYYY"
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
  module.exports = {
    convertDates,
  };
  