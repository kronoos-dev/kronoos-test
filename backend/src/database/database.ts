import { Data } from "../model/Data";

export interface Database {
  getData(params: {
    page: number;
    pageSize: number;
    orderBy: string;
    order: "ASC" | "DESC";
  }): Promise<Data[]>;
  insertData(data: Data): Promise<void>;
}
