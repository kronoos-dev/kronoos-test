import { describe, expect, it } from 'vitest';
import { formatNumber } from './format-number';

describe('Formatter - Format number', () => {
  it('should format value into Number', async () => {
    const input = {
      value: '1000',
      field: 'fieldName',
    }

    const result = formatNumber(input.value, input.field);
    
    expect(result.length).toBe(1);
    expect(result[0]).toBe(1000);
  });

  it('should not format invalid value and should register error', async () => {
    const input = {
      value: '1000,50',
      field: 'fieldName',
    }

    const result = formatNumber(input.value, input.field);
    
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ field: 'fieldName', message: 'Valor não é numérico' });
  });
});
