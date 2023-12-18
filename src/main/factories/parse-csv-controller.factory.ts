// Dependencies
import { ParseCsvController } from '../../presentation/controllers'
import { Controller } from '../../presentation/protocols'

// Handler
import { ParseCsvHandler } from '../../data/usecases'
 
// Controller factory
export const makeCsvParserController = (): Controller => {
  const controller = new ParseCsvController(new ParseCsvHandler())
  return controller
}
