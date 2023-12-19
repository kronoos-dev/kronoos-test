import fs from "fs";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import * as path from "path";

export async function readCSV(nomeArquivo) {
  const results = [];

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fullPathFile = path.join(__dirname, nomeArquivo);

    const readFile = () => {
      return new Promise((resolve, reject) => {
        const stream = fs
          .createReadStream(fullPathFile)
          .pipe(csv())
          .on("data", (row) => {
            results.push(row);
          })
          .on("end", () => {
            console.log("Informações do arquivo CSV:");
            //console.log(results);
            resolve(results);
          })
          .on("error", (error) => {
            reject(error);
          });
      });
    };

    return await readFile();
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    return [];
  }
}
