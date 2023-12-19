import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Aplicativo rodando na porta ${process.env.SERVER_PORT}`);
});
