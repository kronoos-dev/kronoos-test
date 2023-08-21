const { convertToDate } = require('.');

describe('convertToDate', () => {
  it('should correctly convert a valid date string to a Date object', () => {
    const dateString = '20230821';
    const result = convertToDate(dateString);
    expect(result).toEqual(new Date(Date.UTC(2023, 7, 21, 0, 0, 0, 0))); 
  });

  it('should correctly handle a date string with a different month and day', () => {
    const dateString = '20211225';
    const result = convertToDate(dateString);
    expect(result).toEqual(new Date(Date.UTC(2021, 11, 25, 0, 0, 0, 0))); 
  });

  it('should correctly handle a date string with leading zeros', () => {
    const dateString = '20230505';
    const result = convertToDate(dateString);
    expect(result).toEqual(new Date(Date.UTC(2023, 4, 5, 0, 0, 0, 0))); 
  });

  it('should correctly handle a date string from a different year', () => {
    const dateString = '20301110';
    const result = convertToDate(dateString);
    expect(result).toEqual(new Date(Date.UTC(2030, 10, 10, 0, 0, 0, 0))); 
  });

  it('should return Invalid Date for an invalid date string', () => {
    const dateString = '20231345'; // Invalid month and day
    const result = convertToDate(dateString);
    expect(result.toString()).toBe('Invalid Date');
  });

  it('should return Invalid Date for an empty date string', () => {
    const dateString = '';
    const result = convertToDate(dateString);
    expect(result.toString()).toBe('Invalid Date');
  });
});