import { validateDocument } from './validateDocument';

describe('validateDocument', () => {
  test('deve retornar que o cpf é inválido, porque todos os dígitos são iguais', () => {
    const document = '11111111111';
    const isValid = validateDocument(document);
    expect(isValid).toBeFalsy();
  });

  test('deve retornar que o cpf é inválido, pois ele falhou no cálculo', () => {
    const document = '27891054798';
    const isValid = validateDocument(document);
    expect(isValid).toBeFalsy();
  });

  test('deve retornar que o cpf é valido, pois ele foi bem sucedido no cálculo', () => {
    const document = '64301096078';
    const isValid = validateDocument(document);
    expect(isValid).toBeTruthy();
  });

  test('deve retornar que o cnpj é inválido, porque todos os dígitos são iguais', () => {
    const document = '11111111111111';
    const isValid = validateDocument(document);
    expect(isValid).toBeFalsy();
  });

  test('deve retornar que o cnpj é inválido, pois ele falhou no cálculo', () => {
    const document = '23098576891345';
    const isValid = validateDocument(document);
    expect(isValid).toBeFalsy();
  });

  test('deve retornar que o cnpj é valido, pois ele foi bem sucedido no cálculo', () => {
    const document = '36288374000100';
    const isValid = validateDocument(document);
    expect(isValid).toBeTruthy();
  });
});