import express from "express";
import bodyParser from "body-parser";
import csvRoutes from "./routes/csvRoutes"; // Importe o middleware 'upload'

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());

// Adicione outras rotas, se necessário

app.use("/api", csvRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
