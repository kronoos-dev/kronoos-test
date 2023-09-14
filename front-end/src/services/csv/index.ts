import axios from "axios";
import { CsvType } from "../../features/Home/types";

// Defina a URL da sua API
const apiUrl = "http://localhost:4000/api/"; // Substitua pela URL correta

// Função para enviar um arquivo CSV para a API
export async function GetData(): Promise<CsvType[]> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${apiUrl}getCsv`);

    return response.data as CsvType[];
  } catch (error) {
    throw error;
  }
}

export async function uploadCsv(file: File): Promise<CsvType[]> {
  const formData = new FormData();
  formData.append("csv", file);

  console.log("Form Data:", formData);
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${apiUrl}uploadCsv`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data as CsvType[];
  } catch (error) {
    throw error;
  }
}

export async function DeleteCsv() {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.delete(`${apiUrl}deleteCsv`);

    return response.data;
  } catch (error) {
    throw error;
  }
}
