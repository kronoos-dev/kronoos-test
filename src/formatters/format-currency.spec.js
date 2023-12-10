import { describe, expect, it, beforeEach } from 'vitest';
import { formatCurrency } from './format-currency';

describe('Formatter - Format currency', () => {
  let formatter;
  beforeEach(() => {
    formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  });

  it('should format value into BRL currency', async () => {
    const input = {
      value: '46000.90',
      field: 'vlTotal',
    }

    const result = formatCurrency(input.value, input.field, formatter);
    
    expect(result.length).toBe(1);
    expect(result[0]).toBe('R$ 46.000,90');
  });

  it('should not format invalid data and should register error', async () => {
    const input = {
      value: '46.000,90',
      field: 'vlTotal',
    }

    const result = formatCurrency(input.value, input.field, formatter);
    
    expect(result.length).toBe(2);
    expect(result[0]).toBe('46.000,90');
    expect(result[1]).toMatchObject({ field: 'vlTotal', message: 'Valor não é numérico' });
  });
});
