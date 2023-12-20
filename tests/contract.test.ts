import { PrismaClient } from "@prisma/client";
import { validateCpfCnpj } from "../utils";

const prisma = new PrismaClient();

describe("Database Tests", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should verify the relationship between vlPresta and vlTotal/nrPresta", async () => {
    const foundContracts = await prisma.contrato.findMany({
      include: { prestacao: true },
    });

    foundContracts.forEach((contract) => {
      const {
        vlTotal,
        qtPrestacoes,
        prestacao: { vlPresta },
      } = contract;
      expect(Math.abs(vlPresta - vlTotal / qtPrestacoes)).toBeLessThan(1);
    });
  });

  it("must check the validity of the user documents", async () => {
    const foundContracts = await prisma.contrato.findMany({
      include: { cliente: true },
    });

    foundContracts.forEach((contract) => {
      const {
        cliente: { nrCpfCnpj },
      } = contract;

      expect(validateCpfCnpj(nrCpfCnpj)).toBe(true);
    });
  });

  it("must check the validity of valid documents", async () => {
    const documents = [
      "12711706044",
      "98465251096",
      "91859286070",
      "65564777000124",
      "89852384000184",
      "45237017000103",
    ];
    documents.forEach((document) => {
      expect(validateCpfCnpj(document)).toBe(true);
    });
  });
});
