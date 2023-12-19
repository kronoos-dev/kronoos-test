import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("inicio");
  response.write("testando");
  response.end();
});

server.listen("3333");
