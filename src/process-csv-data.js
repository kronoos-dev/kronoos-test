import fs from "fs";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import * as path from "path";

export async function lerCSV(nomeArquivo) {
  const resultados = [];

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const caminhoCompleto = path.join(__dirname, nomeArquivo);

    const lerArquivo = () => {
      return new Promise((resolve, reject) => {
        const stream = fs
          .createReadStream(caminhoCompleto)
          .pipe(csv())
          .on("data", (row) => {
            // Processa cada linha do arquivo CSV
            resultados.push(row);
          })
          .on("end", () => {
            // Ao finalizar a leitura do arquivo, resolve a Promise com os resultados
            console.log("Dados do arquivo CSV:");
            //console.log(resultados);
            resolve(resultados);
          })
          .on("error", (error) => {
            // Em caso de erro na leitura, rejeita a Promise
            reject(error);
          });
      });
    };

    return await lerArquivo();
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    return [];
  }
}
