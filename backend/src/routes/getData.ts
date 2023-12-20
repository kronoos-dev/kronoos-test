import express from "express";
import z from "zod";
import { SqliteDatabase } from "../database/sqliteDatabase";

const router = express.Router();

const dataRouteRequest = z.object({
  page: z.coerce.number(),
  pageSize: z.coerce.number(),
  orderBy: z.string(),
  order: z.enum(["ASC", "DESC"]),
});

router.get("/", async (req, res) => {
  const params = req.query;
  try {
    const validatedParams = await dataRouteRequest.parseAsync(params);
    const db = await SqliteDatabase.getInstance();
    const data = await db.getData(validatedParams);
    res.json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "Erro desconhecido" });
    }
  }
});

export default router;
