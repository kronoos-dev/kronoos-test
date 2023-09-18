import { Request, Response } from "express";
import { KronoosService } from "../services/KronoosService";

export class KronoosController {
  private readonly kronoosService: KronoosService;

  constructor() {
    this.kronoosService = new KronoosService();
  }

  readCsv = async (req: Request, res: Response) => {
    try {
      const results = await this.kronoosService.readCsv();
      return res.status(200).json({ results });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}