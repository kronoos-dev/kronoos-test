import csvParser from "csv-parser";
import { createReadStream, ReadStream } from "fs";

import { CsvTransformerRepository } from "../../repositories/csv-transformer.repository";
import { AllContractClient } from "./types/csv-type";

export class CsvRepository extends CsvTransformerRepository {
  async handle(csvFilePath: string): Promise<AllContractClient[]> {
    return new Promise((resolve, reject) => {
      const results: AllContractClient[] = [];

      const readStream: ReadStream = createReadStream(csvFilePath);
      const csvStream = readStream.pipe(csvParser());

      csvStream
        .on("data", (data) => results.push(data))
        .on("end", () => {
          resolve(results);
        })
        .on("error", (err) => reject(err));
    });
  }
}
