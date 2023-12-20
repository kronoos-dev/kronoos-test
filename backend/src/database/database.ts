import { Data } from "../model/Data";

export interface Database {
  getData(params: {
    page: number;
    pageSize: number;
    orderBy: string;
    order: "ASC" | "DESC";
  }): Promise<{ rows: Data[]; pageCount: number }>;
  insertData(data: Data): Promise<void>;
}
