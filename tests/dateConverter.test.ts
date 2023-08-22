import { DateConverter } from "../src/helpers/dateConverter"

const makeSut = (): any => {
  const dateConverter = new DateConverter()

  return {
    dateConverter
  }
}

describe('Date Converter', () => {

  test('Should returns a Date Object if is an valid date', async () => {
    const { dateConverter } = makeSut()

    const response = await dateConverter.convert('20230624')

    expect(response).toEqual(new Date(2023, 6, 24))
  })

  test('Should returns false if is an invalid date', async () => {
    const { dateConverter } = makeSut()

    const response = await dateConverter.convert('20231306')

    expect(response).toBe(false)
  })
})