import { dirname, join } from "path";
import { fileURLToPath } from "url";
import protoLoader from "@grpc/proto-loader";
import grpc from "grpc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROTO_PATH = join(__dirname, "./contrato.proto");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const ContratoService: any =
  grpc.loadPackageDefinition(packageDefinition).ContratoService;
const client = new ContratoService(
  "localhost:30043",
  grpc.credentials.createInsecure()
);

export default client;
