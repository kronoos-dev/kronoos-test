export function formatToDate(date: string): Date {
  const year = parseInt(date.substring(0, 4));
  const month = parseInt(date.substring(4, 6)) - 1;
  const day = parseInt(date.substring(6, 8));
  let newDate = new Date();

  newDate.setFullYear(year, month, day);
  newDate.setUTCHours(0, 0, 0, 0);

  return newDate;
}

export function formatToCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatToCpfCnpj(value: string) {
  const justNumbers = value.replace(/\D/g, '');

  if (justNumbers.length === 11) {
    return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  if (justNumbers.length === 14) {
    return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  return value;
}
