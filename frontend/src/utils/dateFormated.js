export function formatDateYYYYMMDDToBR(dateString) {
  if (!dateString) return "";

  const year = dateString.substr(0, 4);
  const month = dateString.substr(4, 2) - 1;
  const day = dateString.substr(6, 2);

  const formattedDate = new Date(year, month, day);

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return formattedDate.toLocaleDateString("pt-BR", options);
}
