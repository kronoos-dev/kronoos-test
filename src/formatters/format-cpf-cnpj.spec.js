import { describe, expect, it, beforeEach } from 'vitest';
import { formatCpfCnpj } from './format-cpf-cnpj.js';

describe('Formatter - Format CPF/CNPJ', () => {
  it('should format value into CPF', async () => {
    const input = {
      value: '75009126136',
      field: 'fieldName',
    }

    const result = formatCpfCnpj(input.value, input.field);
    
    expect(result.length).toBe(1);
    expect(result[0]).toBe('750.091.261-36');
  });

  it('should format value into CNPJ', async () => {
    const input = {
      value: '50230433000155',
      field: 'fieldName',
    }

    const result = formatCpfCnpj(input.value, input.field);
    
    expect(result.length).toBe(1);
    expect(result[0]).toBe('50.230.433/0001-55');
  });

  it('should not format invalid data and should register error', async () => {
    const input = {
      value: '5023043300015',
      field: 'fieldName',
    }

    const result = formatCpfCnpj(input.value, input.field);
    
    expect(result.length).toBe(2);
    expect(result[0]).toBe('5023043300015');
    expect(result[1]).toMatchObject({ field: 'fieldName', message: 'CPF/CNPJ inválido' });
  });
});
