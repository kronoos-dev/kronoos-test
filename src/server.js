import { createServer } from "node:http";

const server = createServer((request, response) => {
  response.write("teste kronoos");
  response.end();
});

server.listen("3333");
