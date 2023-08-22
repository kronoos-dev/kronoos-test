import { resolve } from "node:path";

import { CsvTransformUseCase } from "./application/use-cases/csv-transform/csv-transform.use-case";
import { CsvRepository } from "./infra/repositories/csv.repository";

async function run() {
  const csvParser = new CsvRepository();
  const csvTransformUseCase = new CsvTransformUseCase(csvParser);

  const csvFilePath = resolve(__dirname, "..", "data", "data.csv");

  const result = await csvTransformUseCase.handle(csvFilePath);

  if (result.isLeft()) {
    console.log(result.value);
  }

  if (result.isRight()) {
    console.log(result.value);
  }
}

run();
