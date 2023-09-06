import { formatToDate } from '../src';
import { formatToCpfCnpj } from '../src/formaters';

describe('formatToDate', () => {
  test('Should format a valid string date to a Date', () => {
    const dateFromData = '20230906';

    expect(formatToDate(dateFromData).toString()).toBe(
      new Date('2023-09-06T00:00:00.000Z').toString(),
    );
    expect(formatToDate(dateFromData)).toBeInstanceOf(Date);
  });
});

describe('formatToCpfCnpj', () => {
  test('Should format a valid string to a cpf format', () => {
    const cpf = '47013548057';

    expect(formatToCpfCnpj(cpf)).toBe('470.135.480-57');
  });
  test('Should format a valid string to a cnpj format', () => {
    const cnpj = '05418956000121';

    expect(formatToCpfCnpj(cnpj)).toBe('05.418.956/0001-21');
  });
});
