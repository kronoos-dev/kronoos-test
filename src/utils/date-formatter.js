export default function dateFormatter(original_date) {
  // Verifica se a entrada é uma string válida com 8 dígitos.
  if (/^\d{8}$/.test(original_date)) {
    const year = original_date.slice(0, 4);
    const month = original_date.slice(4, 6);
    const day = original_date.slice(6, 8);

    // Formata a data no formato brasileiro (DD/MM/YYYY).
    const dataFormatada = `${day}/${month}/${year}`;

    return dataFormatada;
  } else {
    return 'Data inválida';
  }
}
