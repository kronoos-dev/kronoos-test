const { validateCPFOrCNPJ } = require(".");

describe('validateCPFOrCNPJ', () => {
  it('should correctly validate a valid CPF', () => {
    const result = validateCPFOrCNPJ('105.267.071-78');
    expect(result).toBe('CPF');
  });

  it('should correctly validate a valid CNPJ', () => {
    const result = validateCPFOrCNPJ('42.610.821/0001-90');
    expect(result).toBe('CNPJ');
  });

  it('should return "Inválido" for an invalid CPF or CNPJ', () => {
    const result = validateCPFOrCNPJ('123.456.789-00');
    expect(result).toBe('Inválido');
  });

  it('should return "Inválido" for an empty input', () => {
    const result = validateCPFOrCNPJ('');
    expect(result).toBe('Inválido');
  });

  it('should return "Inválido" for a non-numeric input', () => {
    const result = validateCPFOrCNPJ('abc');
    expect(result).toBe('Inválido');
  });

  it('should return "Inválido" for a partially valid input', () => {
    const result = validateCPFOrCNPJ('12.345.678-0001-90');
    expect(result).toBe('Inválido');
  });

});