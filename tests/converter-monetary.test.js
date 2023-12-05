const { formatToBrlCurrency } = require('../src/utils/converters/monetary');

test('Formatar número inteiro positivo para BRL', () => {
    const result = formatToBrlCurrency(1000);
    expect(result).toBe('R$ 1.000,00');
  });

  test('Formatar número de ponto flutuante para BRL', () => {
    const result = formatToBrlCurrency(1500.75);
    expect(result).toBe('R$ 1.500,75');
  });

  test('Formatar número negativo para BRL', () => {
    const result = formatToBrlCurrency(-500);
    expect(result).toBe('-R$ 500,00');
  });

  test('Formatar zero para BRL', () => {
    const result = formatToBrlCurrency(0);
    expect(result).toBe('R$ 0,00');
  });

  test('Formatar número grande para BRL', () => {
    const result = formatToBrlCurrency(9999999.99);
    expect(result).toBe('R$ 9.999.999,99');
  });
  