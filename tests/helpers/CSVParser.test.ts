import { CSVParser } from "../../src/helpers/CSVParser"

const makeSut = (): any => {
  const csvParser = new CSVParser()

  return {
    csvParser
  }
}

describe('CSV Parser', () => {
  test('Should call csvParser with correct path', () => {
    const { csvParser } = makeSut()
    const csvParserSpy = jest.spyOn(csvParser, 'convert')

    csvParser.convert("./data.csv")

    expect(csvParserSpy).toHaveBeenCalledWith("./data.csv")

  })

  test('Should convert sheet to data array', async () => {
    const { csvParser } = makeSut()

    const response = await csvParser.convert("./data.csv")

    expect(response).toBeTruthy()
    expect(response).toBeInstanceOf(Array)
  })
})