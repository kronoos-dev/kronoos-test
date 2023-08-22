import { InstallmentValueValidation } from "../src/helpers/installmentValueValidation"

const makeSut = (): any => {
  const installmentValueValidation = new InstallmentValueValidation()

  return {
    installmentValueValidation
  }
}

describe('Installment Validation', () => {

  test('Should returns the same installment if value is correct', async () => {
    const { installmentValueValidation } = makeSut()

    const response = await installmentValueValidation.validate(450, 5, 90)

    expect(response).toBe(90)
  })

  test('Should returns correct installment value if value is incorrect', async () => {
    const { installmentValueValidation } = makeSut()

    const response = await installmentValueValidation.validate(450, 5, 70)

    expect(response).toBe(90)
  })
})