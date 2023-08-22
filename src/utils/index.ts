import { format, parseISO } from "date-fns";

export function convertToBRL(row: string | any) {
    const rowParsed = Number(row);

    const result = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(rowParsed);

    return result;
};

export function formatDate(date: string) {
    const result = format(parseISO(date), "dd/MM/yyyy");

    return result;
};