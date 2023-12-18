import * as assert from 'assert'
import { formatDate } from '../../../src/presentation/utils'

describe('formatDate', () => {
  it('should format valid date string correctly', () => {
    const result = formatDate('20220101');
    assert.strictEqual(result, '01/01/2022');
  });

  it('should handle different valid date string', () => {
    const result = formatDate('20221231');
    assert.strictEqual(result, '31/12/2022');
  });

  it('should return an empty string for invalid date string length', () => {
    const result = formatDate('202201');
    assert.strictEqual(result, '');
  });

  it('should return an empty string for invalid date string format', () => {
    const result = formatDate('2022-01-01');
    assert.strictEqual(result, '');
  });
})