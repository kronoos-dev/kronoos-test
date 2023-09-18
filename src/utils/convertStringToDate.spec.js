import { convertStringToDate } from './convertStringToDate';

describe('convertStringToDate', () => {
  it('deve converter uma string válida para um objeto Date', () => {
    const dateString = '20230918';
    const expectedDate = new Date(2023, 8, 18);
    expectedDate.setUTCHours(0);

    const result = convertStringToDate(dateString);
    expect(result).toEqual(expectedDate);
  });

  it('deve retornar uma Data inválida para uma string inválida', () => {
    const dateString = '2023-09-18';

    const result = convertStringToDate(dateString);
    expect(isNaN(result.getTime())).toBe(true);
  });
});
