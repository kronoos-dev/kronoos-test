import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { SqliteDatabase } from "./database/sqliteDatabase";
import services from "./services";
import { Data } from "./model/Data";
import dataRouter from "./routes/getData";

dotenv.config();

async function initApp() {
  console.log("Lendo arquivo CSV...");
  const csvData = await services.parseCSV("./src/data/data.csv");
  console.log("Iniciando banco de dados...");
  const db = await SqliteDatabase.getInstance();
  console.log("Inserindo dados no banco...");

  await Promise.all(
    csvData.map(async (data) => {
      await db.insertData(data as Data);
    }),
  );

  console.log("Iniciando servidor...");
  const app = express();

  app.use(cors());
  app.use(helmet());

  app.use("/data", dataRouter);
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.SERVER_PORT}`);
  });
}

initApp();
