const assert = require('assert');
const fs = require('fs/promises');
const { validateDocument, formatToBRL, formatFields } = require('../src');

describe('Document Validation', () => {
  it('should return true for a valid CPF', () => {
    assert.strictEqual(validateDocument('123.456.789-09'), true);
  });

  it('should return true for a valid CNPJ', () => {
    assert.strictEqual(validateDocument('87.361.813/7161-74'), true);
  });

  it('should return false for an invalid CPF', () => {
    assert.strictEqual(validateDocument('123.456.789-01'), false);
  });

  it('should return false for an invalid CNPJ', () => {
    assert.strictEqual(validateDocument('12.345.678/0001-99'), false);
  });

  it('should return false for an empty document', () => {
    assert.strictEqual(validateDocument(''), false);
  });

  it('should return false for a null document', () => {
    assert.strictEqual(validateDocument(null), false);
  });

  it('should return false for an invalid CPF with letters', () => {
    assert.strictEqual(validateDocument('ABC.456.789-09'), false);
  });

  it('should return false for 11 consecutive identical digits in CPF', () => {
    const invalidCPF = '11111111111';
    assert.strictEqual(validateDocument(invalidCPF), false);
  });

  it('should return false for 14 consecutive identical digits in CNPJ', () => {
    const invalidCNPJ = '11111111111111';
    assert.strictEqual(validateDocument(invalidCNPJ), false);
  });

  it('should return false when result is not equal to document.charAt(12)', () => {
    const invalidDocument = '1234567890123'; // Supondo que o resultado correto para esse documento seja diferente de 8
    assert.strictEqual(validateDocument(invalidDocument), false);
  });

  it('should return false for an invalid CNPJ with letters', () => {
    assert.strictEqual(validateDocument('AB.345.678/0001-90'), false);
  });

  it('should return false for a short string', () => {
    assert.strictEqual(validateDocument('123'), false);
  });

  it('should return false for a long string', () => {
    assert.strictEqual(validateDocument('12345678901234567890'), false);
  });
});

describe('formatToBRL', () => {
  it('should format a positive value as BRL currency', () => {
    const result = formatToBRL(1234.56);
    expect(result).toBe('R$ 1.234,56');
  });

  it('should format a negative value as BRL currency', () => {
    const result = formatToBRL(-7890.12);
    expect(result).toEqual('R$ -7.890,12');
  });

  it('should format zero as BRL currency', () => {
    const result = formatToBRL(0);
    expect(result).toEqual('R$ 0,00');
  });
});

describe('formatFields', () => {
  const mockRow = {
    dtContrato: '20231201',
    dtVctPre: '20231231',
    vlTotal: 1234.56,
    vlPresta: 789.01,
    vlMora: 45.67,
  };

  it('should format date and currency fields in a data row', () => {
    const result = formatFields(mockRow);

    expect(result.dtContrato instanceof Date).toBe(true);
    expect(result.dtVctPre instanceof Date).toBe(true);
    expect(result.vlTotal).toEqual('R$ 1.234,56');
    expect(result.vlPresta).toEqual('R$ 789,01');
    expect(result.vlMora).toEqual('R$ 45,67');
  });

  it('should not modify other properties in the data row', () => {
    const result = formatFields(mockRow);

    expect(result.otherProperty).toBe(mockRow.otherProperty);
  });
});