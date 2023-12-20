import { Controller, Get } from '@nestjs/common'
import { CSVReaderUseCase } from '../../use-cases/csv/csv-reader.use-case'
import { formatedValuesMoney } from '../../shared/helpers/csv/formats'
import { validatedCpfOrCnpj } from '../../shared/helpers/csv/validations'

@Controller('csv')
export class CsvController {
  constructor(private readonly csvReaderUseCase: CSVReaderUseCase) {}

  @Get()
  public async getAllDataCsv(): Promise<any[]> {
    try {
      const dataArray = await this.csvReaderUseCase.execute()
      return dataArray
    } catch (error) {
      console.error('Error controller:', error)
      throw error
    }
  }

  @Get('/formatted-values')
  public async formatedValuesMoney(): Promise<any[]> {
    try {
      const dataArray = await this.csvReaderUseCase.execute()

      const dataFormated = formatedValuesMoney(dataArray)

      return dataFormated
    } catch (error) {
      console.error('Error controller:', error)
      throw error
    }
  }

  @Get('/validate-document')
  public async validateCpfOrCnpjIsValid(): Promise<any[]> {
    try {
      const dataArray = await this.csvReaderUseCase.execute()

      const { arrayDataDocumentsValid } = validatedCpfOrCnpj(dataArray)

      return arrayDataDocumentsValid
    } catch (error) {
      console.error('Error controller:', error)
      throw error
    }
  }
}
