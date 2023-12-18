import * as assert from 'assert'
import { formatBRLCurrency } from '../../../src/presentation/utils'

const solveAscIISpaceProblem = (value: string) => value.replace(/\s+/g, ' ')

describe('formatBRLCurrency', () => {
  it('should format numbers to BRL currency', () => {
    assert.strictEqual(solveAscIISpaceProblem(formatBRLCurrency(1234.56)), 'R$ 1.234,56')
    assert.strictEqual(solveAscIISpaceProblem(formatBRLCurrency(0)), 'R$ 0,00')
    assert.strictEqual(solveAscIISpaceProblem(formatBRLCurrency(-1234.56)), '-R$ 1.234,56')
  })

  it('should handle string and number input equally', () => {
    assert.strictEqual(solveAscIISpaceProblem(formatBRLCurrency('1234.56')), 'R$ 1.234,56')
    assert.strictEqual(solveAscIISpaceProblem(formatBRLCurrency('0')), 'R$ 0,00')
    assert.strictEqual(solveAscIISpaceProblem(formatBRLCurrency('-1234.56')), '-R$ 1.234,56')
  })
})
