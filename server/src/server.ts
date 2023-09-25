import fastify, { FastifyReply, FastifyRequest } from "fastify";
import multer from 'fastify-multer';
import readCsvAndConvertToArray from "./services/convertCsvDataToArray";
import processCsvData from "./services/processCsvData";

interface QueryParameters {
  page?: string;
  perPage?: string;
}

interface CustomFastifyRequest extends FastifyRequest {
  file?: {
    buffer: Buffer;
    encoding: string;
    fieldname: string;
    mimetype: string;
    originalname: string;
    size: number;
    path: string;
  };
}

const app = fastify();
const upload = multer({ dest: 'files/' });
app.register(upload.contentParser);

app.addHook('onRequest', (req, res, done) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  done();
});


app.get('/', async (request: CustomFastifyRequest, reply: FastifyReply) => {
const csvFilePath = 'data.csv';

  try {
    const data = await readCsvAndConvertToArray(csvFilePath);

    const { page = '1', perPage = '10' } = request.query as QueryParameters;

    const pageData = processCsvData(data, parseInt(page, 10), parseInt(perPage, 10));

    const response = {
      data: pageData,
      page: parseInt(page, 10),
      perPage: parseInt(perPage, 10),
      totalItems: Object.keys(data).length,
    };

    reply.send(response);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: 'Erro ao processar o arquivo CSV' });
  }
});

app.listen({
  port: 3333,
}).then(() => {
  console.log('Server is Running');
});
