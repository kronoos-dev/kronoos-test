import lodash from 'lodash';

export const formatCurrency = (value, field, formatter) => {
  if (lodash.isNaN(Number(value))) {
    return [value, { field, message: 'Valor não é numérico' }];
  }
  return [formatter.format(value)];
}
