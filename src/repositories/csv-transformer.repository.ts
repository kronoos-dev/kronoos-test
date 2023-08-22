import { AsyncMaybe } from "../core/logic/Maybe";
import { AllContractClient } from "../infra/repositories/types/csv-type";

export abstract class CsvTransformerRepository {
  abstract handle(csv: string): AsyncMaybe<AllContractClient[]>;
}
