import { describe, expect, test } from '@jest/globals';

import { toJSDate } from '../../src/Utils/DateFormatter';
import DateException from '../../src/Exceptions/DateException';

describe('Date formatter module', () =>
{
  test('Format yyyymmdd date to JavaScript Date successfully', () =>
  {
    const first = '20230827';
    expect(toJSDate(first)).toBeInstanceOf(Date);

    const second = '19010114';
    expect(toJSDate(second)).toBeInstanceOf(Date);

    const third = '20501231';
    expect(toJSDate(third)).toBeInstanceOf(Date);
  });

  test('Throw exception when invalid format is given', () =>
  {
    const first = 'w';
    expect(() => toJSDate(first)).toThrowError(DateException);

    const second = '20233102';
    expect(() => toJSDate(second)).toThrowError(DateException);

    const third = '23011994';
    expect(() => toJSDate(third)).toThrowError(DateException);
  });
});