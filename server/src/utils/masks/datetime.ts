export function maskDatetime(date: string) {

  const year = parseInt(date.substring(0, 4));
  const month = parseInt(date.substring(4, 6));
  const day = parseInt(date.substring(6, 8));

  const dateFormated = new Intl.DateTimeFormat("pt-BR")
    .format(new Date(year, month, day));

  return dateFormated;
  
}