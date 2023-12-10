import { describe, expect, it } from 'vitest';
import { validateVlPresta } from './validate-vl-presta';

describe('Validator - Validate vl presta', () => {
  it('should not return error with correct vl presta', async () => {
    const input = {
      vlPresta: '1000',
      vlTotal: '5000',
      qtPrestacoes: '5'
    }

    const result = validateVlPresta(input);
    
    expect(result).toBe(undefined);
  });

  it('should return error with incorrect vl presta', async () => {
    const input = {
      vlPresta: '1010',
      vlTotal: '5000',
      qtPrestacoes: '5'
    }

    const result = validateVlPresta(input);
    
    expect(result).toMatchObject({ field: 'vlPresta', error: 'O valor da prestação está incorreto' });
  });
});
