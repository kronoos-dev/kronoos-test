export function formatCurrency(value: string) {
    if (!value) {
        return 'R$ 0';
    }
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(Number(value));
}