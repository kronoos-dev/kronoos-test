const { formatCurrency } = require('.'); 

describe('formatCurrency', () => {
  it('should format a positive currency value with two decimal places', () => {
    const result = formatCurrency(1000.25);
    expect(result).toMatch(/^R\$\s\d{1,3}(?:\.\d{3})*(?:,\d{2,3})?$/);
  });

  it('should format a currency value with no fractional part', () => {
    const result = formatCurrency(750);
    expect(result).toMatch(/^R\$\s\d{1,3}(?:\.\d{3})*(?:,\d{2,3})?$/);
  });

  it('should format a currency value with three decimal places', () => {
    const result = formatCurrency(1234.567);
    expect(result).toMatch(/^R\$\s\d{1,3}(?:\.\d{3})*(?:,\d{2,3})?$/);
  });

  it('should format a zero currency value', () => {
    const result = formatCurrency(0);
    expect(result).toMatch(/^R\$\s\d{1,3}(?:\.\d{3})*(?:,\d{2,3})?$/);
  });

  it('should format a large currency value with two decimal places', () => {
    const result = formatCurrency(1000000.99);
    expect(result).toMatch(/^R\$\s\d{1,3}(?:\.\d{3})*(?:,\d{2,3})?$/);
  });
});
