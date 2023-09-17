import { describe, expect, test } from '@jest/globals';

import InstallmentException from '../../src/Exceptions/InstallmentException';
import { validateInstallment } from '../../src/Utils/InstallmentValidator';

describe('Installment validator module', () =>
{
  test('Correct installment calculated', () =>
  {
    const firstTotal = 10000;
    const firstInstallments = 5;
    const firstInstallmentValue = 2000;

    expect(() => validateInstallment(firstTotal, firstInstallments, firstInstallmentValue)).not.toThrowError();

    const secondTotal = 87946.28;
    const secondInstallments = 13;
    const secondInstallmentValue = 6765.10; // 6765.098...
    expect(() => validateInstallment(secondTotal, secondInstallments, secondInstallmentValue)).not.toThrowError();
  });

  test('Incorrect installment calculated', () => {

    expect(() => validateInstallment(10000, 5, 0)).toThrowError(InstallmentException);

  });
});