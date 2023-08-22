import path from 'node:path'

import { ImplementFileTransformerRepository } from "./infra/repositories/implement-file-transformer-repository"
import { CreateTransformerDataUseCase } from './application/use-cases/create-transformer-data-use-case'

const implementFileTransformerRepository = new ImplementFileTransformerRepository()
const createTransformerDataUseCase = new CreateTransformerDataUseCase(implementFileTransformerRepository)
const file = path.join('.','data.csv')
createTransformerDataUseCase.execute(file).then((data) => console.log(data[0]))