import { PrismaClient } from "@prisma/client";
import csv from "csv-parser";
import * as fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_PATH = join(__dirname, "../data.csv");

const prisma = new PrismaClient();
function formatCents(value: string | number) {
  return Math.round(+value * 100);
}
function readData(formato: string) {
  const year = formato.slice(0, 4);
  const month = formato.slice(4, 6);
  const day = formato.slice(6, 8);
  const data = new Date(`${year}-${month}-${day}`);
  return data!;
}
async function main() {
  const results: any = [];
  fs.createReadStream(DATA_PATH)
    .pipe(csv())
    .on("data", (data: any) => results.push(data))
    .on("end", async () => {
      for (let index in results) {
        const {
          nrCpfCnpj,
          nmClient,
          cdClient,
          cdProduto,
          dsProduto,
          cdCarteira,
          dsCarteira,
          nrInst,
          nrAgencia,
          nrContrato,
          dtContrato,
          qtPrestacoes,
          vlTotal,
          nrProposta,
          nrPresta,
          tpPresta,
          nrSeqPre,
          dtVctPre,
          vlPresta,
          vlMora,
          vlMulta,
          vlOutAcr,
          vlIof,
          vlDescon,
          vlAtual,
          idSituac,
          idSitVen,
        } = results[index];

        const clienteInput = { nrCpfCnpj, nmClient, cdClient };
        const cliente = await prisma.cliente.upsert({
          where: { nrCpfCnpj },
          update: clienteInput,
          create: clienteInput,
        });

        const carteiraInput = { cdCarteira, dsCarteira };
        const produtoInput = { cdProduto, dsProduto };
        const prestacaoInput = {
          nrPresta,
          tpPresta,
          nrSeqPre,
          dtVctPre: readData(dtVctPre),
          vlPresta: formatCents(vlPresta),
          vlMora: formatCents(vlMora),
          vlMulta: formatCents(vlMulta),
          vlOutAcr: formatCents(vlOutAcr),
          vlIof: formatCents(vlIof),
          vlDescon: formatCents(vlDescon),
          vlAtual: formatCents(vlAtual),
        };
        const contratoInput = {
          nrInst,
          nrAgencia,
          nrContrato,
          dtContrato: readData(dtContrato),
          qtPrestacoes: +qtPrestacoes,
          vlTotal: formatCents(vlTotal),
          nrProposta,
          idSituac,
          idSitVen,
        };
        const contract = await prisma.contrato.create({
          data: {
            ...contratoInput,
            cliente: { connect: { id: cliente.id } },
            carteira: {
              create: carteiraInput,
            },
            produto: {
              create: produtoInput,
            },
            prestacao: {
              create: prestacaoInput,
            },
          },
        });

        console.log(`${index} - Created location with id: ${contract.id}`);
      }
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
