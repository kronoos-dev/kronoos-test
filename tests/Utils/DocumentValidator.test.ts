import { describe, expect, test } from '@jest/globals';

import DocumentException from '../../src/Exceptions/DocumentException';
import { validateDocument } from '../../src/Utils/DocumentValidator';

describe('Document validator module', () =>
{
  test('Correct document inserted', () =>
  {
    const validFormattedCPF = '415.093.110-09';
    expect(() => validateDocument(validFormattedCPF)).not.toThrowError();

    const validUnformattedCPF = '41509311009';
    expect(() => validateDocument(validUnformattedCPF)).not.toThrowError();

    const validFormattedCNPJ = '25.038.646/0001-99';
    expect(() => validateDocument(validFormattedCNPJ)).not.toThrowError();

    const validUnformattedCNPJ = '25038646000199';
    expect(() => validateDocument(validUnformattedCNPJ)).not.toThrowError();
  });

  test('Incorrect document inserted', () =>
  {
    const invalidFormattedCPF = '111.111.111-11';
    expect(() => validateDocument(invalidFormattedCPF)).toThrowError(DocumentException);

    const invalidUnformattedCPF = '11111111111';
    expect(() => validateDocument(invalidUnformattedCPF)).toThrowError(DocumentException);

    const invalidFormattedCNPJ = '11.111.111/1111-11';
    expect(() => validateDocument(invalidFormattedCNPJ)).toThrowError(DocumentException);

    const invalidUnformattedCNPJ = '11111111111111';
    expect(() => validateDocument(invalidUnformattedCNPJ)).toThrowError(DocumentException);
  });
});