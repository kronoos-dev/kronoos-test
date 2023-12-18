import * as assert from 'assert'
import { parseCsvAsync } from '../../../src/presentation/utils'

describe('parseCsvAsync', () => {
  it('should parse a CSV file and return an array of objects', async () => {
    const filePath = 'tests/fixtures/test-csv.csv'
    const result = await parseCsvAsync(filePath)

    assert.strictEqual(Array.isArray(result), true)
    assert.strictEqual(result.length > 0, true)
  })

  it('should return an empty array for an empty CSV file', async () => {
    const filePath = 'tests/fixtures/test-csv-empty.csv'
    const result = await parseCsvAsync(filePath)

    assert.strictEqual(Array.isArray(result), true)
    assert.strictEqual(result.length, 0)
  })

  it('should reject the promise for a non-existent file', async () => {
    const filePath = 'tests/fixtures/inexistent.csv'

    try {
      await parseCsvAsync(filePath)
      // If the promise is not rejected, fail the test
      assert.fail('Expected promise to be rejected.')
    } catch (error: any) {
      // Assert that the error message contains 'ENOENT' indicating a non-existent file
      assert.strictEqual(error.message.includes('ENOENT'), true)
    }
  })
})