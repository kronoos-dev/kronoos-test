const assert = require('assert');
const fs = require('fs/promises');
const { validateDocument, processCSV, formatToBRL, formatFields } = require('../src');

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

describe('CSV Processing', () => {
  it('should process a valid CSV file and return verified data', async () => {
    const testData = 'nrCpfCnpj,nrContrato,dtContrato,dtVctPre,vlAtual,vlMora,vlMulta,vlPresta\n' +
                     '12345678909,1,20221227,20221227,100,10,5,85\n';

    await fs.writeFile('tests/_mocks/test.csv', testData);

    const result = await processCSV('tests/_mocks/test.csv');
    assert.strictEqual(result.verified.length, 1);
    assert.strictEqual(result.inconsistent.length, 0);
    assert.strictEqual(result.verified[0].nrContrato, "1");
  });

  it('should handle inconsistent vlPresta and return inconsistent data', async () => {
    const testData = 'nrCpfCnpj,nrContrato,dtContrato,dtVctPre,vlAtual,vlMora,vlMulta,vlPresta\n' +
                     '12345678909,1,20220406,20220406,100,10,5,90';

    await fs.writeFile('tests/_mocks/test.csv', testData);

    const result = await processCSV('tests/_mocks/test.csv');
    assert.strictEqual(result.verified.length, 0);
    assert.strictEqual(result.inconsistent.length, 1);
    assert.strictEqual(result.inconsistent[0].nrContrato, "1");
  }, 6000);

  it('should handle inconsistent CPF/CNPJ and return inconsistent data', async () => {
    const testData = 'nrCpfCnpj,nrContrato,dtContrato,dtVctPre,vlAtual,vlMora,vlMulta,vlPresta\n' +
                     'invalidCPF,1,20221227,20221227,100,10,5,85\n';

    await fs.writeFile('tests/_mocks/test.csv', testData);

    const result = await processCSV('tests/_mocks/test.csv');
    assert.strictEqual(result.verified.length, 0);
    assert.strictEqual(result.invalidCpfCnpj.length, 1);
    assert.strictEqual(result.invalidCpfCnpj[0].nrContrato, '1');
  });

  it('should handle an empty CSV file and return an empty result', async () => {
    await fs.writeFile('tests/_mocks/empty.csv', '');

    const result = await processCSV('tests/_mocks/empty.csv');
    assert.strictEqual(result.verified.length, 0);
    assert.strictEqual(result.inconsistent.length, 0);
  });
});
