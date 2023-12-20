export function parseDateString(dateString: string): Date {
  if (dateString.length !== 8) throw new Error("Invalid date string length");

  const year = Number(dateString.slice(0, 4));
  const month = Number(dateString.slice(4, 6)) - 1;
  const day = Number(dateString.slice(6, 8));

  if (isNaN(year) || isNaN(month) || isNaN(day))
    throw new Error("Invalid date string");

  if (year < 0) throw new Error("Invalid year value");

  if (month < 0 || month > 11) throw new Error("Invalid month value");

  if (day < 1 || day > 31) throw new Error("Invalid day value");

  return new Date(year, month, day);
}
