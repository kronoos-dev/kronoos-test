import { Module } from '@nestjs/common'
import { CsvController } from '../../controllers/csv/csv.controller'
import { CSVReaderUseCase } from '../../use-cases/csv/csv-reader.use-case'

const useCases = [CSVReaderUseCase]

@Module({
  controllers: [CsvController],
  providers: [...useCases],
  exports: [...useCases],
})
export class CsvModule {}
