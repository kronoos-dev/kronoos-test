function convertToDateObject(dateString) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6) - 1; // Mês é base 0
    const day = dateString.substring(6, 8);
    return new Date(year, month, day);
  }
  
  const dtContratoString = "20230820"; 
  const dtVctPreString = "20230915";  
  
  const dtContrato = convertToDateObject(dtContratoString);
  const dtVctPre = convertToDateObject(dtVctPreString);
  
  console.log("Data de Contrato:", dtContrato);
  console.log("Data de Vencimento de Prestação:", dtVctPre);

module.exports = convertToDateObject