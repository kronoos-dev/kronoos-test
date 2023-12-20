import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { SqliteDatabase } from "./database/sqliteDatabase";
import { parseCSV } from "./services/parseCsv";
import { Data } from "./model/Data";

dotenv.config();

async function initApp() {
  console.log("Lendo arquivo CSV...");
  const csvData = await parseCSV("./src/data/data.csv");
  console.log("Iniciando banco de dados...");
  const db = new SqliteDatabase();
  console.log("Inserindo dados no banco...");
  csvData.forEach(async (data) => {
    await db.insertData(data as Data);
  });
  console.log("Iniciando servidor...");
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.SERVER_PORT}`);
  });
}

initApp();
