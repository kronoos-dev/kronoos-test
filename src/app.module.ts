import { Module } from '@nestjs/common'
import { CSVReaderUseCase } from './use-cases/csv/csv-reader.use-case'
import { CsvModule } from './modules/csv/csv.module'

@Module({
  imports: [CsvModule],
  providers: [CSVReaderUseCase],
})
export class AppModule {}
