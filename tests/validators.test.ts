import { validateCpfCnpj } from '../src';

describe('validateCpfCnpj - CPF', () => {
  test('Should return true for a valid cpf', () => {
    expect(validateCpfCnpj('88982114068')).toBeTruthy();
    expect(validateCpfCnpj('90977165000')).toBeTruthy();
    expect(validateCpfCnpj('75769177098')).toBeTruthy();
  });

  test('Should return true for a valid cpf with dots and dashes', () => {
    expect(validateCpfCnpj('814.324.140-89')).toBeTruthy();
    expect(validateCpfCnpj('157.626.160-37')).toBeTruthy();
    expect(validateCpfCnpj('919.348.960-98')).toBeTruthy();
  });

  test('Should return false for a invalid cpf', () => {
    expect(validateCpfCnpj('00000000000')).toBeFalsy();
    expect(validateCpfCnpj('11111111111')).toBeFalsy();
    expect(validateCpfCnpj('22222222222')).toBeFalsy();
  });

  test('Should return false for a invalid cpf with less characters', () => {
    expect(validateCpfCnpj('89609656')).toBeFalsy();
    expect(validateCpfCnpj('0473781409')).toBeFalsy();
    expect(validateCpfCnpj('1812509')).toBeFalsy();
  });
});

describe('validateCpfCnpj - CNPJ', () => {
  test('Should return true for a valid cnpj', () => {
    expect(validateCpfCnpj('05212216000134')).toBeTruthy();
    expect(validateCpfCnpj('05212216000134')).toBeTruthy();
    expect(validateCpfCnpj('95092413000150')).toBeTruthy();
  });

  test('Should return true for a valid cnpj with dots and dashes', () => {
    expect(validateCpfCnpj('95.669.301/0001-19')).toBeTruthy();
    expect(validateCpfCnpj('70.054.041/0001-46')).toBeTruthy();
    expect(validateCpfCnpj('92.835.632/0001-93')).toBeTruthy();
  });

  test('Should return false for a invalid cnpj', () => {
    expect(validateCpfCnpj('00000000000000')).toBeFalsy();
    expect(validateCpfCnpj('11111111111111')).toBeFalsy();
    expect(validateCpfCnpj('22222222222222')).toBeFalsy();
  });

  test('Should return false for a invalid cnpj with less characters', () => {
    expect(validateCpfCnpj('3052324600010')).toBeFalsy();
    expect(validateCpfCnpj('00323962001')).toBeFalsy();
    expect(validateCpfCnpj('9763994000016')).toBeFalsy();
  });
});
