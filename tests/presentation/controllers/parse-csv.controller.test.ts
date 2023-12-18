import * as assert from 'assert'
import * as path from 'path'
import { ParseCsvController } from '../../../src/presentation/controllers'

describe('ParseCsvController', () => {
  it('should handle CSV file and return formatted data', async () => {
    // Mock Express Multer file
    const mockFile = {
      path: path.join(__dirname, '../../../tests/fixtures/test-csv.csv'),
      mimetype: 'text/csv',
    } as Express.Multer.File

    // Mock ParseCsv implementation
    const mockParseCsv = {
      parse: async () => ({ formattedData: [] })
    }

    // Initialize the controller with the mock ParseCsv
    const controller = new ParseCsvController(mockParseCsv)

    // Mock Express request object
    const req = { file: mockFile }

    // Make the request to the controller
    const response = await controller.handle(req as any)

    // Assert the response
    assert.strictEqual(response.statusCode, 200)
    assert.deepEqual(response.body, [])
    assert.strictEqual(response.error, undefined)
  })
})
