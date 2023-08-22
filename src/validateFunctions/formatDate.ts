export default function formatDate(date: string): Date {
  const yearContract = parseInt(date.substring(0, 4));
  const monthContract = parseInt(date.substring(4, 6)) - 1;
  const dayContract = parseInt(date.substring(6, 8));
  return new Date(yearContract, monthContract, dayContract);
}
