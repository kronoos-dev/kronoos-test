import { Router } from "express";
import multer from "multer";
import { csvUpdateController, deleteAllCSVDataController, getAllCSVDataController } from "../controllers/csvController";

const router = Router();

// Configuração do multer
const storage = multer.memoryStorage(); // Armazene os arquivos em memória
const upload = multer({ storage: storage });

router.post("/uploadCsv", upload.single("csv"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "O arquivo CSV não foi enviado no corpo da requisição." });
    }

    console.log(req.file); // req.file conterá o arquivo enviado

    const csvData = await csvUpdateController(req.file); // Passe req.file para csvController
    res.json(csvData);
  } catch (error) {
    console.error("Erro interno:", error);
    res.status(500).json({ error: "Erro interno" });
  }
});

router.delete("/deleteCsv", deleteAllCSVDataController);

router.get("/getCsv", getAllCSVDataController);

export default router;

export { upload };
