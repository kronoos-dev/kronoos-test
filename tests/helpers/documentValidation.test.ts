import { DocumentValidation } from "../../src/helpers/documentValidation"

const makeSut = (): any => {
  const documentValidation = new DocumentValidation()

  return {
    documentValidation
  }
}

describe('Document Validation', () => {

  test('Should returns true if is an valid CNPJ', async () => {
    const { documentValidation } = makeSut()

    const response = await documentValidation.validate('21735046000129')

    expect(response).toBe(true)
  })

  test('Should returns true if is an valid CPF', async () => {
    const { documentValidation } = makeSut()

    const response = await documentValidation.validate('68516078086')

    expect(response).toBe(true)
  })

  test('Should returns false if is an invalid document number', async () => {
    const { documentValidation } = makeSut()

    const response = await documentValidation.validate('792608117956')

    expect(response).toBe(false)
  })
})