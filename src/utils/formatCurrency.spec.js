import { formatCurrency } from "./formatCurrency";

const getCurrency = (value) => {
  const numberFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return numberFormat.format(value);
}

describe('formatCurrency', () => {
  it('deve formatar um número como moeda brasileira', () => {
    const value = 1000;
    const formattedValue = formatCurrency(value);
    expect(formattedValue).toEqual(getCurrency(value));
  });

  it('deve formatar um número com casas decimais', () => {
    const value = 1234.56;
    const formattedValue = formatCurrency(value);
    expect(formattedValue).toEqual(getCurrency(value));
  });

  it('deve formatar um número com uma casa decimal', () => {
    const value = 1234.5; 
    const formattedValue = formatCurrency(value);
    expect(formattedValue).toEqual(getCurrency(value));
  });

  it('deve formatar um número com três casas decimais', () => {
    const value = 1234.56;
    const formattedValue = formatCurrency(value);
    expect(formattedValue).toEqual(getCurrency(value));
  });
});
