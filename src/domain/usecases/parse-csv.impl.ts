import { CsvModel } from '../models'

export interface ParseCsv {
  parse: (data: ParseCsv.Params) => Promise<{
    formattedData: any[]
  }>
}

export namespace ParseCsv {
  export type Params = {
    csvData: CsvModel[]
  }
}
