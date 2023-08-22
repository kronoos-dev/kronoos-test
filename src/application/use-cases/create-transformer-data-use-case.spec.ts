import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTransformerDataUseCase } from './create-transformer-data-use-case'
import { InMemoryFileTransformerRepositoryTest } from '../../tests/repositories/in-memory-file-transformer-test'
import { csvFileMock } from '../../tests/data-csv'


let inMemoryFileTransformerRepositoryTest: InMemoryFileTransformerRepositoryTest
let createTransformerDataUseCase: CreateTransformerDataUseCase

  describe('Case test',() => {

  beforeEach(async () => {
    inMemoryFileTransformerRepositoryTest = new InMemoryFileTransformerRepositoryTest()
    createTransformerDataUseCase = new CreateTransformerDataUseCase(inMemoryFileTransformerRepositoryTest)
  })

  it('Should be able read csv to array of objects with data values in the format real brazilian', async () => {
    const sut = await createTransformerDataUseCase.execute(csvFileMock)
    expect(sut[0].vlTotal).toContain('R$')
  })

  it('Should be able read csv to array of objects with data dates in the format Date object', async () => {
    const sut = await createTransformerDataUseCase.execute(csvFileMock)
    expect(sut[0].dtContrato).instanceOf(Date)
  })

  it('Should be able read csv to array of objects with data dates in the format Date object', async () => {
    const sut = await createTransformerDataUseCase.execute(csvFileMock)
    expect(sut[0].dtContrato).instanceOf(Date)
  })

  it('Should be able read csv to array of objects with filter in the CPF/CNPJ valid', async () => {
    const output = await createTransformerDataUseCase.execute(csvFileMock)
    const sut = output.filter((contractsData) => contractsData.nrCpfCnpjValid === 'Válido')
    expect(sut.length).toBeGreaterThan(0)
  })
  it('Should be able read csv to array of objects with filter in the CPF/CNPJ invalid', async () => {
    const output = await createTransformerDataUseCase.execute(csvFileMock)
    const sut = output.filter((contractsData) => contractsData.nrCpfCnpjValid === 'Inválido')
    expect(sut.length).toBeGreaterThan(0)
  })


  it('Should be able read csv to array of objects with filter in the prestation value valid', async () => {
    const output = await createTransformerDataUseCase.execute(csvFileMock)
    const sut = output.filter((contractsData) => contractsData.sitCalcPresta === 'Valor da prestação está correto')
    expect(sut.length).toBeGreaterThan(0)
  })

  it('Should be able read csv to array of objects with filter in the prestation value invalid', async () => {
    const output = await createTransformerDataUseCase.execute(csvFileMock)
    const sut = output.filter((contractsData) => contractsData.sitCalcPresta === 'Valor da prestação está incorreto')
    expect(sut.length).toBeGreaterThan(0)
  })

})