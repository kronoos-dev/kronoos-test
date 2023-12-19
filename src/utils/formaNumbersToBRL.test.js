const formatToBRL = require('./formaNumbersToBRL'); 

const { describe, test, expect } = require('@jest/globals');


describe('formatToBRL', () => {
    test('should format number to BRL currency format', () => {
      expect(formatToBRL(1234.56)).toBe('R$\u00A01.234,56');
      expect(formatToBRL(1000)).toBe('R$\u00A01.000,00');
      expect(formatToBRL(0.99)).toBe('R$\u00A00,99');
      expect(formatToBRL(9999999.99)).toBe('R$\u00A09.999.999,99');
    });
  });
  