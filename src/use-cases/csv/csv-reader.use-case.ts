import readCsv from '../../services/csv/csv-reader.service'

interface CSVRow {
  [key: string]: string | undefined
}

export class CSVReaderUseCase {
  async execute(): Promise<CSVRow[]> {
    try {
      const dataArray = await readCsv()

      return dataArray
    } catch (error) {
      console.error('Erro ao executar o Use Case:', error)
      throw error
    }
  }
}
