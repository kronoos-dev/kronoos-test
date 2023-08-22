import { describe, expect, it } from "vitest";
import { IdentiyFormmating } from "./identity-formatting";

describe('Application Util Tests - Identity', () => {
  it('Should be able to transform string cpf to cpf formatted', () => {
    const stringCPF = '38381261326'
    const sut = IdentiyFormmating.checkAndTransform(stringCPF)
    expect(sut).toContain('.')
    expect(sut).toContain('-')
  })
  it('Should be able to transform string cnpj to cnpj formatted', () => {
    const stringCNPJ = '33332010000118'
    const sut = IdentiyFormmating.checkAndTransform(stringCNPJ)
    expect(sut).toContain('.')
    expect(sut).toContain('/')
    expect(sut).toContain('-')
  })

})