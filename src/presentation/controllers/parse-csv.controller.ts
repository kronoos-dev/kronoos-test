// Dependencies
import { Controller, HttpResponse } from '../protocols'
import { badRequest, ok, serverError } from '../helpers'
import { parseCsvAsync } from '../utils'
import { CsvModel} from '../../domain/models'
import { ParseCsv } from '../../domain/usecases'

// Parse csv controller
export class ParseCsvController implements Controller {
  constructor(
    private readonly parseCsv: ParseCsv
  ) {}

  async handle(request: ParseCsvController.Request): Promise<HttpResponse> {
    try {
      // Verify if CSV file was received
      if (!request.file) {
        return badRequest(new Error('CSV File not found'))
      }

      // Verify if uploaded file is from csv type
      if (request.file.mimetype !== 'text/csv') {
        return badRequest(new Error('Attached file must be a csv file'))
      }

      // parse CSV data to a typescript array
      const csvData = await parseCsvAsync<CsvModel>(request.file.path)

      // Procced to handler
      const res = await this.parseCsv.parse({ csvData })

      // Return formatted data
      return ok(res.formattedData)

    } catch (err) {
      return serverError(err as Error)
    }
  }
}

export namespace ParseCsvController {
  export type Request = {
    file?: Express.Multer.File
  }
}
