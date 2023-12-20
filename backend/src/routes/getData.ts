import express from "express";
import z from "zod";
import { SqliteDatabase } from "../database/sqliteDatabase";
import services from "../services";

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
    const formatedData = data.rows.map((item) => {
      return {
        ...item,
        vlAtual: services.formatCurrency(item.vlAtual),
        vlDescon: services.formatCurrency(item.vlDescon),
        vlIof: services.formatCurrency(item.vlIof),
        vlMora: services.formatCurrency(item.vlMora),
        vlMulta: services.formatCurrency(item.vlMulta),
        vlOutAcr: services.formatCurrency(item.vlOutAcr),
        vlPresta: `${services.formatCurrency(item.vlPresta)} (${
          services.installmentCalculator(item.vlTotal, item.qtPrestacoes) ===
          item.vlPresta
            ? "Válido"
            : `Inválido, o valor correto é ${services.formatCurrency(
                services.installmentCalculator(item.vlTotal, item.qtPrestacoes),
              )}`
        })`,
        vlTotal: services.formatCurrency(item.vlTotal),
        nrCpfCnpj: `${item.nrCpfCnpj} (${
          services.validateCpfCnpj(item.nrCpfCnpj) ? "Válido" : "Inválido"
        })`,
        dtContrato: services
          .parseDateString(item.dtContrato.toString())
          .toLocaleDateString(),
        dtVctPre: services
          .parseDateString(item.dtVctPre.toString())
          .toLocaleDateString(),
      };
    });
    res.json({
      ...data,
      rows: formatedData,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "Erro desconhecido" });
    }
  }
});

export default router;
