import { Data } from "../model/Data";

export interface Database {
  getData(): Promise<Data[]>;
  insertData(data: Data): Promise<void>;
}
