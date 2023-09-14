import { Request, Response } from "express";
import { processCSV } from "../services/csvService";
import { checkIfRowExists, createCSVData, deleteAllCSVData, getAllCSVData, getCSVDataByPrimaryKeys, updateCSVData } from "../infra/csvRepository";

export const csvUpdateController = async (file: Express.Multer.File) => {
  try {
    if (!file) {
      throw new Error("O arquivo CSV não foi enviado no corpo da requisição.");
    }

    // Chame o serviço processCSV para processar o CSV
    const csvData = await processCSV(file.buffer); // Use file.buffer para acessar o conteúdo do arquivo

    // Percorra os dados CSV e atualize ou insira cada linha conforme necessário
    for (const row of csvData) {
      const { nrInst, nrAgencia, cdClient, nrContrato, ...restOfData } = row;

      //console.log("row-id", nrInst + nrAgencia + cdClient + nrContrato);
      // Verifique se uma linha com a mesma combinação de valores já existe
      const existingRow = await checkIfRowExists(nrInst, nrAgencia, cdClient, nrContrato);

      if (existingRow) {
        // Atualize os dados existentes
        await updateCSVData(nrInst, nrAgencia, cdClient, nrContrato, restOfData);
      } else {
        // Insira uma nova linha
        await createCSVData({ nrInst, nrAgencia, cdClient, nrContrato, ...restOfData });
      }
    }

    return "Dados atualizados com sucesso.";
  } catch (error) {
    console.error("Erro ao processar o CSV:", error);
    throw new Error("Ocorreu um erro ao processar o CSV.");
  }
};

export const getAllCSVDataController = async (req: Request, res: Response) => {
  try {
    // Chame a função que recupera todos os dados da tabela CSV
    const csvData = await getAllCSVData();

    // Envie os dados como resposta em formato JSON
    res.json(csvData);
  } catch (error) {
    console.error("Erro ao buscar os dados da tabela CSV:", error);
    res.status(500).json({ error: "Ocorreu um erro ao buscar os dados da tabela CSV." });
  }
};

export const deleteAllCSVDataController = async (req: Request, res: Response) => {
  try {
    // Chame a função que apaga todos os dados da tabela CSV
    await deleteAllCSVData();

    // Envie uma resposta de sucesso
    res.json({ message: "Todos os dados da tabela CSV foram excluídos com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir todos os dados da tabela CSV:", error);
    res.status(500).json({ error: "Ocorreu um erro ao excluir todos os dados da tabela CSV." });
  }
};
