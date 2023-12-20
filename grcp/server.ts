import { dirname, join } from "path";
import { fileURLToPath } from "url";
import protoLoader from "@grpc/proto-loader";
import grpc from "grpc";
import { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROTO_PATH = join(__dirname, "./contrato.proto");
const prisma = new PrismaClient();
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});
var contratoProto: any = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(contratoProto.ContratoService.service, {
  filtrarContrato: async (
    { request: { limit, page, filter = "" } }: any,
    callback: any
  ) => {
    const OR: any = [
      {
        nrContrato: {
          contains: filter,
        },
      },
      {
        cliente: {
          nrCpfCnpj: {
            contains: filter,
          },
        },
      },
      {
        cliente: {
          nmClient: {
            contains: filter,
          },
        },
      },
    ];
    const totalCount = await prisma.contrato.count({
      where: {
        OR,
      },
    });

    const contratos = await prisma.contrato.findMany({
      take: limit,
      skip: (+page - 1) * limit,
      include: {
        carteira: true,
        cliente: true,
        produto: true,
        prestacao: true,
      },
    });
    const lastPage = Math.ceil(totalCount / limit);

    callback(null, {
      contratos,
      total: totalCount,
      lastPage,
      currentPage: +page,
      perPage: limit,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
    });
  },
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");

server.start();
