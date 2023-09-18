// Date is a string in the format YYYYMMDD and we want to convert it a Date object.
export const formatDate = (date: string): Date => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6);

  return new Date(`${year}-${month}-${day}`);
};