import { CurrencyConverter } from "../src/helpers/currencyConverter"

const makeSut = (): any => {
  const currencyConverter = new CurrencyConverter()

  return {
    currencyConverter
  }
}

describe('Currency Converter', () => {

  test('Should convert value to real', async () => {
    const { currencyConverter } = makeSut()

    const response = await currencyConverter.convert('0.99')

    expect(response).toContain("R$")
  })

  test('Should convert value to real with two decimals', async () => {
    const { currencyConverter } = makeSut()

    const response = await currencyConverter.convert('15.1515')

    expect(response).toEqual("R$15,15")
  })

  test('Should convert value to real with thousand separator', async () => {
    const { currencyConverter } = makeSut()

    const response = await currencyConverter.convert('40370.2')

    expect(response).toEqual("R$40.370,20")
  })
})