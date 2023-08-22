import { InputClientContract } from "./types/client-contract-type";

export abstract class FileTransformerRepository{
  abstract transformFromCsvToArray(source: any): Promise<InputClientContract[]>
}