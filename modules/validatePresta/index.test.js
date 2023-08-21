const { validatePresta } = require('.');

describe('validatePresta', () => {
  it('returns true if calculated installment matches provided value', () => {
    const vlTotal = 1000;
    const vlPresta = 200;
    const qtPrestacoes = 5;

    const result = validatePresta(vlTotal, vlPresta, qtPrestacoes);

    expect(result).toBe(true);
  });

  it('returns false if calculated installment does not match provided value', () => {
    const vlTotal = 1000;
    const vlPresta = 201; 
    const qtPrestacoes = 5;

    const result = validatePresta(vlTotal, vlPresta, qtPrestacoes);

    expect(result).toBe(false);
  });

  it('returns true when calculated installment is zero', () => {
    const vlTotal = 0;
    const vlPresta = 0;
    const qtPrestacoes = 5;

    const result = validatePresta(vlTotal, vlPresta, qtPrestacoes);

    expect(result).toBe(true);
  });

  it('returns true when number of installments is one', () => {
    const vlTotal = 100;
    const vlPresta = 100;
    const qtPrestacoes = 1;

    const result = validatePresta(vlTotal, vlPresta, qtPrestacoes);

    expect(result).toBe(true);
  });

  it('returns false when provided installment is negative', () => {
    const vlTotal = 1000;
    const vlPresta = -200;
    const qtPrestacoes = 5;

    const result = validatePresta(vlTotal, vlPresta, qtPrestacoes);

    expect(result).toBe(false);
  });
});