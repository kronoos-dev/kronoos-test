import { describe, expect, test } from '@jest/globals';

import { formatMoneyToBRL } from '../../src/Utils/MoneyFormatter';

describe('Money formatter module', () =>
{
  test('Format number to BRL', () =>
  {
    const first = 12987.14;
    expect(formatMoneyToBRL(first)).toBe('R$ 12.987,14');

    const second = 987;
    expect(formatMoneyToBRL(second)).toBe('R$ 987,00');

    const third = 0;
    expect(formatMoneyToBRL(third)).toBe('R$ 0,00');

    const fourth = 1427832.99;
    expect(formatMoneyToBRL(fourth)).toBe('R$ 1.427.832,99');
  });
});