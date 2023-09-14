import { useQuery } from "react-query";
import { CsvType } from "../../types";
import { GetData } from "../../../../services/csv";

export const useCsvData = () => {
  return useQuery<CsvType[], Error>("csvData", async () => {
    try {
      const response = await GetData();
      return response;
    } catch (error) {
      throw new Error("Falha ao buscar os dados CSV.");
    }
  });
};
