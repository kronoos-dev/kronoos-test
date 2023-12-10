import { describe, expect, it } from 'vitest';
import { formatDate } from './format-date';

describe('Formatter - Format date', () => {
  it('should format value into Date', async () => {
    const input = {
      value: '20231206',
      field: 'dtVctPre',
    }

    const result = formatDate(input.value, input.field);
    
    expect(result.length).toBe(1);
    expect(result[0]).toMatchObject(new Date(2023, 11, 6));
  });

  it('should not format invalid value lenght and give error', async () => {
    const input = {
      value: '2021206',
      field: 'dtVctPre',
    }

    const result = formatDate(input.value, input.field);
    
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ field: 'dtVctPre', message: 'Data inválida' });
  });

  it('should not format invalid date value and give error', async () => {
    const input = {
      value: '2021243',
      field: 'dtVctPreCab',
    }

    const result = formatDate(input.value, input.field);
    
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ field: 'dtVctPreCab', message: 'Data inválida' });
  });
});
