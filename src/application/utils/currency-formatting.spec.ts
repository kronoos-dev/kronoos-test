import { describe, expect, it } from "vitest";
import { CurrencyFormatting } from "./currency-formatting";

describe('Application Util Tests - Currency', () => {
  it('Should be able to transform value to real brazilian', () => {
    const value = '1500'
    const sut = CurrencyFormatting.formatToBRL(value)
    expect(sut).toContain('R$')
  })

  it('Should be able to split a value', () => {
    const value = '1500'
    const qtd = '3'
    const sut = CurrencyFormatting.divide(value,qtd)
    expect(sut).toEqual(500)
  })
})