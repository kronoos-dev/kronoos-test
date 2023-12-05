const { formatDate } = require('../src/utils/converters/date');

test('Formatar data válida para objeto Date', () => {
  const result = formatDate('20211205');
  expect(result).toEqual(new Date(2021, 11, 5)); 
});

test('Formatar outra data válida para objeto Date', () => {
  const result = formatDate('20220315');
  expect(result).toEqual(new Date(2022, 2, 15)); 
});

test('Formatar data no limite inferior para objeto Date', () => {
  const result = formatDate('00010101');
  expect(result).toEqual(new Date(1, 0, 1)); 
});

test('Formatar data no limite superior para objeto Date', () => {
  const result = formatDate('99991231');
  expect(result).toEqual(new Date(9999, 11, 31));
});