import lodash from 'lodash';

export const formatNumber = (value, field) => {
  const number = Number(value);
  if (lodash.isNaN(number)) {
    return [value, { field, message: 'Valor não é numérico' }];
  }
  return [number];
}